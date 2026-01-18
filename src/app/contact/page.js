"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import Link from "next/link";
// fonts
import { Old_Standard_TT } from "next/font/google";

import { GoArrowDownRight } from "react-icons/go";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import SideNavbar from "@/components/SideNavbar/SideNavbar";
import Mouse from "@/components/Mouse";

// Schema for form validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  budget: yup.string(),
  category: yup.string(),
  companyName: yup.string(),
  description: yup.string().required("Description name is required"),
});

const old_Standard_TT = Old_Standard_TT({ subsets: ["latin"], weight: "400" });

const Page = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
  // =================================================================
  // mouse Effect
  const [position, setPosition] = useState({ x: "-100px", y: "-100px" });

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

  // handling sign in
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const contactUs = async (data) => {
    try {
      setSubmitStatus("loading");
      setErrorMessage("");
      
      const submitBtn = document.querySelector(".submitBtn");
      if (submitBtn) {
        submitBtn.textContent = "Please wait...";
        submitBtn.disabled = true;
      }
      
      const response = await axios.post(`/api/contact`, {
        name: data.name,
        email: data.email,
        mobile: data.phone,
        description: data.description,
      });

      if (response.data && response.data.msg === "success") {
        setSubmitStatus("success");
        const formElement = document.querySelector(".form");
        const videoDiv = document.querySelector(".video-div");
        if (formElement) {
          formElement.classList.add("hidden");
        }
        if (videoDiv) {
          videoDiv.classList.remove("hidden");
          videoDiv.classList.add("flex", "flex-col", "items-center", "justify-center");
        }
        reset();
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error.response?.data?.error || 
        "Failed to send message. Please try again later."
      );
      const submitBtn = document.querySelector(".submitBtn");
      if (submitBtn) {
        submitBtn.textContent = "Send Us a message";
        submitBtn.disabled = false;
      }
    }
  };
  return (
    <div onMouseMove={handleMouseMove}>
      <Navbar /> <SideNavbar />
      <div
        className={` h-[calc(100vh-10em)] w-screen flex flex-col justify-center items-center lg:px-52 md:px-32 px-5 cursor-none`}
      >
        <div className="justify-center items-center video-div mx-7 hidden">
          <Image src={"/images/bravo.gif"} height={400} width={400} />
          <h1 className="text-3xl font-bold my-8">
            Thanks for your details. <br />{" "}
            <span className="text-2xl font-light">
              I will reach out to you soon... 👍
            </span>
          </h1>
          <Link
            href="/"
            className={` mouse-hover my-2 hover:bg-white transition-all mouse-hover hover:text-black border border-white px-8 py-3`}
          >
            Back to Home
          </Link>
        </div>
        <motion.div
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "-50px" }}
          whileInView={{ opacity: 1, y: "0" }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className=" flex justify-between form lg:flex-nowrap flex-wrap mx-7 w-full"
        >
          <div>
            <h1 className="text-7xl">
              Let&apos;s Work <br />{" "}
              <span
                className={`flex mt-5 sm:text-8xl ${old_Standard_TT.className}`}
              >
                Together{" "}
                <GoArrowDownRight
                  size={80}
                  className="text-white border-2 text-sm border-white ms-4 hover:bg-white hover:text-black transition-all mouse-hover"
                />
              </span>
            </h1>
            <p className="lg:w-1/2 mt-5">
              We&apos;re excited to hear from you and learn more about how we
              can help you with your business needs. Contact us today to get
              started.
            </p>
            {/* <div className="flex lg:flex-col flex-row lg:items-start items-center lg:my-0 my-5">
              <h6 className=" lg:mt-5 lg:mb-3">Connect with us:</h6>
              <p className="flex justify-between w-32 lg:ms-0 ms-3">
                {" "}
                <a target="_blank" href="https://twitter.com/realbrandopt">
                  <BsTwitter className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/brandoptreal"
                >
                  {" "}
                  <BsInstagram className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />
                </a>
                <a target="_blank" href="https://www.facebook.com/vishnu.g05">
                  {" "}
                  <BsFacebook className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />
                </a>
                <a target="_blank" href="https://t.me/vishnu_g04">
                  {" "}
                  <BsTelegram className="cursor-pointer hover:text-[#FF72AC] text-xl transition-all " />
                </a>
              </p>
            </div> */}
          </div>
          <form
            onSubmit={handleSubmit(contactUs)}
            className="max-w-[700px] xl:w-[700px] px-[.5em]"
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  className={`my-2 border-2  bg-transparent border-1 border-[#fafafa89] w-full rounded-none py-3 px-5 text-white`}
                  placeholder="Name"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <span className="text-red-700">{errors.name.message}</span>
            )}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  className={`my-2 border-2  bg-transparent border-1 border-[#fafafa89] w-full rounded-none py-3 px-5 text-white`}
                  placeholder="Email"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <span className="text-red-700">{errors.email.message}</span>
            )}
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  className={`my-2 border-2  bg-transparent border-1 border-[#fafafa89] w-full rounded-none py-3 px-5 text-white`}
                  placeholder="Mobile"
                  {...field}
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-700">{errors.phone.message}</span>
            )}
            {/* <Controller
            name="budget"
            control={control}
            defaultValue="null"
            render={({ field }) => (
              <select
                className=" my-2 border-2 border-black w-full rounded-md py-3 px-5 text-[#7e7e7e]"
                {...field}
              >
                <option value="Null">Budget (Optional)</option>
                <option value="1000">Less than $1,000</option>
                <option value="$1000 - $5000">$1,000 - $5,000</option>
                <option value="$5000 - $1000">$5,000 - $10,000</option>
                <option value="$10000 - $20000">$10,000 - $20,000</option>
                <option value="$20,000 +">$20,000 +</option>
              </select>
            )}
          />
          {errors.budget && (
            <span className="text-red-700">{errors.budget.message}</span>
          )} */}
            {/* <Controller
            name="category"
            control={control}
            defaultValue="Start a new Brand"
            render={({ field }) => (
              <select
                className=" my-2 border-2 border-black w-full rounded-md py-3 px-5 text-[#7e7e7e]"
                {...field}
              >
                <option value="Start a new Brand">Start a new Brand</option>
                <option value="Optimise my brand">Optimise my brand</option>
              </select>
            )}
          />
          {errors.category && (
            <span className="text-red-700">{errors.category.message}</span>
          )} */}
            {/* <Controller
            name="companyName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="text"
                className={`my-2 border-2  border-black w-full rounded-md py-3 px-5 text-[#7e7e7e]`}
                placeholder="Company name"
                {...field}
              />
            )}
          />
          {errors.companyName && (
            <span className="text-red-700">{errors.companyName.message}</span>
          )} */}
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <textarea
                  className={`my-2 border-2  bg-transparent border-1 border-[#fafafa89] w-full rounded-none py-3 px-5 text-white`}
                  rows={4}
                  placeholder="Describe your project"
                  {...field}
                />
              )}
            />
            {errors.description && (
              <span className="text-red-700">{errors.description.message}</span>
            )}
            {errorMessage && (
              <div className="my-2 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className={`submitBtn my-2 text-black  bg-white w-full py-3 px-5 mouse-hover disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={submitStatus === "loading"}
            >
              {submitStatus === "loading" ? "Please wait..." : "Send Us a message"}
            </button>
          </form>
        </motion.div>
        <div></div>
      </div>
      <Mouse position={position} />
    </div>
  );
};

export default Page;
