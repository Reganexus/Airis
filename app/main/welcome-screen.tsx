import { fetchFeaturedPrompts } from "@/lib/db/fetch-queries";
import { updateChatbotFrequency } from "@/lib/db/update-queries";
import { useStoreChatbotSession, useStorePersonaLogoSession } from "@/lib/functions/local-storage/localStorage-chabot";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// const prompts = [
//   { ai: "Intern AI", bg: "bg-ai-intern", prompt: "Create a Resume" },
//   {
//     ai: "Marketing AI",
//     bg: "bg-ai-marketing",
//     prompt: "Create a Company Brand",
//   },
//   {
//     ai: "Human Resources AI",
//     bg: "bg-ai-hr",
//     prompt: "Create an Employment Contract",
//   },
//   { ai: "Law AI", bg: "bg-ai-law", prompt: "Create a Prospectus" },
//   { ai: "Admin AI", bg: "bg-ai-admin", prompt: "Create an Expense Report" },
//   {
//     ai: "Teacher AI",
//     bg: "bg-ai-teacher",
//     prompt: "Create a Test Review Sheet",
//   },
// ];

interface featuredPrompts {
  persona_id: number;
  name: string;
  tagline: string;
  logo_name: string;
  task: string;
  chatbot_id: number;
  frequency: number;
}

const WelcomeScreen = () => {

  const [prompts, setPrompts] = useState<featuredPrompts[]>([]);
  const [allFeaturedInfo, setAllFeaturedInfo] = useState<any[]>([]);
  const [welcome, setWelcome] = useState<string | null | undefined>('');

  const { data: session, status } = useSession();
  const user = session?.user;
  const [personaBlobs, setPersonaBlobs] = useState<any[]>();
  useEffect(() => {
    
    // Get the Selected Persona Information
    async function getPersona() {
      
      const data = await fetchFeaturedPrompts();
      if (data) {
        // Store all data into prompts state
        setPrompts(data);
      }
    }
    async function getLogo() {
      const personalogo = await fetch("/api/image/image-persona-logo", {
        method: "POST",
        cache: "no-cache",
      });
      const response = await personalogo.json();
      const blobs = response.blob;
      setPersonaBlobs(blobs);
    }
    getPersona();
    getLogo();
  }, []);

  useEffect(() => {
    if (status === "authenticated" && !welcome) {
      setWelcome(user?.name);
    }
    if (personaBlobs && prompts) {
        personaBlobs.forEach((blob: any) => {
          const filename = blob.pathname.replace("Assets/persona_icons/", "");
          prompts.forEach((persona) => {
            if (persona.logo_name === filename) {
              persona.logo_name = blob.url;
            }
          });
        });
    }
  }, [status, user, personaBlobs, prompts]);
  
  const storeChatbotSession = useStoreChatbotSession();
  const storeLogoSession = useStorePersonaLogoSession();

  async function featuredClicked(prompt: featuredPrompts) {

    console.log("Featured Prompt Click", prompt.logo_name)
    updateChatbotFrequency(prompt.chatbot_id.toString());
    storeLogoSession(prompt.logo_name);
    storeChatbotSession(prompt.name, prompt.tagline, prompt.chatbot_id.toString(), prompt.task);
  }

  return (
    <div className="w-full max-w-7xl h-[90%] z-10 flex flex-col justify-between items-center p-4">
      {/* Header */}
      <div className="p-8 rounded-lg w-full dark:bg-opacity-0 border dark:border-0">
        <h1 className="text-5xl font-bold mb-2 text-primary dark:text-cyan-400">

          Welcome to Airis{welcome && ", " + welcome}!
        </h1>
        <h4 className="text-2xl font-semibold text-slate-600 pl-2 dark:text-slate-300">
          How may I help you today?
        </h4>
      </div>

      {/* Initiator Propmts */}
      <div className="w-full h-96 grid grid-cols-2 grid-rows-3 gap-8">
        {prompts.map((p) => (
          <div
            key={p.persona_id}
            className={`relative overflow-clip bg-airis-primary dark:bg-cyan-600 rounded-lg shadow-md hover:cursor-pointer border border-slate-300 dark:border-slate-500`}
            onClick={() => featuredClicked(p)}
          >
            <div className="bg-white dark:bg-slate-700  w-full bottom-0 absolute h-[95%] rounded-t-lg p-4 flex flex-col justify-between">
              <h4 className="text-slate-600 dark:text-slate-300">{p.name}</h4>
              <h2 className="font-semibold dark:text-slate-200">{p.task}</h2>
              <DiagonalArrow />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-700 dark:text-slate-400">
        This AI chatbot is for informational purposes only and should not be
        considered professional advice.
      </p>
    </div>
  );
};

export default WelcomeScreen;

const DiagonalArrow = () => {
  return (
    <span className="absolute right-4 bottom-3 text-slate-700 dark:text-slate-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </span>
  );
};
