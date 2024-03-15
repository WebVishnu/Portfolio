"use client";
import React from "react";
import { BsBehance, BsLinkedin, BsTelegram, BsTwitter } from "react-icons/bs";
import { motion } from "framer-motion";
const SideNavbar = () => {
  return (
    <div className="fixed md:visible invisible  lg:left-0 left-[-5em] top-[50vh] rotate-[270deg] z-[10]">
      <motion.div
        className="flex"
        viewport={{ once: true }}
        initial={{ opacity: 0, y: "20px" }}
        whileInView={{ opacity: 1, y: "0" }}
        transition={{ ease: "easeInOut" }}
      >
        <a
          className="mouse-hover mx-3 p-2 border border-white rounded-full hover:bg-white transition-all hover:text-black"
          href="https://twitter.com/VishnuTweets_"
          target="_blank"
        >
          <BsTwitter />
        </a>
        <a
          className="mouse-hover mx-3 p-2 border border-white rounded-full hover:bg-white transition-all hover:text-black"
          href="https://t.me/vishnu_g04"
          target="_blank"
        >
          <BsTelegram />
        </a>
        <a
          className="mouse-hover mx-3 p-2 border border-white rounded-full hover:bg-white transition-all hover:text-black"
          href="https://www.behance.net/vishnugoswami1"
          target="_blank"
        >
          <BsBehance />
        </a>
        <a
          className="mouse-hover mx-3 p-2 border border-white rounded-full hover:bg-white transition-all hover:text-black"
          href="https://www.linkedin.com/in/vishnu-goswami"
          target="_blank"
        >
          <BsLinkedin />
        </a>
      </motion.div>
    </div>
  );
};

export default SideNavbar;
