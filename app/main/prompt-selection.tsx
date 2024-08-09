import { PersonaChatbots, SelectedPersona } from "@/lib/types";
import PersonaPrompts from "./persona-prompts";
import WelcomeScreen from "./welcome-screen";

interface PromptSelectionProps {
  selectedPersona?: SelectedPersona;
  isLoading?: Boolean;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({
  selectedPersona,
  isLoading,
}) => {
  return (
    <div className="bg-slate-200 grow flex justify-center items-center dark:bg-dark-mode">
      <PersonaPrompts selectedPersona={selectedPersona} isLoading={isLoading} />
    </div>
  );
};

export default PromptSelection;
