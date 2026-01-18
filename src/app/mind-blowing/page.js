"use client";

import Navbar from "@/components/Navbar/Navbar";
import SideNavbar from "@/components/SideNavbar/SideNavbar";
import React, { useEffect, useState } from "react";
import $ from "jquery";
import Mouse from "@/components/Mouse";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * List of mind blowing ideas. Each idea links to its own page.
 */
const ideas = [
  {
    id: "1",
    title: "Hand-reactive particles",
    href: "/mind-blowing/particle-camera",
    description: "This section reacts to your hand movements.",
  },
  { id: "2", comingSoon: true, title: "Coming soon" },
];

export default function MindBlowingPage() {
  const [position, setPosition] = useState({ x: "-100px", y: "-100px" });

  useEffect(() => {
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      const scrollElement = document.querySelector(".scroll-up");
      if (scrollElement) {
        scroll = new locomotiveModule.default({
          el: scrollElement,
          smooth: true,
          smoothMobile: false,
          resetNativeScroll: true,
        });
      }
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = () => {
      $(".mouse").css({ scale: 2 });
    };
    const handleMouseLeave = () => {
      $(".mouse").css({ scale: 1 });
    };
    $(".mouse-hover").on("mouseover", handleMouseOver);
    $(".mouse-hover").on("mouseleave", handleMouseLeave);
    return () => {
      $(".mouse-hover").off("mouseover", handleMouseOver);
      $(".mouse-hover").off("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Navbar />
      <SideNavbar />
      <div className="cursor-none w-screen">
        {/* Page heading */}
        <div className="lg:px-52 md:px-32 px-5 pt-10 pb-6">
          <motion.h1
            viewport={{ once: true }}
            initial={{ opacity: 0, y: "20px" }}
            whileInView={{ opacity: 1, y: "0" }}
            transition={{ ease: "easeInOut", delay: 0.2 }}
            className="md:text-5xl sm:text-4xl text-3xl py-2 bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text"
          >
            Mind Blowing
          </motion.h1>
          <motion.p
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", delay: 0.1, duration: 0.5 }}
            className="mt-1 text-[#BEBEBE] text-2xl lg:w-1/2"
          >
            A collection of interactive ideas and experiments.
          </motion.p>
        </div>

        {/* List of ideas – each links to its own page */}
        <div className="lg:px-52 md:px-32 px-5 pb-16 space-y-4">
          {ideas.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block mouse-hover"
              >
                <motion.div
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className="p-6 border border-[#727272] draw-border transition-all hover:border-white/50"
                >
                  <h3 className="text-xl text-white">{item.title}</h3>
                  <p className="mt-1 text-[#BEBEBE]">{item.description}</p>
                </motion.div>
              </Link>
            ) : (
              <motion.div
                key={item.id}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className="p-6 border border-[#727272] opacity-60"
              >
                <p className="text-[#BEBEBE]">{item.title}</p>
              </motion.div>
            )
          )}
        </div>
      </div>
      <Mouse position={position} />
    </div>
  );
}
