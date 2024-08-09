"use client";

import React, { FC } from "react";
import Logo from "@/components/component/logo";
import Link from "next/link";
import { url } from "inspector";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const Header: FC<MyComponentProps> = () => {
  return (
    <header className="z-20 sticky inset-0 shadow flex justify-between items-center h-[4rem] border-b border-slate-300 px-4 bg-white">
      <Logo />

      <ul className="hidden sm:flex sm:gap-10 absolute inset-0 justify-center items-center gap-10">
        <Link href="#features">Features</Link>
        <Link href="#pricing">Pricing</Link>
        <Link href="#about">About Us</Link>
      </ul>

      <div className="hidden sm:flex sm:gap-3 items-align gap-4 py-3 z-20">
        <Link
          href={{ pathname: "/entry", query: { type: "register" } }}
          className="bg-none border border-slate-700 rounded-lg px-4 p-2 hover:bg-slate-200 flex items-center"
        >
          Sign Up
        </Link>
        <Link
          href="/entry"
          className="bg-primary hover:bg-sky-700 text-white rounded-lg px-4 flex items-center "
        >
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;

const HamburgerIconButton = () => {
  return (
    <button
      className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 sm:hidden"
      onClick={() => {}}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
};
