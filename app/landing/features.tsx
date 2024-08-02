import React, { FC } from "react";
import Image from "next/image";

import Link from "next/link";

// Functional Component
const Features: FC = () => {
  return (
    <section className="bg-white flex flex-col items-center gap-8 py-20">
      <Feature1 />
      <Feature2 />
      <Feature3 />
    </section>
  );
};

export default Features;

const Feature1: FC = () => {
  return (
    <div className="sm:flex flex-row max-w-[1200px] m-auto mb-12 sm:px-8">
      <div className="sm:basis-[50%] flex justify-center items-center sm:p-0 px-8">
        <div className="w-full h-[30rem] rounded-lg bg-feature1 bg-contain bg-center bg-no-repeat">
          {/* picture here */}
        </div>
      </div>

      <div className="sm:basis-[50%] p-8 pr-4 flex flex-col justify-center">
        <h2 className="text-4xl sm:text-3xl font-bold text-slate-700 mb-6">
          Do more with generative AI
        </h2>
        <p className="text-xl sm:text-lg mb-10">
          Elevate your business with generative AI, enabling rapid content
          creation, improved customer interactions, and streamlined
          decision-making. Focus on strategic tasks and innovation while AI
          handles high-quality outputs quickly and accurately.
        </p>
        <div>
          <Link
            className="text-xl text-primary border border-primary px-8 py-2 rounded-lg"
            href={{ pathname: "/entry", query: { type: "register" } }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

const Feature2: FC = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row max-w-[1200px] m-auto mb-12 sm:px-8">
      <div className="sm:basis-[50%] p-8 pr-4 flex flex-col justify-center">
        <h2 className="text-4xl sm:text-3xl font-bold text-slate-700 mb-6">
          A collection of personas for your business needs
        </h2>
        <p className="text-xl sm:text-lg mb-10">
          Tailor your approach to diverse customer segments with our
          meticulously crafted personas. Enhance marketing campaigns, customer
          experiences, and product development by understanding and addressing
          the unique needs of your audience.
        </p>
        <div>
          <Link
            className="text-xl text-primary border border-primary px-8 py-2 rounded-lg"
            href={{ pathname: "/entry", query: { type: "register" } }}
          >
            Sign up
          </Link>
        </div>
      </div>

      <div className="sm:basis-[50%] flex justify-center items-center sm:p-0 px-8">
        <div className="w-full h-[30rem] rounded-lg bg-feature2 bg-contain bg-center bg-no-repeat">
          {/* picture here */}
        </div>
      </div>
    </div>
  );
};

const Feature3: FC = () => {
  return (
    <div className="sm:flex flex-row max-w-[1200px] m-auto mb-12 sm:px-8">
      <div className="sm:basis-[50%] flex justify-center items-center sm:p-0 px-8">
        <div className="w-full h-[30rem] rounded-lg bg-feature3 bg-contain bg-center bg-no-repeat">
          {/* picture here */}
        </div>
      </div>

      <div className="sm:basis-[50%] p-8 pr-4 flex flex-col justify-center">
        <h2 className="text-4xl sm:text-3xl font-bold text-slate-700 mb-6">
          Automate your workflow
        </h2>
        <p className="text-xl sm:text-lg mb-10">
          Boost efficiency by automating repetitive tasks and reducing errors
          with our seamless automation solutions. Save time and enhance
          productivity, allowing your team to focus on strategic, value-added
          activities.
        </p>
        <div>
          <Link
            className="text-xl text-primary border border-primary px-8 py-2 rounded-lg"
            href={{ pathname: "/entry", query: { type: "register" } }}
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
