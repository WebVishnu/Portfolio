"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Mouse = ({ position }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 5], [1.5, 12]);
  return (
    <motion.div
      className="h-5 w-5 md:visible invisible mouse bg-white rounded-full pointer-events-none"
      viewport={{ once: true }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ ease: "easeInOut" }}
      style={{
        scale,
        position: "fixed",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%,-50%)",
        mixBlendMode: "difference",
        transition: "scale 0.2s",
        // boxShadow: "0px 0px 7px 3px rgba(255, 255, 255, 0.30), 0px 0px 65px 85px rgba(255, 255, 255, 0.22)",
        // filter: "blur(3px)"
      }}
    >
    </motion.div>
  );
};

export default Mouse;
