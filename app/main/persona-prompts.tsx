"use client";
import Image from "next/image";

import { Key, Suspense, useCallback, useEffect, useState } from "react";
import { SelectedPersona } from "@/lib/types";
import { useStoreChatbotSession } from "@/lib/functions/local-storage/sessionStorage-chabot";
import { fetchPrompts } from "@/lib/db/fetch-queries";
import PersonaProfileLoading from "./persona-profile-loading";
import * as PromptLoading from "./prompts-loading";

interface PersonaChatbotsProps {
  selectedPersona?: SelectedPersona;
  isLoading?: Boolean;
}

const PersonaPrompts: React.FC<PersonaChatbotsProps> = ({
  selectedPersona,
  isLoading,
}) => {
  return (
    <div className="h-full w-full p-8">
      {/* The big card */}
      <div className="h-full w-full bg-white rounded-lg border border-slate-300 dark:border-slate-600 shadow flex flex-col p-4 dark:bg-slate-800">
        {isLoading ? (
          <PersonaProfileLoading />
        ) : (
          <PersonaProfile selectedPersona={selectedPersona} />
        )}

        {isLoading ? (
          <PromptLoading.Page />
        ) : (
          <Prompts selectedPersona={selectedPersona} />
        )}
      </div>
    </div>
  );
};

export default PersonaPrompts;

