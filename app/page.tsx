import Link from "next/link";
import SideBar from "./main/side-bar";
import PersonaSelection from "./main/persona-selection";
import PromptSelection from "./main/prompt-selection";

export default function Home() {
  return (
    <main className="flex h-screen">
      {/* Side Bar */}
      <SideBar />
      <PersonaSelection />
      <PromptSelection />
    </main>
  );
}
