"use client";

import Image from "next/image";
import React from "react";
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { getServerSession } from 'next-auth';
import router from "next/router";
import Link from "next/link";

interface SideBarProps {
  id?: string;
}


const SideBar: React.FC<SideBarProps> = ({ id })=> {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  const onDarkModeToggle = () => {
    setIsDarkMode((b) => !b);
  };

  return (
    <div className="bg-slate-50 w-20 flex flex-col justify-between border-r border-slate-300">
      {/* LOGO */}
      <Link href="/landing">
      <div className="flex justify-center items-center p-2">
        <Image
          src="/logo/airis_logo_sq_trans.png"
          alt="airis logo"
          width={70}
          height={70}
        />
      </div>
      </Link>

      {/* Profile Section */}
      <div className="flex flex-col justify-between border-t border-slate-300 items-center py-2 px-2 pb-4 pt-3">
        <div className="p-2 flex justify-center items-center hover:cursor-pointer hover:bg-slate-200 rounded-lg mb-1">
          <Image
            src="/user_placeholder_img.png"
            alt="user photo"
            width={50}
            height={50}
            className="rounded-full hover:ring-2 ring-offset-2 ring-slate-400 border-2 border-white shadow-md"
          />
        </div>

        {/* ---Icon Buttons--- */}

        <ProfileIconButton />
        <SettingsIconButton />
        <ToggleDarkModeIconButton
          onClick={onDarkModeToggle}
          isDarkMode={isDarkMode}
        />
        <LogoutIconButton />
      </div>
    </div>
  );
};

export default SideBar;

const ProfileIconButton = () => {
  return (
    <button className="text-slate-500 p-4 hover:bg-slate-200 hover:text-primary rounded-lg">
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
          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </button>
  );
};

const SettingsIconButton = () => {
  return (
    <button className="text-slate-500 p-4 hover:bg-slate-200 hover:text-primary rounded-lg">
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
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </button>
  );
};

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const ToggleDarkModeIconButton: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="text-slate-500 p-4 hover:bg-slate-200 hover:text-primary rounded-lg"
    >
      {isDarkMode ? (
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
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
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
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  );
};

const LogoutIconButton = () => {
  return (
    <button 
    onClick={
      ()=>{
        signOut({ callbackUrl: "/" });
      }
    }
    title="Sign Out"
    className="text-slate-500 p-4 hover:bg-red-100 hover:text-red-500 rounded-lg">
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
          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
        />
      </svg>
    </button>
  );
};

