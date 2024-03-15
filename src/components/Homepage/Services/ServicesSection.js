"use client";
import React from "react";
import { motion, useMotionValue } from "framer-motion";
// fonts
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "700" });
import { Poppins } from "next/font/google";
import { BsArrowRight } from "react-icons/bs";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const ServicesSection = () => {
  const designingServices = [
    "UI/UX design",
    "Mockup Design",
    "Banner Design",
    "Logo Designing",
  ];
  const developmentServices = [
    "Website Development",
    "Android Development",
    "Backend Development",
    "CMS Development",
  ];

  return (
    <motion.div className="mt-[10em] flex flex-col items-center  lg:px-52 md:px-32 px-5 service-section">
      <motion.h1
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.5 }}
        className={`text-center text-xl ${roboto.className} bg-gradient-to-r from-[#fff] to-[#DFDFDF7A] text-transparent bg-clip-text`}
      >
        Services
      </motion.h1>
      <motion.p
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", delay: 0.5, duration: 0.5 }}
        className="text-[#BEBEBE] text-center capitalize lg:text-3xl text-2xl mt-2 z-10"
      >
        Available Services <br /> I can Work on
      </motion.p>
      <div className="w-full my-12">
        <h1 className="text-[#BEBEBE]  mb-5">
          01. <span className="text-2xl text-white">Designing</span>
        </h1>
        <div className="flex md:flex-nowrap flex-wrap justify-between">
          {designingServices.map((service, index) => (
            <motion.div
              key={index}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeOut",
                duration: 0.5,
              }}
              className="md:py-16 text-xl p-5 group draw-border relative items-center transition-all inline w-full border md:m-0 m-2 border-[#727272] text-center"
            >
              {service}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full md:my-12 my-0">
        <h1 className="text-[#BEBEBE]  mb-5">
          02. <span className="text-2xl text-white">Development</span>
        </h1>
        <div className="flex md:flex-nowrap flex-wrap justify-between">
          {developmentServices.map((service, index) => (
            <motion.div
              key={index}
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeOut",
                delay:0.3,
                duration: 0.5,
              }}
              className="md:py-16 p-5 draw-border transition-all relative text-xl w-full border md:m-0 m-2 border-[#727272] text-center"
            >
              {service}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