const PersonaProfile: React.FC<PersonaChatbotsProps> = ({
  selectedPersona,
}) => {
  return (
    <div className="border rounded-md rounded-b-none border-b-0 relative dark:border-slate-600 overflow-clip flex flex-col">
      {/* just a background color style */}
      <div className="bg-airis-primary h-1"></div>

      <div className="relative w-full h-[95%] bottom-0 flex px-4 py-3 items-center gap-3">
        {/* Image of the persona */}
        <div className="rounded-full w-14 h-14 border-4 border-white dark:border-slate-700 overflow-clip relative">
          <Image
            src={"/persona_icons/icon_law.png"}
            alt="icon picture"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        {/* Persona Name and Descriptions */}
        <div className="flex flex-col">
          <h2 className="text-2xl text-slate-800 font-bold dark:text-slate-300">
            {selectedPersona?.persona_name}
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            {selectedPersona?.persona_tagline}
          </p>
        </div>

        {/* Persona Action Buttons */}
        <div className="flex items-center ml-auto text-sm">
          <PersonaSettingsButton />

          <button className="text-slate-500 dark:text-slate-400 py-2 pr-3 pl-2 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-300 border border-slate-500  border-r-0 flex items-center gap-2">
            <ModifyPromptIcon />
            Modify Prompt
          </button>

          <button className="text-slate-500 dark:text-slate-400 py-2 pr-3 pl-2 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-300 border border-slate-500 rounded-lg rounded-l-none flex items-center gap-1">
            <AddPromptIcon />
            Add Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

const Prompts: React.FC<PersonaChatbotsProps> = ({ selectedPersona }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  /**
   * Will hold all the chatbot prompts on of a specific persona depending on the params
   *  fetchPrompts will be called to get all the prompts of that persona
   */
  const [prompts, setPrompts] = useState<
    {
      role: string;
      task: string;
      persona_name: string;
      chatbot_id: string;
      persona_id: string;
      default_prompt: boolean;
      subpersona: boolean;
    }[]
  >([]);

  /**
   * currentRole      - contains the role that will be shown
   * roles            - contain all the roles of that persona
   * defaultRole      - contains the most 'default' prompt that will show immediately
   * handleRoleChange - contains the changing of the current role, default role and persona name
   * storeSession     - prompt is clicked, chatbot information stored on Session storage before going to /chat
   */
  const [currentRole, setCurrentRole] = useState("");
  const [roles, setRoles] = useState<any>([]);
  const [defaultRole, setDefaultRole] = useState("");
  const storeSession = useStoreChatbotSession();

  const handleRoleChange = useCallback(
    (role: string) => {
      if (role == "<--" || role == "") {
        // a return button is clicked or the default prompt is shown
        // Assign the Default Role and get each of all the roles once, store them in roles variable
        const uniqueRoles = new Set<string>();
        prompts.forEach((prompt: any) => {
          if (prompt.default_prompt === true) {
            setCurrentRole(prompt.role);
            setDefaultRole(prompt.role);
          }

          uniqueRoles.add(prompt.role);
        });
        setRoles(Array.from(uniqueRoles));
      } else {
        // a sub-role is clicked, changing the current role
        setCurrentRole(role);
        // removed to avoid showing other roless
        setRoles([]);
      }
    },
    [prompts]
  );

  useEffect(() => {
    setIsLoading(true);

    const getPrompts = async () => {
      if (selectedPersona?.persona_id) {
        const data = await fetchPrompts(selectedPersona?.persona_id);
        setPrompts(data);

        setIsLoading(false);
      }
      setIsLoading(false);
    };
    getPrompts();
  }, [selectedPersona?.persona_id]);

  useEffect(() => {
    handleRoleChange("");
  }, [prompts, handleRoleChange]);

  /**
   * Handles the change of a role shown on the Prompt Selection
   *  Only has one usage here
   */

  return (
    <div className="border rounded-md flex flex-col rounded-t-none grow dark:border-slate-600">
      {/* Header of Prompts */}
      <div className="flex flex-col p-4 px-5">
        {/* Breadcrumbs */}
        <div className="bg-slate-100 dark:bg-slate-600 rounded-full px-5 text-slate-600 dark:text-slate-300 py-1 border mb-4 self-start">
          <span>{selectedPersona?.persona_name}</span>

          {defaultRole !== currentRole && (
            <>
              <span> &gt; </span>
              <span>{currentRole}</span>
            </>
          )}
        </div>

        {/* text */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
            Select a Prompt
          </h2>
        </div>
      </div>

      {/* Prompts Section and Cards */}
      <div className="flex flex-col p-4 h-full pt-0">
        {/* Default Prompt */}
        {prompts
          .filter((p) => p.subpersona === false && p.role === currentRole)
          .map((p) => (
            <div
              key={p.chatbot_id}
              onClick={() =>
                storeSession(
                  selectedPersona?.persona_name,
                  selectedPersona?.persona_tagline,
                  p.chatbot_id,
                  p.persona_id
                )
              }
              className="basis-[30%] mb-4"
            >
              <div className="bg-airis-primary dark:bg-cyan-600 dark:hover:bg-cyan-700 h-full relative flex flex-col justify-end rounded-lg p-6 hover:cursor-pointer hover:bg-slate-700">
                <h4 className="text-4xl text-white">{p.task}</h4>
                <DiagonalArrow />
              </div>
            </div>
          ))}

        {/* PROMPS LISTS */}
        <div className="w-full basis-[70%] h-full max-h-full grid grid-cols-3 overflow-auto gap-4 grid-rows-fixed">
          {/* Role List */}
          {roles.map(
            (role: string | undefined, idx: Key | null | undefined) =>
              role != currentRole && (
                <RoleCard
                  key={role}
                  role={role}
                  onRoleChange={handleRoleChange}
                />
              )
          )}
          {/* Prompt List */}
          {prompts
            .filter(
              (p) =>
                p.default_prompt === false &&
                p.role === currentRole &&
                p.subpersona === true
            )
            .map((p) => (
              <PromptCard
                key={p.chatbot_id}
                promptObj={p}
                currentRole={currentRole}
                aiName={selectedPersona?.persona_name}
                aiDescription={selectedPersona?.persona_tagline}
              />
            ))}
          {/* Return */}
          {defaultRole != currentRole && (
            <RoleCard key="return-to-default" onRoleChange={handleRoleChange} />
          )}
        </div>
      </div>
    </div>
  );
};

interface PromptCardProps {
  promptObj: {
    role: string;
    task: string;
    persona_name: string;
    chatbot_id: string;
    persona_id: string;
    default_prompt: boolean;
    subpersona: boolean;
  };
  currentRole: string;
  aiName?: string;
  aiDescription?: string;
}

const PromptCard: React.FC<PromptCardProps> = ({
  promptObj,
  currentRole,
  aiName,
  aiDescription,
}) => {
  // used when prompt is clicked, chatbot information stored on Session storage before going to /chat
  const storeSession = useStoreChatbotSession();

  return (
    <div
      onClick={() =>
        storeSession(
          aiName,
          aiDescription,
          promptObj.chatbot_id,
          promptObj.persona_id
        )
      }
    >
      <div className="w-full h-full flex text-xl p-3 px-4 border rounded-md border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200 hover:cursor-pointer">
        {promptObj.role == currentRole && <p>{promptObj.task}</p>}
      </div>
    </div>
  );
};

interface RoleCardProps {
  role?: string;
  onRoleChange: (role: string) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role = "<--", onRoleChange }) => {
  const handleClick = () => {
    onRoleChange(role); // Trigger the role change in parent component
  };

  return (
    <div onClick={handleClick}>
      <div className="relative w-full h-full text-xl p-3 px-4 border rounded-md border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-200 hover:text-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200 hover:cursor-pointer">
        <p>
          {role} {role == "<--" && "Return"}
        </p>

        <span className="absolute bottom-2 right-2">
          {role != "<--" && <ArrowIcon />}
        </span>
      </div>
    </div>
  );
};

// ICONS and BUTTONS
const PersonaSettingsButton = () => {
  return (
    <button className="text-slate-500 dark:text-slate-400 p-2 border border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-300 rounded-lg rounded-r-none border-r-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </button>
  );
};

const DiagonalArrow = () => {
  return (
    <span className="absolute right-4 top-4 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8"
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

const ArrowIcon = () => {
  return (
    <span className="text-4xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </span>
  );
};

const AddPromptIcon = () => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </span>
  );
};

const ModifyPromptIcon = () => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    </span>
  );
};
