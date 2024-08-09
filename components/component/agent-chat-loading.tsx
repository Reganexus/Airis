import Image from "next/image";
import React, { useState, useEffect } from "react";
// import Typewriter from "./typewriter-effect";
import Typewriter from "typewriter-effect";

const AgentChatLoading = ({ aiLogo, aiName }: { aiLogo: any; aiName: any }) => {
  return (
    <div className="flex items-start gap-1">
      <div className="pt-4">
        <div className="h-[40px] w-[40px] rounded-full bg-slate-400 overflow-clip">
          <Image
            src={aiLogo ?? "/default_blue.png"}
            alt="default chatbot icon"
            width={100}
            height={100}
          />
        </div>
      </div>

      <div className="relative grid gap-1.5 p-3 px-4 text-base">
        <h1 className="font-semibold">{aiName}</h1>

        <p className="text-slate-600 dark:text-slate-400">
          <Typewriter
            options={{
              strings: "Generating Response...",
              autoStart: true,
              delay: 10,
            }}
          />
        </p>
      </div>
    </div>
  );
};

export default AgentChatLoading;
