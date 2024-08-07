import { PersonaChatbots, SelectedPersona } from "@/lib/types";
import PersonaPrompts from "./persona-prompts";
import WelcomeScreen from "./welcome-screen";


interface PromptSelectionProps {
  selectedPersona?: SelectedPersona;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({ selectedPersona }) => {
  return (
    <div className="bg-slate-200 grow flex justify-center items-center">
      {/* <WelcomeScreen /> */}
      <PersonaPrompts selectedPersona={selectedPersona} />
    </div>
  );
};

export default PromptSelection;
