"use client";

import React, { FC } from "react";
import Marquee from "./marquee";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const EntryPage: FC<MyComponentProps> = () => {
  const [isRegisterForm, setIsRegisterForm] = React.useState<boolean>(false);

  const toggleForm = () => setIsRegisterForm((f) => !f);

  return (
    <div className="bg-entry h-screen bg-cover">
      <div className="h-full w-full max-w-7xl flex justify-center items-center  m-auto">
        <div
          className={
            isRegisterForm
              ? "basis-[35%] flex justify-center items-center"
              : `basis-[65%] h-full`
          }
        >
          {isRegisterForm ? <RegisterForm onClick={toggleForm} /> : <Marquee />}
        </div>

        <div
          className={
            !isRegisterForm
              ? "basis-[35%] flex justify-center items-center"
              : `basis-[65%] h-full pl-16`
          }
        >
          {!isRegisterForm ? <LoginForm onClick={toggleForm} /> : <Marquee />}
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
