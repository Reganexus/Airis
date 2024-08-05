'use client';
import Link from "next/link";
import SideBar from "./main/side-bar";
import PersonaSelection from "./main/persona-selection";
import PromptSelection from "./main/prompt-selection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import personaData from "@/lib/persona-url";
import { format } from "path";
import { fetchPersonas } from "@/lib/db/fetch-queries";



/**
 * Renders the Home component.
 *
 * @returns {null} Returns null.
 */
export default function Home() {
  /**
   * variable that wil hold the url of all personas's
   */
  const [personaFormattedNames, setPersonaFormattedNames] = useState<string[]>();

  useEffect(() => {

    /**
     * Get all the personaData from the database and
     * it will be converted into urls
     */
    const fetchData = async () => {
      
      const personas = await fetchPersonas();
      const personaLinks: string[] = [];
      personas.forEach((item: any) => {
        
        personaLinks.push(item.persona_link);
      });
      setPersonaFormattedNames(personas);
    };

    fetchData();
  }, []);
  
  const router = useRouter();

  if (personaFormattedNames) {
    // push the first persona url
    router.push(personaFormattedNames[0]);
    router.refresh();
  }

  return null;
}
