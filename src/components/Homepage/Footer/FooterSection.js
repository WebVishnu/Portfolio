import React from "react";
import { motion } from "framer-motion";

// fonts
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: "700" });
import { Poppins } from "next/font/google";
import Link from "next/link";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

const FooterSection = (props) => {
  return (
    <div
      className={`relative pb-48 flex flex-col items-center ${props.className}`}
    >
      <motion.h1
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", delay: 0.2, duration: 0.3 }}
        className={`text-xl ${roboto.className} bg-gradient-to-r from-[#DFDFDF] to-[#DFDFDF7A] text-transparent bg-clip-text`}
      >
        Collaborate
      </motion.h1>
      <motion.h2
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.3 }}
        className={`mt-4 text-[#BEBEBE] text-center ${poppins.className} capitalize lg:text-7xl text-5xl`}
      >
        Let's Talk and <br />
        Start working together
      </motion.h2>
      <Link href={"/contact"}>
        <motion.button
          viewport={{ once: true }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.3 }}
          className={`mt-8 hover:bg-white transition-all mouse-hover hover:text-black border border-white px-8 py-3 `}
        >
          Get in Touch
        </motion.button>
      </Link>
    </div>
  );
};

export default FooterSection;
