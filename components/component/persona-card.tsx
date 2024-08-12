"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PersonaCardProps {
  persona: string;
  setIsOpenHistory: Function;
  task: string | null;
  logo: string | null;
  setMobileIsOpenHistory: (m: boolean) => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  setIsOpenHistory,
  task,
  logo,
  setMobileIsOpenHistory,
}) => {
  return (
    <div className="sticky top-0 z-10 flex justify-between items-center gap-4 max-w-5xl m-auto bg-white dark:bg-slate-700 dark:border-slate-500 p-2 px-3 rounded-lg border shadow-md shadow-slate-600/20 mob:shadow-none mob:fixed mob:p-0 w-full mob:py-2 mob:rounded-none mob:bg-slate-100">
      <div className="flex items-center gap-2 z-10">
        <BackToPersonaSelectionButton />
        <PersonaChatHistoryButton setIsOpenHistory={setIsOpenHistory} />

        <div className="w-[40px] h-[40px] rounded-full overflow-clip mob:hidden">
          <Image
            src={logo ?? "/persona_icons/icon_law.png"}
            alt="default chabot icon"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* TOPIC NAME INSERT HERE */}
      <div className="absolute inset-0 w-full flex justify-center items-center font-semibold text-slate-700 dark:text-slate-300 ">
        <p className="mob:max-w-60 mob:text-nowrap mob:text-center overflow-hidden text-ellipsis mob:px-4">
          {task ?? ""}
        </p>
      </div>

      <div className="hidden mob:flex z-10">
        <button
          className="px-4"
          onClick={() => {
            setMobileIsOpenHistory(true);
          }}
        >
          <MenuIcon />
        </button>
      </div>

      <div className="item-center z-10 hidden">
        <Button
          variant="ghost"
          size="icon"
          className="bg-none dark:text-slate-300"
        >
          <SettingsIcon />
          <span className="sr-only">Settings</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="bg-none dark:text-slate-300"
        >
          <NewChatIcon />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>
    </div>
  );
};

function NewChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
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
      stroke="currentColor"
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
function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

const BackToPersonaSelectionButton = () => {
  return (
    <Link
      href={`/`}
      className="text-slate-500 p-2 mob:ml-1 hover:bg-slate-200 hover:text-primary rounded-lg dark:text-slate-200 dark:hover:bg-slate-800"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </Link>
  );
};

interface PersonaChatHistoryButtonProps {
  setIsOpenHistory: Function;
}

const PersonaChatHistoryButton: React.FC<PersonaChatHistoryButtonProps> = ({
  setIsOpenHistory,
}) => {
  const [isToggled, setIsToggled] = React.useState(true);

  const handleToggle = () => {
    setIsToggled((t) => !t);
    setIsOpenHistory((h: any) => !h);
  };

  return (
    <button
      onClick={handleToggle}
      className={`mob:hidden text-slate-500 p-2 hover:bg-slate-200 hover:text-primary rounded-lg border border-slate-400 mr-2 ${
        isToggled &&
        "bg-slate-500 text-white hover:bg-slate-600 hover:text-white"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>
  );
};

export default PersonaCard;
