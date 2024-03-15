"use client";
import AboutMeSection from "@/components/Homepage/AboutMe/AboutMeSection";
import HeroSection from "@/components/Homepage/Hero/HeroSection";
import ServicesSection from "@/components/Homepage/Services/ServicesSection";
import Mouse from "@/components/Mouse";
import Navbar from "@/components/Navbar/Navbar";
import SideNavbar from "@/components/SideNavbar/SideNavbar";
import { motion } from "framer-motion";
import $ from "jquery";
import { useEffect, useState } from "react";
// import LocomotiveScroll from "locomotive-scroll";
import MyWorkSection from "@/components/Homepage/Work/MyWorkSection";
import FooterSection from "@/components/Homepage/Footer/FooterSection";

export default function Home() {
  const [position, setPosition] = useState({ x: "-100px", y: "-100px" });

  useEffect(() => {
    let scroll;
    import("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default({
        el: document.querySelector("scroll-up"),
        smooth: true,
        smoothMobile: false,
        resetNativeScroll: true,
      });
    });

    // `useEffect`'s cleanup phase
    return () => {
      if (scroll) scroll.destroy();
    };
  });

  useEffect(() => {
    $(".mouse-hover").on("mouseover", () => {
      $(".mouse").css({ scale: 2 });
    });
    $(".mouse-hover").on("mouseleave", () => {
      $(".mouse").css({ scale: 1 });
    });
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
