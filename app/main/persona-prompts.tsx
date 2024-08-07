'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter,notFound } from 'next/navigation';
import { sql } from '@vercel/postgres';

import { list } from '@vercel/blob';
import { Key, useEffect, useState } from "react";
import personaData from "@/lib/persona-url";
import { fetchPersonas } from "@/lib/db/fetch-queries";
import { PersonaChatbots, SelectedPersona } from "@/lib/types";


interface PersonaChatbotsProps {
  selectedPersona?: SelectedPersona;
}

const PersonaPrompts: React.FC<PersonaChatbotsProps> = ({ selectedPersona })=> {

  return (
    <div className="h-full w-full p-8">
      {/* The big card */}
      <div className="h-full w-full bg-white rounded-lg border border-slate-300 shadow flex flex-col p-4 gap-2">
        <PersonaProfile selectedPersona={selectedPersona} />
        <Prompts selectedPersona={selectedPersona} />
      </div>
    </div>
  );
};

export default PersonaPrompts;

const PersonaProfile: React.FC<PersonaChatbotsProps> = ({ selectedPersona })  => {
  
  return (
    <div className="basis-[35%] border rounded-md bg-ai-marketing relative overflow-clip">
      <div className="absolute w-full h-[45%] bottom-0 bg-white">
        {/* Image of the persona */}
        <div className="absolute left-4 top-[-20px] rounded-full w-28 h-28 border-4 border-white overflow-clip">
          <Image
            src={"/persona_icons/icon_marketing.png"}
            alt="icon picture"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className="flex gap-4 items-center pl-36 pt-3 mb-2">
          <h2 className="text-3xl text-slate-800 font-bold">{selectedPersona?.persona_name}</h2>
          <PersonaSettingsButton />
          <button className="text-slate-500 p-2 px-4 hover:bg-slate-100 border border-slate-500 rounded-full">
            Add or Modify Prompt
          </button>
        </div>

        <p className="pl-36 pr-8">
          {selectedPersona?.persona_tagline}
        </p>
      </div>
    </div>
  );
};


