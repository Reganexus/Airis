"use client";

import React, { MouseEventHandler } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const SideBar: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-2 bg-slate-200 h-screen w-[80px] p-2 border-l-2 border-slate-300">
      {/* User Card */}
      <div className="flex flex-col items-center gap-2 rounded-lg border border-slate-300 bg-white overflow-clip pb-2">
        <div className="flex items-center p-3 bg-main-gradient bg-cover border-b-1 border-slate-400">
          <div className="h-[40px] w-[40px] rounded-full bg-slate-400 overflow-clip">
            <Image
              src="/user_placeholder_img.png"
              alt="default user image"
              width={100}
              height={100}
            />
          </div>
        </div>
        {/* Account Button */}
        <Button variant="ghost" size="icon" className="bg-none">
          <AccountIcon />
          <span className="sr-only">Account</span>
        </Button>

        {/* Settings Button */}
        <Button variant="ghost" size="icon" className="bg-none">
          <SettingsIcon />
          <span className="sr-only">More</span>
        </Button>
      </div>

      {/* Persona Selection Card */}
      <PersonaSelectionCard />

      {/* Chat History Card */}
      <div className="grow flex flex-col items-center rounded-lg border border-slate-300 bg-white overflow-auto">
        <ChatHistory emoji="😂" />
        <ChatHistory emoji="🍃" />
        <ChatHistory emoji="👌" />
        <ChatHistory emoji="❤️" />
        <ChatHistory emoji="😁" />
      </div>
    </div>
  );
};

export default SideBar;

interface PersonaSelectionCardProps {}

const PersonaSelectionCard: React.FC<PersonaSelectionCardProps> = ({}) => {
  const [activePersona, setActivePersona] = React.useState(0);
  const personas = [
    { picture: "/default_blue.png", aiTooltipName: "Legal AI" },
    { picture: "/3_var.png", aiTooltipName: "Marketing AI" },
    { picture: "/6_var.png", aiTooltipName: "Human Resources AI" },
    { picture: "/2_var.png", aiTooltipName: "Internship Guide AI" },
    { picture: "/4_var.png", aiTooltipName: "Mentor AI" },
    { picture: "/5_var.png", aiTooltipName: "Admin AI" },
  ];

  return (
    <div className="flex flex-col items-center rounded-lg border border-slate-300 bg-white pb-4">
      {personas.map((persona, index) => (
        <PersonaAvatar
          key={index}
          picture={persona.picture}
          aiTooltipName={persona.aiTooltipName}
          isActive={index === activePersona}
          onClick={() => setActivePersona(index)}
        />
      ))}
    </div>
  );
};

// Persona Avatar
interface PersonaAvatarProps {
  picture: string;
  alt?: string;
  aiTooltipName: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
}

const PersonaAvatar: React.FC<PersonaAvatarProps> = ({
  picture,
  alt = "picture",
  onClick,
  aiTooltipName,
  isActive,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <button
      className={`pt-4 hover:cursor-pointer relative`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`h-[40px] w-[40px] rounded-full bg-slate-400 overflow-clip ${
          isActive ? "outline outline-offset-2 outline-blue-400" : "border-none"
        }`}
      >
        <Image src={picture} alt={alt} width={100} height={100} />
      </div>
      {/* Tooltip */}
      <div
        className={`absolute px-4 py-2 z-10 right-[110%] bottom-[2%] shadow-md bg-white rounded-lg border border-slate-300 ${
          isHovered ? "visible" : "invisible"
        }`}
      >
        <p className="font-medium text-slate-600 text-nowrap">
          {aiTooltipName}
        </p>
      </div>
    </button>
  );
};

interface ChatHistoryProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  emoji: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ onClick, emoji }) => {
  return (
    <button className="pt-4 hover:cursor-pointer" onClick={onClick}>
      <div className="h-[40px] w-[40px] rounded-lg bg-slate-100 hover:bg-slate-200 overflow-clip border border-slate-300 flex items-center justify-center text-[20px]">
        {emoji}
      </div>
    </button>
  );
};

// ICONS
function AccountIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}
