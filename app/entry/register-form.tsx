"use client";

import React, { ChangeEvent } from "react";
import { FormEvent } from 'react';
import Logo from "@/components/component/logo";
import { useState } from "react";
interface RegisterFormProps {
  onClick: Function;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ onClick }) => {

  const [errors, setErrors] = useState([]);
  const [strnth, setStrnth] = useState("");

  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        fname: formData.get('fname'),
        lname: formData.get('lname'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        password2: formData.get('password2'),
      }),
    });

    if(response.status == 200){
        console.log("REGISTRATION SUCCESS")
        setErrors([]);
        console.log({ response });
        onClick();
        // router.push('/login');
        // router.refresh();
    }
    else{
      const errorData = await response.json(); 
      
      console.log("REGISTRATION FAILED")
      setErrors(errorData['errors']);
      console.log(errorData['errors']);
    }
  };

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    const newPassword = e.target.value;

    // return an empty string if newPassword is equal to zero
    if (newPassword.length === 0) {
      setStrnth("");
      return;
  }
    // Initialize variables to count the different characteristics
    let hasUpperCase = /[A-Z]/.test(newPassword);
    let hasLowerCase = /[a-z]/.test(newPassword);
    let hasNumber = /[0-9]/.test(newPassword);
    let hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);
    let lengthValid = newPassword.length >= 8;


    let strength = 0;
    if(hasUpperCase) strength++;
    if(hasLowerCase) strength++;
    if(hasNumber) strength++;
    if(hasSpecialChar) strength++;
    if(lengthValid) strength++;

    // Determine strength label based on the criteria met
      if (strength === 5) {
        setStrnth("very strong");
    } else if (strength === 4) {
        setStrnth("strong");
    } else if (strength === 3) {
        setStrnth("weak");
    } else {
        setStrnth("very weak");
    }
  }

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
      <form onSubmit={handleSubmit}>
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
              required />
          </div>

          <div>
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last Name"
              className="border py-2 px-3 rounded-lg"
              required />
          </div>
        </div>

        {/* Username */}
        <div className="flex flex-col mb-3">
          <label htmlFor="uname">Username</label>
          <input
            type="text"
            name="username"
            id="uname"
            placeholder="Username"
            className="border py-2 px-3 rounded-lg"
            required/>
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
            required/>
        </div>

        {/* Password */}
        <div className="flex flex-col mb-3">
          <label htmlFor="pword">Password</label>
          <input
            type="password"
            name="password"
            id="pword"
            onChange={handlePasswordChange}
            placeholder="Password"
            className="border py-2 px-3 rounded-lg"
          />
          {/* Password Strength */}
          <PasswordStrength strength={strnth} />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col mb-3">
          <label htmlFor="cpword">Confirm Password</label>
          <input
            type="password"
            name="password2"
            id="cpword"
            placeholder="Password"
            className="border py-2 px-3 rounded-lg"
          />
        </div>

        <input
          type="submit"
          value="Sign Up"
          className="bg-primary w-full my-2 text-white py-3 rounded-lg"
        />

      <div>
        {errors != null && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      </form>

      <p className="mt-auto text-center text-slate-600">
        © 2023 Smart Prodigy. All rights reserved.
      </p>
    </div>
  );
};

export default RegisterForm;

interface PasswordStrengthProps {
  strength?: "" | "very weak" | "weak" | "strong" | "very strong";
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  strength = "",
}) => {
  let barColor = "";
  let fill = 0;

  switch (strength) {
    case "very weak":
      barColor = "bg-password-v-weak";
      fill = 1;
      break;
    case "weak":
      barColor = "bg-password-weak";
      fill = 2;
      break;
    case "strong":
      barColor = "bg-password-strong";
      fill = 3;
      break;
    case "very strong":
      barColor = "bg-password-v-strong";
      fill = 4;
      break;
    default:
      barColor = "";
      break;
  }

  return (
    <div className="flex items-center mt-1 gap-2 nowrap">
      <p className="text-slate-600 text-sm">
        <span className="font-medium">Strength:</span> {strength}
      </p>

      {/* Visual indicator the bar */}
      <div className="border border-slate-300 grow flex p-1 gap-1 rounded-lg h-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`${
              fill - 1 >= index ? barColor : ""
            } border border-slate-300 rounded-md flex-1`}
          ></div>
        ))}
      </div>
    </div>
  );
};

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
