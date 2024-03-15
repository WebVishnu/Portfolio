import React, { useState } from "react";
import Image from "next/image";
import Banner from "./Banner";
import { motion } from "framer-motion";

// fonts
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "700" });

const AboutMeSection = () => {
  return (
    <motion.div className={`flex ${poppins.className} flex-col relative`}>
      <div className="w-full flex flex-col items-start lg:px-52 md:px-32 px-5">
        <motion.h2
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.5 }}
          className={`${roboto.className} text-xl bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text`}
        >
          About me & My Skills
        </motion.h2>
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.1, duration: 0.5 }}
          className={`mt-1 text-[#BEBEBE] capitalize lg:text-3xl text-2xl lg:w-1/2`}
        >
          I can deliver results that exceeds your expectations
        </motion.p>
        <motion.a
          href="https://calendly.com/vishnugoswami/chat"
          target="_blank"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <button
            className={`mt-4 hover:bg-white transition-all mouse-hover hover:text-black border border-white px-8 py-2 `}
          >
            Schedule a meet
          </button>
        </motion.a>
      </div>
      <div className="w-full flex flex-col items-end lg:px-52 md:px-32 px-5 mt-12 mb-28">
        <motion.p
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.2, duration: 0.5 }}
          className="lg:w-1/2 text-[#BEBEBE] md:text-xl text-md"
        >
          I am a talented full stack developer with experience in{" "}
          <span className="font-bold text-white">
            {" "}
            Next Js ( Primary ) React, Node.js, Express.js, MongoDB, AWS Lambda,
            AWS API Gateway and Digital Ocean.
          </span>{" "}
          I am passionate about my work and am committed to delivering
          high-quality code. I am also a team player and am able to work
          effectively with others to achieve common goals. I am a valuable asset
          to any team and would be a great addition to any company.
        </motion.p>
        <motion.div
          className="flex mt-12"
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <p className="flex md:mx-5 mx-2 md:text-2xl text-2xl flex-col text-center">
            3+ Yr{" "}
            <span className="lg:text-xl text-xl text-[#BEBEBE]">
              Experience
            </span>
          </p>
          <p className="flex md:mx-5 mx-2 md:text-2xl text-2xl flex-col text-center">
            5+ <span className="lg:text-xl text-xl text-[#BEBEBE]">Brands</span>
          </p>
          <p className="flex md:mx-5 mx-2 md:text-2xl text-2xl flex-col text-center">
            10+{" "}
            <span className="lg:text-xl text-xl text-[#BEBEBE]">Projects</span>
          </p>
        </motion.div>
      </div>
      <Banner className="md:rotate-3 rotate-6" />
      <Banner className="opacity-50 md:-rotate-3 -rotate-6 z-[-1]" />
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeInOut" }}
        className="absolute lg:visible invisible right-0 -top-16 group overflow-hidden"
      >
        <Image
          src={"/images/circle.svg"}
          alt="circle"
          height={150}
          width={150}
          className="w-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutMeSection;
