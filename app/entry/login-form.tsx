"use client";

import React from "react";
import Logo from "@/components/component/logo";
import Link from "next/link";

interface LoginFormProps {
  onClick: Function;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClick }) => {
  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="bg-white w-full p-8 h-[40rem] rounded-lg flex flex-col">
      <div className="mb-8">
        <Logo logoSize={90} textSize="6xl" />
        <h2 className="text-center text-3xl my-3 text-slate-700">
          Sign in to Airis
        </h2>
      </div>

      {/* FORM HERE */}
      <form action="">
        <div className="relative flex flex-col mb-3">
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="border py-2 px-3 rounded-lg"
          />
        </div>

        <div className="relative flex flex-col mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border py-2 px-3 rounded-lg"
          />
          <button className="text-blue-400 text-sm absolute right-0 top-0 hover:text-blue-600">
            Forgot Password?
          </button>
        </div>
        <input
          type="button"
          value="Sign In"
          className="bg-primary w-full my-2 text-white py-3 rounded-lg"
        />
      </form>

      <div className="flex flex-col mt-auto items-center">
        <p className="text-slate-500">Don&apos;t have an account?</p>
        <button
          onClick={handleToggleForm}
          className="py-3 border border-slate-500 w-full text-center mt-1 text-slate-500 rounded-lg"
        >
          Sign Up
        </button>
      </div>

      <p className="mt-auto text-center text-slate-600">
        © 2023 Smart Prodigy. All rights reserved.
      </p>
    </div>
  );
};

export default LoginForm;
