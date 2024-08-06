'use client';
import Link from "next/link";
import SideBar from "./main/side-bar";
import PersonaSelection from "./main/persona-selection";
import PromptSelection from "./main/prompt-selection";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import personaData from "@/lib/persona-url";
import { format } from "path";
import { fetchChatbotAllSelection, fetchPersonas } from "@/lib/db/fetch-queries";
import { Persona, PersonaChatbots, SelectedPersona } from "@/lib/types";


/**
 * Renders the Sidebar, Persona Selection and Prompt Selection Components
 */
export default function Home() {
  /**
   * variable that wil hold the url of all personas's
   */
  const [personaLists, setPersonaLists] = useState<Persona[]>();
  const [personaChatbots, setPersonaChatbots] = useState<any[]>([]);
  const [displayChatbots, setDisplayChatbots] = useState<PersonaChatbots[]>();
  const [selectedPersona, setSelectedPersonaId] = useState<SelectedPersona>();

  useEffect(() => {
    /**
     * Get all the personaData from the database
     */
    const fetchPersonaData = async () => {
      
      const personas = await fetchPersonas();
      setPersonaLists(personas);

      setSelectedPersonaId({
        persona_id: personas[0].persona_id,
        persona_name: personas[0].name,
        persona_tagline: personas[0].tagline
      });

      // const fetchChatbotData = async () => {
      //   const chatbots = await fetchChatbotAllSelection();
      //   const displaytemp: any[] = [];
        
      //   chatbots.forEach((item: any) => {
      //     // temporary solution: 
      //     if (item.persona_id == 1) {
      //       displaytemp.push(item);
      //     }
      //   });
      //   setPersonaChatbots(chatbots);
      //   setDisplayChatbots(displaytemp);
      // }

      // fetchChatbotData();
    };

    /**
     * Get all the chatbots from the database
     */
    

    fetchPersonaData();
    
  }, []);
  
  const handlePersonaChange = (persona_id: string) => {
    // const temp: any[] = [];
    // personaChatbots.forEach((item: any) => {
    //   if (item.persona_id == persona_id) {
    //     temp.push(item);
    //   }
    // });
    if (personaLists) {
      personaLists.forEach((item: any) => {
        if (item.persona_id == persona_id) {
          setSelectedPersonaId({
            persona_id: item.persona_id,
            persona_name: item.name,
            persona_tagline: item.tagline
          });
          return;
        }
      });
    }
  } 

  return (
    <main className="flex h-screen">
      {/* Side Bar */}
      <SideBar />
      <PersonaSelection personas={personaLists} personaClick={handlePersonaChange} />
      <PromptSelection selectedPersona={selectedPersona} />
    </main>
  );
}
