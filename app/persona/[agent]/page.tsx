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
  /**
   * variable that wil hold the url of all personas's
   */
  const [selectedPersona, setSelectedPersonaId] = useState<SelectedPersona>();

  const { agent } = useParams(); // Access the dynamic route parameter

  useEffect(() => {
    async function fetchPersona() {
      const response = await fetch('/api/query/query-persona-selected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          persona: agent
        }),
        cache: 'force-cache',
        next: { revalidate: 3600 }
      });



      const data = await response.json();
      setSelectedPersonaId({
        persona_id: data[0].persona_id,
        persona_name: data[0].name,
        persona_tagline: data[0].tagline,
        persona_link: data[0].persona_link
    });
    }

    fetchPersona();
  }, [agent]);

    

  return (
    <PromptSelection selectedPersona={selectedPersona} />
  );
}
