"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { createParticleSystem } from "@/components/MindBlowing/particles";

/**
 * ParticleCameraIdea – Idea 1 in the Mind Blowing list.
 * Full-screen Three.js particle scene with webcam permission.
 * Hooks (handInputRef) prepared for future hand-tracking; no gesture logic yet.
 */

const PARTICLE_COUNT = 1200;
const THREE_CDN = "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";

// Gesture classification (normalized coords)
const PINCH_THRESHOLD = 0.08;
const OPEN_AVG_MIN = 0.08;
const DEBOUNCE_FRAMES = 5;
const POINT_INDEX_MARGIN = 0.02;  // index tip above MCP
const POINT_OTHERS_MARGIN = 0.02; // others bent: tip >= mcp - margin

const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export default function ParticleCameraIdea() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [threeReady, setThreeReady] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [debugGesture, setDebugGesture] = useState("—");

  // handInputRef: handX, handY, fingerX, fingerY (index tip), gesture (pinch|open|point|none)
  const handInputRef = useRef({
    handX: null,
    handY: null,
    fingerX: null,
    fingerY: null,
    gesture: null,
  });

  // Refs for cleanup
  const streamRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsRef = useRef(null);
  const rafRef = useRef(null);
  const rafHandsId = useRef(null);
  const handLandmarkerRef = useRef(null);
  const debounceRef = useRef({ last: "none", count: 0 });
  const lastLoggedGesture = useRef(null);

  // If Three.js was already loaded (e.g. revisiting the page), set ready
  useEffect(() => {
    if (typeof window !== "undefined" && window.THREE) setThreeReady(true);
  }, []);

  // ---- Camera: getUserMedia ----
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        setCameraReady(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play?.().catch(() => {});
        }
      })
      .catch(() => {
        setCameraDenied(true);
      });

    return () => {
      streamRef.current?.getTracks?.().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  // ---- MediaPipe Hands: @mediapipe/tasks-vision HandLandmarker (wasm + model from CDN) ----
  useEffect(() => {
    if (!cameraReady || cameraDenied || !videoRef.current?.srcObject) return;

    const video = videoRef.current;
    let cancelled = false;

    (async () => {
      const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
      if (cancelled) return;

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      if (cancelled) return;

      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6,
      });
      if (cancelled) {
        handLandmarker.close();
        return;
      }

      handLandmarkerRef.current = handLandmarker;

      function commit(g) {
        handInputRef.current.gesture = g;
        setDebugGesture(g);
        if (g !== lastLoggedGesture.current) {
          console.log("Gesture:", g);
          lastLoggedGesture.current = g;
        }
        if (g === "none") {
          handInputRef.current.handX = null;
          handInputRef.current.handY = null;
          handInputRef.current.fingerX = null;
          handInputRef.current.fingerY = null;
        }
      }

      function processResult(result) {
        const lm = result.landmarks?.[0];
        let raw;

        if (!lm) {
          handInputRef.current.handX = null;
          handInputRef.current.handY = null;
          handInputRef.current.fingerX = null;
          handInputRef.current.fingerY = null;
          raw = "none";
        } else {
          handInputRef.current.handX = lm[8].x;
          handInputRef.current.handY = lm[8].y;
          handInputRef.current.fingerX = lm[8].x;
          handInputRef.current.fingerY = lm[8].y;

          const d48 = dist(lm[4], lm[8]);
          if (d48 < PINCH_THRESHOLD) {
            raw = "pinch";
          } else if (
            lm[8].y < lm[5].y - POINT_INDEX_MARGIN &&
            lm[12].y >= lm[9].y - POINT_OTHERS_MARGIN &&
            lm[16].y >= lm[13].y - POINT_OTHERS_MARGIN &&
            lm[20].y >= lm[17].y - POINT_OTHERS_MARGIN
          ) {
            raw = "point";
          } else {
            const d1 = dist(lm[4], lm[8]);
            const d2 = dist(lm[8], lm[12]);
            const d3 = dist(lm[12], lm[16]);
            const d4 = dist(lm[16], lm[20]);
            const avg = (d1 + d2 + d3 + d4) / 4;
            raw = avg > OPEN_AVG_MIN ? "open" : "none";
          }
        }

        const d = debounceRef.current;
        if (raw === d.last) {
          d.count++;
          if (d.count >= DEBOUNCE_FRAMES) {
            commit(raw);
            d.count = DEBOUNCE_FRAMES;
          }
        } else {
          debounceRef.current = { last: raw, count: 1 };
        }
      }

      function detectLoop() {
        if (cancelled) return;
        rafHandsId.current = requestAnimationFrame(detectLoop);
        if (video.readyState >= 2 && video.videoWidth > 0) {
          const result = handLandmarker.detectForVideo(video, performance.now());
          processResult(result);
        }
      }
      detectLoop();
    })();

    return () => {
      cancelled = true;
      if (rafHandsId.current) cancelAnimationFrame(rafHandsId.current);
      rafHandsId.current = null;
      if (handLandmarkerRef.current?.close) handLandmarkerRef.current.close();
      handLandmarkerRef.current = null;
    };
  }, [cameraReady, cameraDenied]);

  // ---- Three.js: scene, particles, animation ----
  useEffect(() => {
    if (!threeReady || !canvasRef.current || !containerRef.current) return;

    const THREE = window.THREE;
    if (!THREE) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Particles: gesture-driven system (attract, scatter, follow, idle)
    const particles = createParticleSystem(THREE, { count: PARTICLE_COUNT, spread: 4 });
    const geometry = particles.geometry;

    const material = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Animation loop: dt, gesture-driven particles via particles.update
    let lastTime = performance.now();

    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const hand = handInputRef.current;
      particles.update(dt, {
        gesture: hand.gesture,
        fingerX: hand.fingerX,
        fingerY: hand.fingerY,
        camera,
      });

      renderer.render(scene, camera);
    }
    animate();

    // Resize
    function onResize() {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      pointsRef.current = null;
    };
  }, [threeReady]);

  return (
    <section
      id="mind-blowing-section"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      {/* Three.js canvas – full section */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Text overlay – centered */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <h2 className="text-center text-2xl md:text-4xl bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text">
          Mind Blowing Section
        </h2>
        <p className="mt-2 text-[#BEBEBE] text-center text-sm md:text-lg px-4">
          This section reacts to your hand movements.
        </p>
        {cameraDenied && (
          <p className="mt-4 text-amber-400/90 text-sm text-center px-4">
            Camera access was denied. Hand tracking will be limited.
          </p>
        )}
      </div>

      {/* Debug: gesture label – top-left */}
      <div className="fixed top-4 left-4 z-20 px-3 py-2 rounded bg-black/60 text-gray-300 text-sm font-mono">
        Gesture: {debugGesture}
      </div>

      {/* Debug webcam – top-right, hidden by default; remove opacity-0 to show */}
      <div className="fixed top-4 right-4 z-20 w-40 h-28 rounded border border-white/20 bg-black/50 overflow-hidden opacity-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Three.js from CDN */}
      <Script
        src={THREE_CDN}
        strategy="afterInteractive"
        onLoad={() => setThreeReady(true)}
      />
    </section>
  );
}
