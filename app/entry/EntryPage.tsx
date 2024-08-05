// EntryPage.tsx (Client Component)
"use client";

import React, { FC } from "react";
import Marquee from "./marquee";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";

// Define Props Interface
interface MyComponentProps {}

const EntryPage: FC<MyComponentProps> = () => {
  const [isRegisterForm, setIsRegisterForm] = React.useState<boolean>(false);

  const toggleForm = () => setIsRegisterForm((f) => !f);

  return (
    <div className="bg-entry h-screen bg-cover">
      <div className="h-full w-full sm:max-w-7xl flex justify-center items-center m-0 sm:m-auto">
        <div
          className={
            isRegisterForm
              ? "p-4 basis-[100%] md:basis-[35%] flex justify-center items-center"
              : `hidden md:block md:basis-[65%] md:h-full`
          }
        >
          {isRegisterForm ? <RegisterForm onClick={toggleForm} /> : <Marquee />}
        </div>

        <div
          className={
            !isRegisterForm
              ? "p-4 basis-[100%] md:basis-[40%] flex justify-center items-center"
              : `hidden md:block md:basis-[60%] md:h-full md:pl-16`
          }
        >
          {!isRegisterForm ? <LoginForm onClick={toggleForm} /> : <Marquee />}
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
