"use client";
import { fetchPersonas } from "@/lib/db/fetch-queries";
import { Persona } from "@/lib/types";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import SideBar from "../main/side-bar";
import PersonaSelection from "../main/persona-selection";
import React from "react";
import Loading from "./persona-selection-loading";
import PersonaSelectionLoading from "./persona-selection-loading";

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
      return React.cloneElement(child, { agent } as { [key: string]: any });
    }
    return child;
  });

  return (
    <main className="flex h-screen">
      <SideBar />

      {isLoading ? (
        <PersonaSelectionLoading />
      ) : (
        <PersonaSelection personas={personaLists} selectedAgent={agent} />
      )}

      {childrenWithProps}
    </main>
  );
}
