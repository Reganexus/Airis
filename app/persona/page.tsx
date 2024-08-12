"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "path";
import {
  fetchChatbotAllSelection,
  fetchPersonas,
} from "@/lib/db/fetch-queries";
import { Persona, PersonaChatbots, SelectedPersona } from "@/lib/types";
import { useParams } from "next/navigation";
import PromptSelection from "@/app/main/prompt-selection";
import WelcomeScreen from "../main/welcome-screen";
import { SessionProvider } from "next-auth/react";

/**
 * Renders the Sidebar, Persona Selection and Prompt Selection Components
 */
interface ChildComponentProps {
  setIsPersonaSelectionOpen: any;
}

const Home: React.FC<ChildComponentProps> = ({ setIsPersonaSelectionOpen }) => {
  console.log("home page: ", setIsPersonaSelectionOpen);
  return (
    <main className="bg-slate-200 w-full flex justify-center items-center dark:bg-dark-mode">
      <SessionProvider>
        <WelcomeScreen />
      </SessionProvider>
    </main>
  );
};

export default Home;
