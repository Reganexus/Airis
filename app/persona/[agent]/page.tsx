"use client";

import { Suspense, useEffect, useState } from "react";
import { SelectedPersona } from "@/lib/types";
import { useParams } from "next/navigation";
import PromptSelection from "@/app/main/prompt-selection";
import { fetchPersonaSelected } from "@/lib/db/fetch-queries";
import Loading from "../persona-selection-loading";

/**
 * Renders the Prompt Selection Components
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  /**
   * variable that wil hold the URL of all personas's
   */
  const [selectedPersona, setSelectedPersonaId] = useState<SelectedPersona>();

  // Access the dynamic route parameter
  const { agent } = useParams();

  useEffect(() => {
    setIsLoading(true);

    // Get the Selected Persona Information
    async function getPersona() {
      const data = await fetchPersonaSelected(agent);
      setSelectedPersonaId({
        persona_id: data.persona_id,
        persona_name: data.name,
        persona_tagline: data.tagline,
        persona_link: data.persona_link,
      });
      setIsLoading(false);
    }
    getPersona();
  }, [agent]);

  return (
    <PromptSelection selectedPersona={selectedPersona} isLoading={isLoading} />
  );
}
