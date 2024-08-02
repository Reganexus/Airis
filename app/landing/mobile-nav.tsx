"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/component/logo";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Button to toggle the nav menu */}
      <button
        onClick={toggleNav}
        className="fixed top-3 right-3 z-[20] p-2 text-gray-600 hover:text-gray-800 sm:hidden"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 6h15m-15 6h15m-15 6h15"
          />
        </svg>
      </button>

      {/* Sliding Nav Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <Logo logoSize={70} textSize="6xl" />

            <button
              onClick={toggleNav}
              className="text-gray-600 self-start p-3 rounded-lg hover:bg-red-100 hover:text-red-800"
            >
              {/* Close icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col text-xl mb-8 gap-4">
            <Link href="#" className="hover:bg-slate-200 p-4 rounded-lg">
              Features
            </Link>
            <Link href="#" className="hover:bg-slate-200 p-4 rounded-lg">
              Pricing
            </Link>
            <Link href="#" className="hover:bg-slate-200 p-4 rounded-lg">
              About Us
            </Link>
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              href="/entry"
              className="p-4 text-xl border border-slate-700 rounded-lg hover:bg-slate-200"
            >
              Sign Up
            </Link>
            <Link
              href="/entry"
              className="p-4 text-xl bg-primary text-white rounded-lg hover:bg-sky-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
