"use client";
import React from "react";
import "@/components/Navbar/css/Navbar.css";
import { motion } from "framer-motion";

// fonts
import { Poppins } from "next/font/google";
import Link from "next/link";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  return (
    <div
      className={`${poppins.className} w-full flex md:justify-end relative justify-center text-[#BEBEBE] z-[1]  md:p-10 px-5 py-10`}
    >
      <motion.ul
        className="flex"
        viewport={{ once: true }}
        initial={{ visibility: "invisible", opacity: 0, y: "20px" }}
        whileInView={{ visibility: "visible", opacity: 1, y: "0" }}
        transition={{ ease: "easeInOut" }}
      >
        <motion.li className="nav-link mouse-hover">
          <Link href="/">Home</Link>
        </motion.li>
        <motion.li className="nav-link mouse-hover">
          <Link href="/projects">Work</Link>
        </motion.li>
        <motion.li className="nav-link mouse-hover">
          <Link href="/mind-blowing">Mind Blowing</Link>
        </motion.li>
        <motion.li className="nav-link mouse-hover">
          <Link href="/contact">Contact</Link>
        </motion.li>
        <motion.li className="nav-link mouse-hover">
          <a
            href="https://www.upwork.com/freelancers/codevishnu"
            target="_blank"
          >
            Hire&nbsp;Now
          </a>
        </motion.li>
      </motion.ul>
    </div>
  );
};

export default Navbar;
