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

/**
 * Renders the Sidebar, Persona Selection and Prompt Selection Components
 */
export default function Home() {
  return (
    <main className="bg-slate-200 w-full flex justify-center items-center dark:bg-dark-mode">
      <WelcomeScreen />
    </main>
  );
}
