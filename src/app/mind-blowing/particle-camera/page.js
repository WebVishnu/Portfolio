"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Mouse from "@/components/Mouse";

// ParticleCameraIdea uses webcam, Three.js (window), MediaPipe; load only on client to avoid
// __webpack_require__ / react-server-dom-webpack "reading 'call'" and chunk resolution on server.
const ParticleCameraIdea = dynamic(
  () => import("@/components/MindBlowing/ParticleCameraIdea"),
  { ssr: false, loading: () => <div className="h-screen w-screen bg-black flex items-center justify-center text-gray-500">Loading…</div> }
);

export default function ParticleCameraPage() {
  const [position, setPosition] = useState({ x: "-100px", y: "-100px" });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="cursor-none h-screen w-screen overflow-hidden"
    >
      <ParticleCameraIdea />
      <Mouse position={position} />
    </div>
  );
}
