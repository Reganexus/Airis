"use client";
import { fetchPersonas } from "@/lib/db/fetch-queries";
import { Persona } from "@/lib/types";
import { useParams } from "next/navigation";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
import SideBar from "../main/side-bar";
import PersonaSelection from "../main/persona-selection";
import React from "react";
import Loading from "./persona-selection-loading";
import PersonaSelectionLoading from "./persona-selection-loading";
import { SessionProvider } from "next-auth/react";
import { useMediaQuery } from "react-responsive";

interface PersonaContextType {
  setIsPersonaSelectionOpen: (isOpen: boolean) => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const usePersonaContext = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersonaContext must be used within a PersonaProvider");
  }
  return context;
};

export default function SelectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // contains the dynamic persona url parameter
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const { agent } = useParams();

  /**
   * @personaLists - contains all the information returned by the Database, to be updated when the image url is placed
   * @personaBlobs - contains all the blobs (images) fetched from the AirisBlobStorage
   * @temp         - temporary placeholder for all  the information of personas
   */
  const [personaLists, setPersonaLists] = useState<Persona[]>();
  const [personaBlobs, setPersonaBlobs] = useState<any[]>([]);
  const [temp, setTemp] = useState<Persona[]>([]);
  const [isPersonaSelectionOpen, setIsPersonaSelectionOpen] =
    useState<Boolean>(false);

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  useEffect(() => {
    setIsLoading(true);
    /**
     * Get all the personaData [1] and the persona blobs(images) [2] from the database
     * and store [1] on the temporary variable and [2] on personaBlobs
     */
    const fetchPersonaData = async () => {
      // [1]
      const personas = await fetchPersonas();
      setTemp(personas);

      const personalogo = await fetch("/api/image/image-persona-logo", {
        method: "POST",
        cache: "no-cache",
      });
      const response = await personalogo.json();

      // [2]
      const blobs = response.blob;
      setPersonaBlobs(blobs);

      setIsLoading(false);
    };
    fetchPersonaData();
  }, []);

  useEffect(() => {
    /**
     * Will run when persona data are all fetched
     * Loop through the blobs and remove the directory of the filename, only using the filename w/ extension
     * And change the value of persona.logo_name into the blob's URL (previously a logo filename) if filenames matched
     * Finally, put thee temporary Persona data into the official variable personaData
     */
    if (personaBlobs && temp) {
      personaBlobs.forEach((blob: any) => {
        const filename = blob.pathname.replace("Assets/persona_icons/", "");
        temp.forEach((persona) => {
          if (persona.logo_name === filename) {
            persona.logo_name = blob.url;
          }
        });
        setPersonaLists(temp);
      });
    }
  }, [personaBlobs, temp]);

  // Clone children and pass the agent prop (persona_url)
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { agent, setIsPersonaSelectionOpen } as {
        [key: string]: any;
        setIsPersonaSelectionOpen: any;
      });
    }
    return child;
  });

  console.log("mob: ", setIsPersonaSelectionOpen);

  return (
    <main className="flex h-screen">
      <SessionProvider>
        <SideBar />
      </SessionProvider>

      <div
        className={`${
          isPersonaSelectionOpen && isMobile
            ? "fixed inset-0 z-20"
            : "mob:hidden w-full max-w-[23rem]"
        } h-screen  bg-slate-100`}
      >
        {isLoading ? (
          <PersonaSelectionLoading />
        ) : (
          <PersonaContext.Provider value={{ setIsPersonaSelectionOpen }}>
            <PersonaSelection personas={personaLists} selectedAgent={agent} />
          </PersonaContext.Provider>
        )}
      </div>
      <PersonaContext.Provider value={{ setIsPersonaSelectionOpen }}>
        {childrenWithProps}
      </PersonaContext.Provider>
    </main>
  );
}
