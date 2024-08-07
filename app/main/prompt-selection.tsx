import { PersonaChatbots, SelectedPersona } from "@/lib/types";
import PersonaPrompts from "./persona-prompts";
import WelcomeScreen from "./welcome-screen";
import { Suspense } from "react";
import Loading from "../persona/persona-selection-loading";

interface PromptSelectionProps {
  selectedPersona?: SelectedPersona;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({
  selectedPersona,
}) => {
  return (
    <div className="bg-slate-200 grow flex justify-center items-center">
      {/* <WelcomeScreen /> */}
      <Suspense fallback={<Loading />}>
        <PersonaPrompts selectedPersona={selectedPersona} />
      </Suspense>
    </div>
  );
};

export default PromptSelection;
