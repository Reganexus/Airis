"use client";

import { Suspense, useEffect, useState } from "react";
import { SelectedPersona } from "@/lib/types";
import { useParams } from "next/navigation";
import PromptSelection from "@/app/main/prompt-selection";
import { fetchPersonaSelected } from "@/lib/db/fetch-queries";
import Loading from "../persona-selection-loading";
import { list } from "@vercel/blob";
import { notFound } from 'next/navigation'
import { useRouter } from "next/navigation";
import NotFoundAgent from "../not-found";

/**
 * Renders the Prompt Selection Components
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  /**
   * variable that wil hold the URL of all personas's
   */
  const [selectedPersona, setSelectedPersonaId] = useState<SelectedPersona>();
  const [found, setFound] = useState<Boolean>(true);  // Used on Not-Found Page 
  // Access the dynamic route parameter
  const { agent } = useParams();
  useEffect(() => {
    setIsLoading(true);

    // Get the Selected Persona Information
    async function getPersona() {

      const data = await fetchPersonaSelected(agent);
      if (data) {
        
        // Get the URL to the image
        setSelectedPersonaId({
          persona_id: data.persona_id,
          persona_name: data.name,
          persona_tagline: data.tagline,
          persona_link: data.persona_link,
          persona_icon: sessionStorage.getItem("persona_logo")  // The persona Logo  is saved when PersonaCard Component is clicked
        });
        setIsLoading(false);
        
      } else {
        setIsLoading(false);
        setFound(false);
      }

    }
    getPersona();
  }, [agent]);

  if (found) {
    return (
      <PromptSelection selectedPersona={selectedPersona} isLoading={isLoading} />
    );
    
  } else {
    
    return <NotFoundAgent />;
  }
}
