import React, { FC } from "react";
import Link from "next/link";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const Hero: FC<MyComponentProps> = () => {
  return (
    <section className="relative bg-cover bg-center bg-main-gradient flex flex-col justify-center align-center h-[50rem]">
      <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-30"></div>

      <div className="mb-12 z-10 max-w-[1200px] mx-auto">
        <h1 className="text-center text-6xl text-white">
          Revolutionizing the Business Startup Landscape through{" "}
          <span className="font-bold">generative AI</span>
        </h1>
      </div>

      <div className="z-10 flex justify-center items-align gap-4 py-3">
        <Link
          href="#"
          className="text-2xl px-8 py-2 text-white border-2 border-white rounded-lg px-4 flex items-center hover:bg-white hover:text-slate-700"
        >
          Chat Now
        </Link>
        <Link
          href="#"
          className="text-2xl px-8 py-2 text-white border-2 text-white border-white rounded-lg px-4 flex items-center hover:bg-white hover:text-slate-700"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default Hero;