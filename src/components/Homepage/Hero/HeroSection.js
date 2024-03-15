"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { BsBehance, BsLinkedin, BsTelegram, BsTwitter } from "react-icons/bs";

// fonts
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const HeroSection = () => {
  // const circlePath = "M50 100 A 50 50 0 1 1 150 100";
  return (
    <>
      <motion.div
        viewport={{ once: true }}
        initial={{
          background: "rgba(11, 11, 11, 0)",
          position: "fixed",
          height: "100vh",
          width: "100vw",
          zIndex: 10,
        }}
        whileInView={{
          background: "transparent",
          position: "relative",
          height: "calc(100vh - 10em)",
          width: "100vw",
          zIndex: 0,
        }}
        className={`${poppins.className} flex flex-col items-center justify-between mb-44`}
        style={{ height: "calc(100vh - 10em)",background: "rgba(11, 11, 11, 0)" }}
      >
        {/* Loading */}
        {/* <motion.div
        viewport={{ once: true }}
        initial={{ display:"flex",opacity: 1 }}
        whileInView={{ display:"none",opacity: 0 }}
        transition={{ ease: "easeInOut" }}
        className="flex flex-col fixed top-0 left-0 bg-[#0a0a0b] justify-center items-center w-screen h-screen z-10"
      >
        <div className="relative rounded-full overflow-hidden">
          <Image
            src={"/images/profile.svg"}
            height={300}
            width={300}
            alt="profile"
            className=" filter grayscale"
          />
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
          <h1 className="mt-12 md:text-3xl text-xl">😄 Just a moment...</h1>
          <Image
            src={"/basketBall.gif"}
            height={300}
            width={300}
            alt="profile"
            className="fixed h-auto w-auto md:left-0  bottom-0"
          />
      </motion.div> */}
        <motion.div className="flex flex-col items-center justify-center h-full">
          <motion.div
            viewport={{ once: true }}
            initial={{ borderRadius: 1000, borderColor: "transparent" }}
            whileInView={{ borderRadius: 20, borderColor: "white" }}
            transition={{ ease: "easeOut", duration: 0.06 }}
            className="rounded-3xl transition-all relative border-2 border-white overflow-hidden mx-12"
          >
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 0 }}
              className="lds-ring"
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </motion.div>
            <Image
              src={"/images/profile.svg"}
              height={300}
              width={300}
              alt="profile"
              className="transition-all w-auto filter grayscale hover:filter-none"
              priority
            />
          </motion.div>
          <motion.h1
            viewport={{ once: true }}
            initial={{ opacity: 1, display: "block" }}
            whileInView={{ opacity: 0, display: "none" }}
            className="mt-12 md:text-3xl text-xl"
          >
            😄 Just a moment...
          </motion.h1>
          <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 1, display: "block" }}
            whileInView={{ opacity: 0, display: "none" }}
          >
            <Image
              src={"/basketBall.gif"}
              height={300}
              width={300}
              alt="profile"
              className="fixed h-auto w-auto md:left-0  bottom-0"
            />
          </motion.div>
          <div className="flex flex-col items-center mt-6 ">
            <motion.ul
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ ease: "easeInOut", delay: 0.2 }}
              className="flex md:hidden"
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
            </motion.ul>
            <motion.h1
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0" }}
              transition={{ ease: "easeInOut", delay: 0.2 }}
              className="text-center md:text-5xl sm:text-4xl text-3xl py-2 bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text"
            >
              Building digital
            </motion.h1>
            <motion.h1
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0" }}
              transition={{ ease: "easeInOut", delay: 0.3 }}
              className="text-center md:text-5xl sm:text-4xl text-3xl pb-2 bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text"
            >
              Product's Brands and
            </motion.h1>
            <motion.h1
              viewport={{ once: true }}
              initial={{ opacity: 0, y: "20px" }}
              whileInView={{ opacity: 1, y: "0" }}
              transition={{ ease: "easeInOut", delay: 0.4 }}
              className="text-center md:text-5xl sm:text-4xl text-3xl mt-[-5px] bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text"
            >
              experience
            </motion.h1>
            <div className="relative inline-block mx-auto group mt-5 mouse-hover">
              <motion.a
                viewport={{ once: true }}
                initial={{ opacity: 0, y: "20px" }}
                whileInView={{ opacity: 1, y: "0" }}
                transition={{ ease: "easeInOut", delay: 0.5 }}
                href="https://www.upwork.com/freelancers/codevishnu"
                target="_blank"
                className="text-xl bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text cursor-pointer hover:text-white transition-colors"
              >
                Hire Me
              </motion.a>
              <span className="absolute w-0 h-[2px] bg-white transition-all duration-300 ease-in-out bottom-[-3px] left-0 group-hover:w-full"></span>
            </div>
          </div>
        </motion.div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", delay: 0.5 }}
          className="md:visible invisible"
        >
          <Image
            src={"/images/heroSectionFooter.svg"}
            height={200}
            width={200}
            alt="profile"
            className="md:w-full h-auto"
          />
        </motion.div>
      </motion.div>
      <motion.div
        viewport={{ once: true }}
        initial={{
          position: "relative",
          height: "100vh",
          width: "100vw",
        }}
        whileInView={{
          height: "30px",
          width: "100vw",
        }}
      ></motion.div>
    </>
  );
};

export default HeroSection;
