import Image from "next/image";
import "./persona-selection-scrollbar.css";
import Link from "next/link";

interface Persona {
  name: string;
  description: string;
  icon: string;
  bg: string;
  outline: string;
  linkRedirect: string;
}

// make this dynamic using db
const personas: Persona[] = [
  {
    name: "Intern AI",
    description: "A dedicated persona to support intership-related tasks.",
    icon: "icon_intern.png",
    bg: "bg-ai-intern",
    outline: "hover:outline-ai-intern",
    linkRedirect: 'intern-profile',
  },
  {
    name: "Marketing AI",
    description: "An intelligent persona that enhances your marketing efforts.",
    icon: "icon_marketing.png",
    bg: "bg-ai-marketing",
    outline: "hover:outline-ai-marketing",
    linkRedirect: 'marketing-profile',
  },
  {
    name: "Human Resources AI",
    description:
      "A versatile persona that streamlines human resources operations",
    icon: "icon_hr.png",
    bg: "bg-ai-hr",
    outline: "hover:outline-ai-hr",
    linkRedirect: 'hr-profile',
  },
  {
    name: "Law AI",
    description: "A reliable persona for all your legal needs.",
    icon: "icon_law.png",
    bg: "bg-ai-law",
    outline: "hover:outline-ai-law",
    linkRedirect: 'law-profile',
  },
  {
    name: "Admin AI",
    description: "A dynamic persona that boosts administrative efficiency.",
    icon: "icon_admin.png",
    bg: "bg-ai-admin",
    outline: "hover:outline-ai-admin",
    linkRedirect: 'admin-profile',
  },
  {
    name: "Teacher AI",
    description: "An educational persona for delivering online courses.",
    icon: "icon_teacher.png",
    bg: "bg-ai-teacher",
    outline: "hover:outline-ai-teacher",
    linkRedirect: 'teacher-profile',
  },
];


interface PersonaSelectionProps {
  id?: string;
}

const PersonaSelection: React.FC<PersonaSelectionProps> = ({ id }) => {
  return (
    <div className="bg-slate-100 min-w-80 flex flex-col border-r border-slate-300">
      {/* Header */}
      <div className="shadow flex justify-between items-center p-5 gap-4 px-6 pb-5">
        <div>
          <h3 className="text-xl font-bold text-slate-700">
            Persona Selection
          </h3>
          <p className="text-slate-500">Select a persona from list below</p>
        </div>
        <AddPersonaIcon />
      </div>

      {/* Persona Selection List */}
      <div className="flex flex-col max-h-full overflow-auto gap-3 p-3 px-4 py-6 h-full relative persona-selection-scrollbar">
        {personas.map((p) => (
          <PersonaCard key={p.name} persona={p} linkRedirect={p.linkRedirect} />
        ))}
      </div>
    </div>
  );
};

export default PersonaSelection;

interface PersonaCardProps {
  persona: Persona;
  linkRedirect: string;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ persona, linkRedirect }) => {
  const { name, description, icon, bg, outline } = persona;

  const hoverStyles = `transform transition hover:scale-105 hover:shadow-lg hover:outline hover:outline-3 ${outline} hover:border-0`;

  return (
    <Link href={linkRedirect}>
      <div
        className={`${bg} rounded-2xl min-h-36 border border-slate-300 shadow relative overflow-clip hover:cursor-pointer ${hoverStyles}`}
      >
        <div className="absolute bg-white w-full rounded-t-2xl bottom-0 left-0 h-[80%] flex flex-col p-4 pt-9 pl-4 ">
          <Image
            src={"/persona_icons/" + icon}
            alt={name + "'s photo"}
            width={50}
            height={50}
            className="rounded-full border-4 border-white absolute top-[-15px] left-3"
          />
          <h3 className="text-slate-700 font-bold">{name}</h3>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </Link>

  );
};

const AddPersonaIcon = () => {
  return (
    <button className="text-slate-500 p-3 hover:bg-slate-200 hover:text-primary rounded-lg border bg-slate-200">
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