const Prompts: React.FC<PersonaChatbotsProps> = ({ selectedPersona })=> {

  /**
   * Will hold all the chatbot prompts on of a specific persona depending on the params
   *  fetchPrompts will be called to get all the prompts of that persona
   */
  const [prompts, setPrompts] = useState<{ 
    role: string;
    task: string;
    persona_name: string;
    chatbot_id: string;
    persona_id: string;
    default_prompt: boolean;
    subpersona: boolean;
  }[]>([]);
  useEffect(() => {
    async function fetchPrompts() {
      if (selectedPersona?.persona_id) {
        const response = await fetch('/api/query/query-tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ persona_id: selectedPersona?.persona_id }), // Send persona_id in the request body
          cache: 'force-cache',
          next: { revalidate: 3600 }
        });

        const data = await response.json();
        setPrompts(data);
        
        console.log(`PROMPTS FOR ${selectedPersona?.persona_id}`, data)
      }
    }

    fetchPrompts();
  }, [selectedPersona?.persona_id]);


  /**
   * Router for the default prompt 
   */
  const router = useRouter();
  const handleClick = (prompt: any) => {
    // Store values in sessionStorage, to be used on the /chat page

    sessionStorage.setItem('task', prompt ?? "");
    sessionStorage.setItem('aiName', selectedPersona?.persona_name ?? "");
    sessionStorage.setItem('aiDescription', selectedPersona?.persona_tagline ?? "");
    sessionStorage.setItem('chatbot_id', prompt.chatbot_id);
    sessionStorage.setItem('persona_id', prompt.persona_id);
    router.push('/chat');
  };

  /**
   * @currentRole     - contains the role that will be shown 
   * @roles           - contain all the roles of that persona
   * @defaultRole     - contains the most 'default' prompt that will show immediately 
   * handleRoleChange - contains the changing of the current role, default role and persona name
   */
  const [currentRole, setCurrentRole] = useState('');
  const [roles, setRoles] = useState<any>([]);
  const [defaultRole, setDefaultRole] = useState('');
  useEffect(() => {
    handleRoleChange('')
  }, [prompts]);

  const handleRoleChange = (role: string) => {
    if (role == '<--' || role == '')  {
      // will collect the set of roles as strings
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
      setCurrentRole(role);
      setRoles([]);
    }
  };


  return (
    <div className="basis-[65%] border rounded-md flex flex-col">
      {/* Header of Prompts */}
      <div className="flex justify-between items-end p-4 px-5">
        {/* text */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Select a prompt
          </h2>
          <p className="text-slate-600">
            Select the prompt the best matches your needs.
          </p>
        </div>

        {/* Breadcrumbs */}
        <div className="bg-slate-100 rounded-full px-5 text-slate-600 py-1 border">
          <span>{selectedPersona?.persona_name}</span>
          
          {defaultRole !== currentRole && (
              <><span> &gt; </span><span>{currentRole}</span></>
          )}
        </div>
      </div>

      {/* Prompts Section and Cards */}
      <div className="flex p-4 h-full pt-0">
        {/* Default Prompt */}
        {prompts.map((p, index) => (
          (p.subpersona == false && p.role == currentRole) && (
            <div onClick={() => handleClick(p)} className="basis-[35%]">
              <div key={index} className="bg-ai-teacher  h-full relative flex flex-col justify-end rounded-lg p-6 hover:cursor-pointer hover:bg-orange-800">
                <h4 className="text-4xl text-white">
                  {p.task}
                </h4>
                <DiagonalArrow />
              </div>
            </div>
          )
        ))}
        <div className="w-full basis-[65%] h-full max-h-full flex flex-col gap-2 pl-4 overflow-auto">
          {/* Role List */}
          {roles.map((role: string | undefined, idx: Key | null | undefined) => (
            (role != currentRole &&
              <RoleCard key={idx} role={role} onRoleChange={handleRoleChange} />
            )
          ))}
          {/* Prompt List */}
          {prompts.map((p, idx) => (

            (p.default_prompt == false && p.role == currentRole && p.subpersona == true) && (
              <PromptCard key={idx} 
                          promptObj={p} 
                          currentRole={currentRole} 
                          aiName={selectedPersona?.persona_name} 
                          aiDescription={selectedPersona?.persona_tagline}            
              />
            )
          ))}
          {/* Return */}
          {(defaultRole != currentRole && 
              <RoleCard onRoleChange={handleRoleChange} />
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

const PromptCard: React.FC<PromptCardProps> = ({ promptObj, currentRole, aiName, aiDescription }) => {
  
  const router = useRouter();
  const handleClick = (task : string) => {
    // Store values in sessionStorage
    sessionStorage.setItem('task', task ?? "");
     sessionStorage.setItem('aiName', aiName ?? "");
     sessionStorage.setItem('aiDescription', aiDescription ?? "");
    sessionStorage.setItem('chatbot_id', promptObj.chatbot_id);
    sessionStorage.setItem('persona_id', promptObj.persona_id);
    // Navigate to the desired page
    router.push('/chat');
  };

  return (
    <div onClick={() => handleClick(promptObj.task)}>
      <div className="w-full flex justify-between items-center p-2 px-4 border rounded-md border-slate-300 text-slate-600 hover:bg-slate-200 hover:text-slate-800 hover:cursor-pointer">
        {promptObj.role == currentRole && 
          <p>{promptObj.task}</p>
        }
      </div>
    </div>
  );
};

interface RoleCardProps {
  role?: string;
  onRoleChange: (role: string) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ 
  role = '<--', 
  onRoleChange 
}) => {

  const handleClick = () => {
    onRoleChange(role); // Trigger the role change in parent component
  };

  return (
    <div onClick={handleClick}>
      <div className="w-full flex justify-between items-center p-2 px-4 border rounded-md border-slate-300 text-slate-600 hover:bg-slate-200 hover:text-slate-800 hover:cursor-pointer">
        <p>{role}</p>
        {role != '<--' && <ArrowIcon />}
      </div>
    </div>
  );
};



// ICONS and BUTTONS
const PersonaSettingsButton = () => {
  return (
    <button className="text-slate-500 p-2 hover:bg-slate-100 border border-slate-500 rounded-full">
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
    <span>
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
          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </span>
  );
};
