import React, { FC } from "react";
import Hero from "./hero";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const LandingMainContent: FC<MyComponentProps> = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default LandingMainContent;
