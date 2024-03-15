import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import Banner from "../AboutMe/Banner";
import Link from "next/link";

// fonts
import { Roboto } from "next/font/google";
import { projects } from "@/projects";
const roboto = Roboto({ subsets: ["latin"], weight: "700" });

const MyWorkSection = () => {
  return (
    <>
      <div className=" lg:px-52 md:px-32 px-5 mb-48 mt-36 relative">
        <div className="w-full flex md:flex-row flex-col justify-between">
          <div className=" md:w-1/2 w-full md:mt-0 mt-6">
            <motion.h1
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.5 }}
              className={`text-xl ${roboto.className} bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text`}
            >
              My Work
            </motion.h1>
            <motion.p
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", delay: 0.5, duration: 0.5 }}
              className={`mt-4 text-[#BEBEBE] capitalize lg:text-3xl text-2xl lg:w-1/2`}
            >
              Selected works <br /> of all time
            </motion.p>
          </div>
          <div className=" md:w-1/2 w-full md:mt-0 mt-6 flex flex-col items-end justify-center">
            <motion.p
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", delay: 0.3, duration: 0.5 }}
              className="text-xs text-right"
            >
              Checkout more <br /> Amazing projects I’ve worked on
            </motion.p>
            <Link href="/projects">
              <motion.button
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeInOut", delay: 0.5, duration: 0.5 }}
                className={`mt-4 hover:bg-white transition-all mouse-hover hover:text-black border border-white px-8 py-2 `}
              >
                View More
              </motion.button>
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-12 mt-12 place-items-center justify-between">
          {projects.slice(0, 3).map((project,index) => {
            return (
              <motion.a
                href={project.link}
                key={index}
                target="_blank"
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeInOut", delay: 0.5, duration: 0.5 }}
                className="h-80 w-full rounded-lg bg-[#202020] group relative cursor-pointer"
                style={{
                  background: `url(${project.poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top",
                }}
              >
                <span className="h-full w-full absolute top-0 left-0 bg-[#0000006a] group-hover:bg-transparent transition-all"></span>
                <div className="absolute bg-[#000000a5] rounded-md p-2 bottom-0 opacity-0 group-hover:bottom-10 group-hover:opacity-100 transition-all left-10">
                  <h1 className="text-white font-bold text-xl">
                    {project.name}
                  </h1>
                  <p className="text-lg">Role: {project.role}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
      <Banner className="md:rotate-3 rotate-6" />
    </>
  );
};

export default MyWorkSection;
