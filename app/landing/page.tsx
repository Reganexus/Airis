import React, { FC } from "react";
import Hero from "./hero";
import Personas from "./personas";
import Features from "./features";
import Team from "./team";
import Pricing from "./pricing";
import Footer from "./footer";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const LandingMainContent: FC<MyComponentProps> = () => {
  return (
    <>
      <Hero />
      <Personas />
      <Features />
      <Pricing />
      <Team />
      <Footer />
    </>
  );
};

export default LandingMainContent;
