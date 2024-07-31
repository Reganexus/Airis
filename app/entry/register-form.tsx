"use client";

import React from "react";
import Logo from "@/components/component/logo";

interface RegisterFormProps {
  onClick: Function;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClick }) => {
  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="bg-white w-full p-8 h-[40rem] rounded-lg flex flex-col relative">
      <button
        className="absolute top-2 left-2 text-slate-600 p-2 hover:bg-slate-200 rounded-lg"
        onClick={handleToggleForm}
      >
        <BackButtonIcon />
      </button>

      <div className="mb-8">
        <h2 className="text-center text-2xl  text-slate-700 font-semibold">
          Sign up to Airis
        </h2>
      </div>

      {/* FORM HERE */}
      <form action="">
        {/* First and Last Name */}
        <div className="relative flex mb-3 gap-2">
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First Name"
              className="border py-2 px-3 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              className="border py-2 px-3 rounded-lg"
            />
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col mb-3">
          <label htmlFor="uname">Username</label>
          <input
            type="text"
            name="uname"
            id="uname"
            placeholder="Username"
            className="border py-2 px-3 rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="border py-2 px-3 rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-3">
          <label htmlFor="pword">Password</label>
          <input
            type="password"
            name="pword"
            id="pword"
            placeholder="Password"
            className="border py-2 px-3 rounded-lg"
          />
          {/* Password Strength */}
          <PasswordStrength />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col mb-3">
          <label htmlFor="cpword">Confirm Password</label>
          <input
            type="password"
            name="cpword"
            id="cpword"
            placeholder="Password"
            className="border py-2 px-3 rounded-lg"
          />
        </div>

        <input
          type="button"
          value="Sign Up"
          className="bg-primary w-full my-2 text-white py-3 rounded-lg"
        />
      </form>

      <p className="mt-auto text-center text-slate-600">
        © 2023 Smart Prodigy. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterForm;

const BackButtonIcon = () => {
  return (
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
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
};

const PasswordStrength = () => {
  return (
    <div className="flex mt-1 gap-1 nowrap">
      <p className="text-slate-600 text-sm">
        <span className="font-medium">Strength:</span> {"%Strength%"}
      </p>

      {/* Visual indicator the bar */}
      <div className="bg-slate-300 grow flex p-1 gap-1 rounded-lg">
        <div className="bg-slate-500 rounded-md flex-1"></div>
        <div className="bg-slate-500 rounded-md flex-1"></div>
        <div className="bg-slate-500 rounded-md flex-1"></div>
        <div className="bg-slate-500 rounded-md flex-1"></div>
      </div>
    </div>
  );
};
