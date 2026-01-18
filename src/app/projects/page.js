"use client";
import Navbar from "@/components/Navbar/Navbar";
import SideNavbar from "@/components/SideNavbar/SideNavbar";
import React, { useEffect, useState } from "react";
// import LocomotiveScroll from "locomotive-scroll";
import Mouse from "@/components/Mouse";
import FooterSection from "@/components/Homepage/Footer/FooterSection";
import Banner from "@/components/Homepage/AboutMe/Banner";
import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/projects";

const Page = () => {
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

    // `useEffect`'s cleanup phase
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = () => {
      const mouseElements = document.querySelectorAll(".mouse");
      mouseElements.forEach((el) => {
        el.style.transform = "scale(2)";
      });
    };
    const handleMouseLeave = () => {
      const mouseElements = document.querySelectorAll(".mouse");
      mouseElements.forEach((el) => {
        el.style.transform = "scale(1)";
      });
    };

    const mouseHoverElements = document.querySelectorAll(".mouse-hover");
    mouseHoverElements.forEach((el) => {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // Cleanup event handlers
    return () => {
      mouseHoverElements.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Navbar /> <SideNavbar />
      <div className="cursor-none h-screen w-screen lg:px-52 md:px-32 px-3">
        <motion.h1
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "20px" }}
          whileInView={{ opacity: 1, y: "0" }}
          transition={{ ease: "easeInOut", delay: 0.2 }}
          className="md:text-5xl sm:text-4xl text-3xl py-2 bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text"
        >
          My Creative Projects
        </motion.h1>
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.1, duration: 0.5 }}
          className={`mt-1 text-[#BEBEBE] capitalize text-2xl lg:w-1/2`}
        >
          I can deliver results that exceeds your expectations
        </motion.p>
        <div className="max-w-[1500px] mx-auto lg:px-0 md:px-32 px-5 grid gap-12 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-autofit mt-12">
          {projects.map((project, index) => {
            return (
              <Link
                key={index}
                href={project.link}
                target="_blank"
                className="h-72 w-full rounded-md group bg-[#202020] mix-blend-difference relative mouse-hover"
                style={{
                  background: `url(${project.poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                <span className="h-full -z-10 w-full absolute top-0 left-0 bg-[#0000006a] group-hover:bg-transparent transition-all"></span>
                <div className="absolute bg-[#000000a5] rounded-md p-2 bottom-0 opacity-0 group-hover:bottom-10 group-hover:opacity-100 transition-all left-10">
                  <h1 className="text-white font-bold text-xl">
                    {project.name}
                  </h1>
                  {project.UnderProgress ? (
                    <p className="text-red-300 text-xl font-bold">
                      We are working on it...
                    </p>
                  ) : (
                    ""
                  )}
                  <p className="text-lg">Role: {project.role}</p>
                  <p className="text-lg">{project.timeTaken}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <Banner className="pt-24" />
        <FooterSection className="pt-60" />
        <Mouse position={position} />
      </div>
    </div>
  );
};

export default Page;
