import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

// Define Props Interface
interface MyComponentProps {}

// Functional Component
const Personas: FC<MyComponentProps> = () => {
  return (
    <section className="flex flex-col justify-center align-center">
      <TopPart />
      <BotPart />
    </section>
  );
};

export default Personas;

const TopPart: FC<MyComponentProps> = () => {
  return (
    <div className="bg-white sm:h-[15rem] max-h-max sm:px-16 p-8 flex flex-col justify-center items-center">
      <h3 className="text-center pb-8 sm:text-2xl text-xl max-w-[40ch] font-bold text-slate-800">
        Experience peak workplace efficiency with the power of{" "}
        <span className="text-primary">OpenAI GPT-4o</span> and{" "}
        <span className="text-primary">DALL-E 3</span>
      </h3>

      <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center items-center">
        <AvatarPicName picture="/default_blue.png" name="Legal" />
        <AvatarPicName picture="/6_var.png" name="Human Resources" />
        <AvatarPicName picture="/3_var.png" name="Marketing" />
        <AvatarPicName picture="/2_var.png" name="Internship" />
        <AvatarPicName picture="/5_var.png" name="Admin" />
        <AvatarPicName picture="/4_var.png" name="Mentorship" />

      <div className="flex justify-center items-center gap-8">
        <AvatarPicName picture="/persona_icons/icon_law.png" name="Legal" />
        <AvatarPicName picture="/persona_icons/icon_hr.png" name="Human Resources" />
        <AvatarPicName picture="/persona_icons/icon_marketing.png" name="Marketing" />
        <AvatarPicName picture="/persona_icons/icon_intern.png" name="Internship" />
        <AvatarPicName picture="/persona_icons/icon_admin.png" name="Admin" />
        <AvatarPicName picture="/persona_icons/icon_teacher.png" name="Mentorship" />
      </div>
    </div>
  );
};

interface AvatarPicNameProps {
  picture: string;
  name: string;
}

export const AvatarPicName: FC<AvatarPicNameProps> = ({ picture, name }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="rounded-full overflow-clip">
        <Image src={picture} alt={name + " picture"} width={40} height={40} />
      </div>

      <p className="text-lg">{name}</p>
    </div>
  );
};

const BotPart: FC<MyComponentProps> = () => {
  return (
    <div className="flex lg:p-18 md:p-16 sm:p-14 p-10 bg-persona-bg bg-cover">
      <div className="lg:flex-col max-w-[1200px] m-auto">
        {/* The grid one */}
        <div
          className="basis-[70%] grid grid-cols-[1fr] grid-rows-[1fr]
          lg:grid-cols-[1fr_1fr_1.5fr] lg:grid-rows-[0.5fr_0.5fr_1fr] gap-3 mb-10"
        >
          <div className="lg:col-span-2 lg:row-span-2 lg:h-full col-span-1 h-[20rem] bg-white rounded-lg shadow border border-slate-500 overflow-clip relative bg-main-gradient bg-cover">
            <div className="absolute inset-0 w-full bg-black bg-opacity-30"></div>
            <PersonaIcons className="absolute m-4 bg-white z-10">
              <InternIcon />
            </PersonaIcons>
            <h2 className="z-10 absolute md:bottom-26 sm:bottom-18 bottom-10 w-full text-center text-white sm:text-3xl text-2xl">
              How do I make a Resume?
            </h2>
            <div className="z-10 absolute top-12 w-full p-4">
              <h3 className="text-white text-lg font-semibold">Intern AI</h3>
              <p className="text-white sm:pr-8">
                Perfect for managing internship-related tasks, providing
                support, and offering valuable insights to interns.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow border border-slate-200">
            <PersonaIcons className="bg-slate-100 border border-slate-300 mb-2">
              <MarketingIcon />
            </PersonaIcons>
            <h3 className="text-primary text-lg font-semibold">Marketing AI</h3>
            <p className="text-slate-600">
              Focused on enhancing your marketing efforts, this persona helps
              with campaign management, customer engagement, and data analysis.
            </p>
          </div>

          <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow border border-slate-200">
            <PersonaIcons className="bg-slate-100 border border-slate-300 mb-2">
              <TeacherIcon />
            </PersonaIcons>
            <h3 className="text-primary text-lg font-semibold">Teacher AI</h3>
            <p className="text-slate-600">
              This persona assists in creating online courses, offers
              personalized mentorship, and creates educational content for
              employee training and upskilling.
            </p>
          </div>

          <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow border border-slate-200">
            <PersonaIcons className="bg-slate-100 border border-slate-300 mb-2">
              <HRIcon />
            </PersonaIcons>
            <h3 className="text-primary text-lg font-semibold">HR AI</h3>
            <p className="text-slate-600">
              Streamline your HR operations in recruitment, inquiries, and
              analytics.
            </p>
          </div>

          <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow border border-slate-200">
            <PersonaIcons className="bg-slate-100 border border-slate-300 mb-2">
              <LawIcon />
            </PersonaIcons>
            <h3 className="text-primary text-lg font-semibold">Law AI</h3>
            <p className="text-slate-600">
              Made to assist with legal matters, it offers aid in legal
              research, and compliance.
            </p>
          </div>

          <div className="flex flex-col items-start bg-white p-4 rounded-lg shadow border border-slate-200">
            <PersonaIcons className="bg-slate-100 border border-slate-300 mb-2">
              <AdminIcon />
            </PersonaIcons>
            <h3 className="text-primary text-lg font-semibold">Admin AI</h3>
            <p className="text-slate-600">
              Improve administrative efficiency with this persona, which manages
              schedules, organizes tasks, and handles routine administrative
              functions.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 basis-[30%]">
          <h2 className="text-3xl font-medium text-slate-800">
            Meet our Personas
          </h2>
          <p className="sm:text-lg">
            Our AI chatbot is designed to adapt to your business needs through
            six distinct personas.
          </p>
          <p className="sm:text-lg">
            Each persona takes on a specific role, whether it{"'"}s supporting
            internships, enhancing marketing efforts, streamlining HR
            operations, assisting with legal matters, managing administrative
            tasks, or providing mentorship and courses.{" "}
          </p>
          <p className="sm:text-lg">
            By leveraging these tailored personas, your business can achieve
            greater efficiency, personalization, and effectiveness in addressing
            diverse challenges and requirements.
          </p>
          <div className="mt-4">
            <Link
              href="#"
              className="text-xl py-2 border-2 text-primary border-primary rounded-lg px-8 hover:bg-primary hover:text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersonaIcons = ({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className: string;
}>) => {
  return <span className={"p-2 rounded-lg " + className}>{children}</span>;
};

function InternIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#1e293b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
      />
    </svg>
  );
}

function MarketingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#1e293b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
      />
    </svg>
  );
}

function TeacherIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#1e293b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
      />
    </svg>
  );
}

function AdminIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#1e293b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
      />
    </svg>
  );
}

function LawIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#1e293b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
      />
    </svg>
  );
}

function HRIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#1e293b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
      />
    </svg>
  );
}
