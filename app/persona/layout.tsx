'use client';
import { fetchPersonas } from "@/lib/db/fetch-queries";
import { Persona, SelectedPersona } from "@/lib/types";
import type { Metadata } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SideBar from "../main/side-bar";
import PersonaSelection from "../main/persona-selection";
import React from "react";

export default function SelectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [personaLists, setPersonaLists] = useState<Persona[]>();
    const [selectedPersona, setSelectedPersonaId] = useState<SelectedPersona>();

    const { agent } = useParams(); // Access the dynamic route parameter

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
            persona_tagline: personas[0].tagline,
            persona_link: personas[0].persona_link
        });

        };
        fetchPersonaData();
        
    }, []);
    
    const handlePersonaChange = (persona_id: string) => {
        if (personaLists) {
        personaLists.forEach((item: any) => {
            if (item.persona_id == persona_id) {
              setSelectedPersonaId({
                persona_id: item.persona_id,
                persona_name: item.name,
                persona_tagline: item.tagline,
                persona_link: item.persona_link
            });
            return;
            }
        });
        }
    } 

    // Clone children and pass the agent prop
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { agent } as { [key: string]: any });
        }
        return child;
    });

  return (
    <main className="flex h-screen">
      {/* Side Bar */}
      <SideBar />
      <PersonaSelection personas={personaLists} personaClick={handlePersonaChange} />
      {childrenWithProps}
    </main>
  );
}
