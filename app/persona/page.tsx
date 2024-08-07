'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import personaData from "@/lib/persona-url";
import { format } from "path";
import { fetchChatbotAllSelection, fetchPersonas } from "@/lib/db/fetch-queries";
import { Persona, PersonaChatbots, SelectedPersona } from "@/lib/types";
import { useParams } from "next/navigation";
import PromptSelection from "@/app/main/prompt-selection";

/**
 * Renders the Sidebar, Persona Selection and Prompt Selection Components
 */
export default function Home() {

  return (
    <div>
        <center>
            Hello! Please select a Prompt
            This is a placeholder
        </center>
    </div>
  );
}