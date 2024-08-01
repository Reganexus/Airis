"use client";

import React, { FC } from "react";
import Logo from "@/components/component/logo";
import Link from "next/link";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const Header: FC<MyComponentProps> = () => {
  return (
    <header className="z-20 sticky inset-0 shadow flex justify-between items-align h-[4rem] border-b border-slate-300 px-4 bg-white">
      <Logo />

      <ul className="hidden sm:flex sm:gap-3 absolute inset-0 justify-center items-center gap-10">
        <Link href="#">Features</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">About Us</Link>
      </ul>

      <div className="hidden sm:flex sm:gap-3 items-align gap-4 py-3 z-20">
        <Link
          href="/entry"
          className="bg-none border border-slate-700 rounded-lg px-4 hover:bg-slate-200 flex items-center"
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
