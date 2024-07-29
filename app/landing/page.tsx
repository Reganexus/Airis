import React, { FC } from "react";
import Hero from "./hero";
import Personas from "./personas";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const LandingMainContent: FC<MyComponentProps> = () => {
  return (
    <>
      <Hero />
      <Personas />
    </>
  );
};

export default LandingMainContent;
