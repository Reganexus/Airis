import { fetchFeaturedPrompts } from "@/lib/db/fetch-queries";
import { updateChatbotFrequency } from "@/lib/db/update-queries";
import {
  useStoreChatbotSession,
  useStorePersonaLogoSession,
} from "@/lib/functions/local-storage/sessionStorage-chabot";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PersonaSelectionLoading from "../persona/persona-selection-loading";
import PersonaSelection from "./persona-selection";
import { usePersonaContext } from "../persona/layout";

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

const WelcomeScreen: React.FC = () => {
  const [prompts, setPrompts] = useState<featuredPrompts[]>([]);
  const [allFeaturedInfo, setAllFeaturedInfo] = useState<any[]>([]);
  const [welcome, setWelcome] = useState<string | null | undefined>("");

  const { data: session, status } = useSession();
  const user = session?.user;
  const [personaBlobs, setPersonaBlobs] = useState<any[]>();

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { setIsPersonaSelectionOpen } = usePersonaContext();

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
  }, [status, user, personaBlobs, prompts, welcome]);

  const storeChatbotSession = useStoreChatbotSession();
  const storeLogoSession = useStorePersonaLogoSession();

  async function featuredClicked(prompt: featuredPrompts) {
    console.log("Featured Prompt Click", prompt.logo_name);
    updateChatbotFrequency(prompt.chatbot_id.toString());
    storeLogoSession(prompt.logo_name);
    storeChatbotSession(
      prompt.name,
      prompt.tagline,
      prompt.chatbot_id.toString(),
      prompt.task
    );
  }

  return (
    <div className="w-full max-w-7xl h-[90%] z-10 flex flex-col justify-between items-center p-4">
      {/* Hamburger Icon */}
      {isMobile ? (
        <button className="fixed top-4 right-3 flex justify-center items-center">
          <HamburgerIcon />
        </button>
      ) : null}

      {/* Avatar */}
      {isMobile ? (
        <div className="fixed top-2 left-2 p-2 flex justify-center items-center hover:cursor-pointer hover:bg-slate-200 rounded-lg mb-1 dark:hover:bg-slate-700">
          <Image
            src="/user_placeholder_img.png"
            alt="user photo"
            width={45}
            height={45}
            className="rounded-full border-2 border-white shadow-md dark:border-slate-400"
          />
        </div>
      ) : null}

      {/* Header */}
      <div className="p-8 rounded-lg w-full dark:bg-opacity-0 border dark:border-0 mob:p-2 mob:pt-4 ">
        <h1 className="text-5xl font-bold mb-2 text-primary dark:text-cyan-400 mob:text-3xl">
          Welcome to Airis{welcome && ", " + welcome}!
        </h1>
        <h4 className="text-2xl mob:text-xl font-semibold text-slate-600 pl-2 mob:p-0 dark:text-slate-300">
          How may I help you today?
        </h4>
      </div>

      {/* Initiator Propmts */}
      <div className="w-full h-96 mob:h-full grid grid-cols-2 grid-rows-3 gap-8 mob:gap-3 mob:my-6">
        {prompts.map((p) => (
          <div
            key={p.persona_id}
            className={`relative overflow-clip bg-airis-primary dark:bg-cyan-600 rounded-lg shadow-md hover:cursor-pointer border border-slate-300 dark:border-slate-500`}
            onClick={() => featuredClicked(p)}
          >
            <div className="bg-white dark:bg-slate-700  w-full bottom-0 absolute h-[95%] rounded-t-lg p-4 flex flex-col justify-between">
              <h4 className="text-slate-600 dark:text-slate-300 mob:text-sm">
                {p.name}
              </h4>
              <h2 className="font-semibold dark:text-slate-200 mob:pr-5">
                {p.task}
              </h2>
              <DiagonalArrow />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setIsPersonaSelectionOpen(true);
        }}
        className="bg-primary text-white rounded-full hidden mob:flex w-full py-2 pl-5 pr-2 justify-between items-center text-xl"
      >
        Start New Chat <ChatIcon />
      </button>

      <p className="text-center text-slate-700 dark:text-slate-400 mob:hidden">
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
        className="size-6 mob:size-4"
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
const ChatIcon = () => {
  return (
    <span className=" text-slate-700  bg-white rounded-full p-2">
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
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </svg>
    </span>
  );
};
const HamburgerIcon = () => {
  return (
    <span className=" text-slate-700 dark:text-slate-300 border border-slate-400 rounded-full p-2">
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
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </span>
  );
};
