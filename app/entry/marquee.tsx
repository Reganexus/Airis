import React from "react";
import Image from "next/image";
import "./marquee.css";

const Marquee: React.FC = () => {
  return (
    <div className="marquee-container h-full">
      <div className="marquee-content pr-10">
        {/* Section 1 */}
        <div className="h-96 my-10 flex pr-16 pl-16">
          <h2 className="basis-[40%] text-white text-4xl flex items-center">
            Do more with generative AI
          </h2>

          <div className="relative h-full basis-[60%]">
            <Image
              src="/img/feature_1_small.png"
              alt="feature chatbot"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="h-96 my-10 flex pr-8">
          <div className="relative h-full basis-[60%]">
            <Image
              src="/img/feature_2_small.png"
              alt="feature chatbot"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <h2 className="basis-[40%] text-white text-4xl flex items-center py-10">
            A collection of personas for your business needs
          </h2>
        </div>

        {/* Section 3 */}
        <div className="h-96 my-10 flex pr-8 pl-28">
          <h2 className="basis-[40%] text-white text-4xl flex items-center">
            Automate your workflow
          </h2>

          <div className="relative h-full basis-[60%]">
            <Image
              src="/img/feature_3_small.png"
              alt="feature chatbot"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className="marquee-content pr-10">
        {/* Section 1 */}
        <div className="h-96 my-10 flex pr-16 pl-16">
          <h2 className="basis-[40%] text-white text-4xl flex items-center">
            Do more with generative AI
          </h2>

          <div className="relative h-full basis-[60%]">
            <Image
              src="/img/feature_1_small.png"
              alt="feature chatbot"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="h-96 my-10 flex pr-8">
          <div className="relative h-full basis-[60%]">
            <Image
              src="/img/feature_2_small.png"
              alt="feature chatbot"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </div>
          <h2 className="basis-[40%] text-white text-4xl flex items-center py-10">
            A collection of personas for your business needs
          </h2>
        </div>

        {/* Section 3 */}
        <div className="h-96 my-10 flex pr-8 pl-28">
          <h2 className="basis-[40%] text-white text-4xl flex items-center">
            Automate your workflow
          </h2>

          <div className="relative h-full basis-[60%]">
            <Image
              src="/img/feature_3_small.png"
              alt="feature chatbot"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
