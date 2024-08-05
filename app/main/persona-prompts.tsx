'use client';
import Image from "next/image";
import Link from "next/link";
import { useRouter,notFound } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { useEffect, useState } from "react";





interface PersonaPromptsProps {
  id?: string;
}

const PersonaPrompts: React.FC<PersonaPromptsProps> = ({ id })=> {

  // TEMPORARY SOLUTION, TRY TO USE DB TO MAKE IT MORE DYNAMIC.
  return (
    <div className="h-full w-full p-8">
      {/* The big card */}
      <div className="h-full w-full bg-white rounded-lg border border-slate-300 shadow flex flex-col p-4 gap-2">
        <PersonaProfile id ={id} />
        <Prompts id ={id} />
      </div>
    </div>
  );
};

export default PersonaPrompts;


interface PersonaProfileProps {
  id?: string;
}

const PersonaProfile: React.FC<PersonaProfileProps> = ({ id })  => {
  const router = useRouter();

  // make this dynamic as well using db
  const profileRoutes = [
    'intern-profile',
    'marketing-profile',
    'hr-profile',
    'law-profile',
    'admin-profile',
    'teacher-profile'
  ];

  if (typeof id === 'undefined' || !profileRoutes.includes(id)) {

    // TEMPORARY SOLUTION, ADD AN INVALID PAGE AND REDIRECT THE USER TO IT
    notFound();
  }

  const aiName = (id == 'intern-profile') ? "Intern AI" : 
                  (id == 'marketing-profile') ? "Marketing AI" : 
                  (id == 'hr-profile') ? "Human Resources AI" : 
                  (id == 'law-profile') ? "Law AI" : 
                  (id == 'admin-profile') ? "Admin AI" : 
                  (id == 'teacher-profile') ? "Teacher AI" : 
                  "Intern AI";

  const aiDescription = (id == 'intern-profile') ? "A dedicated persona to support intership-related tasks." : 
  (id == 'marketing-profile') ? "An intelligent persona that enhances your marketing efforts." : 
  (id == 'hr-profile') ? "A versatile persona that streamlines human resources operations" : 
  (id == 'law-profile') ? "A reliable persona for all your legal needs." : 
  (id == 'admin-profile') ? "A dynamic persona that boosts administrative efficiency." : 
  (id == 'teacher-profile') ? "An educational persona for delivering online courses." : 
  "Intern AI";

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
          <h2 className="text-3xl text-slate-800 font-bold">{aiName}</h2>
          <PersonaSettingsButton />
          <button className="text-slate-500 p-2 px-4 hover:bg-slate-100 border border-slate-500 rounded-full">
            Add or Modify Prompt
          </button>
        </div>

        <p className="pl-36 pr-8">
          {aiDescription}
        </p>
      </div>
    </div>
  );
};


interface PromptsProps {
  id?: string;
}

const Prompts: React.FC<PromptsProps> = ({ id })=> {
  const persona_id_list = {
    'intern-profile' : 1, 
    'marketing-profile': 2,
    'hr-profile': 3, 
    'law-profile': 4,
    'admin-profile': 5,
    'teacher-profile': 6
  };
  const [prompts, setPrompts] = useState([]);
    // make this dynamic as well using the database
  useEffect(() => {
    async function fetchPrompts() {
      if (id) {
        const response = await fetch('/api/query/query-tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ persona_id: persona_id_list[id] }), // Send persona_id in the request body
        });

        const data = await response.json();
        setPrompts(data);
        
        console.log(`PROMPTS FOR ${id}`, data)
      }
    }

    fetchPrompts();
  }, [id]);

  console.log("PROMPTS 1: ");
  console.log(prompts);

  const router = useRouter();

  const handleClick = (prompt: any) => {
    // Store values in sessionStorage
    sessionStorage.setItem('chatbot_id', prompt.chatbot_id);
    sessionStorage.setItem('persona_id', prompt.persona_id);
    // Navigate to the desired page
    router.push('/chat');
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
        {/* <div className="bg-slate-100 rounded-full px-5 text-slate-600 py-1 border">
          <span>Marketing AI</span>
          <span> &gt; </span>
          <span>Prompts</span>
        </div> */}
      </div>

      {/* Prompts Section and Cards */}
      <div className="flex p-4 h-full pt-0">
        {/* Default Prompt */}
        {prompts.map((p, idx) => (
          (p.default_prompt == true) && (
            <div onClick={() => handleClick(p)} className="basis-[35%]">
              <div className="bg-ai-teacher  h-full relative flex flex-col justify-end rounded-lg p-6 hover:cursor-pointer hover:bg-orange-800">
                <h4 className="text-4xl text-white">
                  {p.task}
                </h4>
                <DiagonalArrow />
              </div>
            </div>
          )
        ))}
        {/* Prompt List */}
        <div className="w-full basis-[65%] h-full max-h-full flex flex-col gap-2 pl-4 overflow-auto">
          {prompts.map((p, idx) => (
            (p.default_prompt == false) && (
              <PromptCard key={idx} promptObj={p} id={id} />
            )
          ))}
        </div>
      </div>
    </div>
  );
};

interface PromptCardProps {
  promptObj: object;
  id?: string;
}


const PromptCard: React.FC<PromptCardProps> = ({ promptObj, id }) => {
  console.log("PROMPT OBJECT: ");
  console.log(promptObj);
  const aiName = (id == 'intern-profile') ? "Intern AI" : 
                  (id == 'marketing-profile') ? "Marketing AI" : 
                  (id == 'hr-profile') ? "Human Resources AI" : 
                  (id == 'law-profile') ? "Law AI" : 
                  (id == 'admin-profile') ? "Admin AI" : 
                  (id == 'teacher-profile') ? "Teacher AI" : 
                  "Intern AI";

  const aiDescription = (id == 'intern-profile') ? "A dedicated persona to support intership-related tasks." : 
  (id == 'marketing-profile') ? "An intelligent persona that enhances your marketing efforts." : 
  (id == 'hr-profile') ? "A versatile persona that streamlines human resources operations" : 
  (id == 'law-profile') ? "A reliable persona for all your legal needs." : 
  (id == 'admin-profile') ? "A dynamic persona that boosts administrative efficiency." : 
  (id == 'teacher-profile') ? "An educational persona for delivering online courses." : 
  "Intern AI";


  const router = useRouter();

  const handleClick = () => {
    // Store values in sessionStorage
    sessionStorage.setItem('aiName', aiName);
    sessionStorage.setItem('aiDescription', aiDescription);
    sessionStorage.setItem('chatbot_id', promptObj.chatbot_id);
    sessionStorage.setItem('persona_id', promptObj.persona_id);
    // Navigate to the desired page
    router.push('/chat');
  };


  return (
    <div onClick={handleClick}>
      <div className="w-full flex justify-between items-center p-2 px-4 border rounded-md border-slate-300 text-slate-600 hover:bg-slate-200 hover:text-slate-800 hover:cursor-pointer">
        <p>{promptObj.task}</p>
        {!promptObj.subpersona && <ArrowIcon />}
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
