"use client";
import AboutMeSection from "@/components/Homepage/AboutMe/AboutMeSection";
import HeroSection from "@/components/Homepage/Hero/HeroSection";
import ServicesSection from "@/components/Homepage/Services/ServicesSection";
import Mouse from "@/components/Mouse";
import Navbar from "@/components/Navbar/Navbar";
import SideNavbar from "@/components/SideNavbar/SideNavbar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// import LocomotiveScroll from "locomotive-scroll";
import MyWorkSection from "@/components/Homepage/Work/MyWorkSection";
import FooterSection from "@/components/Homepage/Footer/FooterSection";

export default function Home() {
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
    <motion.main
      className="cursor-none overflow-hidden"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 1, y: 0 }}
    >
      <Navbar /> <SideNavbar />
      <HeroSection />
      <AboutMeSection />
      <ServicesSection />
      <MyWorkSection />
      <FooterSection className=" mt-96" />
      <Mouse position={position} />
    </motion.main>
  );
}
