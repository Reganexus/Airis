import SideBar from "../main/side-bar";
import PersonaSelection from "../main/persona-selection";
import PromptSelection from "../main/prompt-selection";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Home({ params }: PageProps) {
  const { id } = params;

  return (
    <main className="flex h-screen">
      {/* Side Bar */}
      <SideBar id={id} />
      <PersonaSelection id={id} />
      <PromptSelection id={id} />
    </main>
  );
}