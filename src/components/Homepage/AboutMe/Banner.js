import React from "react";

const Banner = (props) => {
  return (
    <div className={`relative  w-screen  ${props.className}`}>
      <div className="absolute animate-marquee hover:pause">
        <span className="float-left flex justify-around py-5 text-3xl items-center text-[#BEBEBE]  bg-[#212121]">
          <div className="mx-12">UI&nbsp;UX&nbsp;DESIGN</div>
          <div className="mx-12">FRONT&nbsp;END</div>
          <div className="mx-12">BACK&nbsp;END</div>
          <div className="mx-12">FULL&nbsp;STACK</div>
          <div className="mx-12">JAVASCRIPT</div>
          <div className="mx-12">WORDPRESS</div>
          <div className="mx-12">ECOMMERCE</div>
          <div className="mx-12">UI&nbsp;UX&nbsp;DESIGN</div>
          <div className="mx-12">FRONT&nbsp;END</div>
          <div className="mx-12">BACK&nbsp;END</div>
          <div className="mx-12">FULL&nbsp;STACK</div>
          <div className="mx-12">JAVASCRIPT</div>
          <div className="mx-12">WORDPRESS</div>
          <div className="mx-12">ECOMMERCE</div>
        </span>
      </div>
    </div>
  );
};

export default Banner;
