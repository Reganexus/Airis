import React from "react";
import Image from "next/image";
import "./marquee.css";

const Marquee: React.FC = () => {
  return (
    <div className="basis-[65%] h-full">
      <div className="marquee-container h-full">
        <div className="marquee-content">
          <div className="h-96 my-10 flex pr-16 pl-16">
            <h2 className="basis-[60%] text-white text-3xl flex items-center">
              A collection of personas for your business needs
            </h2>

            <div className="relative h-full basis-[40%]">
              <Image
                src="/f1_login.png"
                alt="feature chatbot"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div className="h-96 my-10 flex pr-8">
            <div className="relative h-full basis-[40%]">
              <Image
                src="/f1_login.png"
                alt="feature chatbot"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h2 className="basis-[60%] text-white text-3xl flex items-center">
              A collection of personas for your business needs
            </h2>
          </div>

          <div className="h-96 my-10 flex pr-8">
            <h2 className="basis-[60%] text-white text-3xl flex items-center">
              A collection of personas for your business needs
            </h2>

            <div className="relative h-full basis-[40%]">
              <Image
                src="/f1_login.png"
                alt="feature chatbot"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
