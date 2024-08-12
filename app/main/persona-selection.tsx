"use client";
import Image from "next/image";
import "./persona-selection-scrollbar.css";
import Link from "next/link";
import { Persona } from "@/lib/types";
import { useStorePersonaLogoSession } from "@/lib/functions/local-storage/localStorage-chabot";
import Tooltip from "@/components/component/tooltip";

interface PersonaSelectionProps {
  personas?: Persona[];
  selectedAgent: any;
}

const PersonaSelection: React.FC<PersonaSelectionProps> = ({
  personas,
  selectedAgent,
}) => {
  const noDashAgentString = selectedAgent?.replaceAll("-", " ");

  return (
    <div className="bg-slate-100 w-full max-w-[23rem] flex flex-col border-r border-slate-300 dark:bg-slate-900 dark:border-slate-500">
      {/* Header */}
      <div className="shadow flex justify-between items-center p-5 gap-4 px-6 pb-5 border-b border-slate-300 dark:border-slate-600">
        <div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
            Persona Selection
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Select a persona from list below
          </p>
        </div>
        {/* <Tooltip content="Add Persona">
          <AddPersonaIcon />
        </Tooltip> */}
      </div>

      {/* Persona Selection List */}
      <div className="flex flex-col max-h-full overflow-auto gap-3 p-3 px-4 py-6 h-full relative persona-selection-scrollbar">
        {personas &&
          personas.map((p) => (
            <PersonaCard
              key={p.name}
              persona={p}
              isSelected={noDashAgentString?.includes(
                p.name.toLocaleLowerCase()
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default PersonaSelection;

interface PersonaCardProps {
  persona: Persona;
  isSelected?: Boolean;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, isSelected }) => {
  const {
    persona_id,
    name,
    department,
    tagline,
    created_at,
    logo_name,
    bgimage_name,
    persona_link,
  } = persona;

  const hoverStyles = `transform transition hover:scale-105 hover:shadow-lg hover:outline hover:outline-3 hover:border-0 hover:outline-airis-primary`;

  const link = "/persona/" + persona_link;

  // Store the logo link on the local storage, it's slower to call the img per click of a persona
  const storeSession = useStorePersonaLogoSession();

  return (
    <Link href={link}>
      <div
        className={`${
          isSelected
            ? "outline outline-2 outline-airis-primary dark:outline-cyan-600"
            : ""
        } bg-airis-primary dark:bg-cyan-600 ${bgimage_name} rounded-2xl min-h-36 border border-slate-300 dark:border-slate-500 shadow relative overflow-clip hover:cursor-pointer ${hoverStyles}`}
        onClick={() => storeSession(logo_name)}
      >
        <div className="absolute bg-white dark:bg-slate-700 w-full rounded-t-2xl bottom-0 left-0 h-[80%] flex flex-col p-4 pt-9 pl-4 ">
          {isSelected && (
            <span className="absolute top-2 right-2 text-xs py-1 px-2 bg-airis-primary bg-opacity-20 dark:bg-opacity-60 rounded-2xl text-airis-primary font-semibold dark:text-slate-300">
              Selected
            </span>
          )}
          <Image
            src={logo_name ?? "/persona_icons/" + { logo_name }}
            alt={name + "'s photo"}
            width={50}
            height={50}
            className="rounded-full border-4 border-white dark:border-slate-700 absolute top-[-15px] left-3"
          />
          <h3 className="text-slate-700 font-bold dark:text-slate-200">
            {name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {tagline}
          </p>
        </div>
      </div>
    </Link>
  );
};

const AddPersonaIcon = () => {
  return (
    <button className="text-slate-500 p-3 hover:bg-slate-200 hover:text-primary rounded-lg border bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
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
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
    </button>
  );
};
