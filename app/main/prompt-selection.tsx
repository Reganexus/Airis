import PersonaPrompts from "./persona-prompts";
import WelcomeScreen from "./welcome-screen";


interface PromptSelectionProps {
  id?: string;
}

const PromptSelection: React.FC<PromptSelectionProps> = ({ id }) => {
  return (
    <div className="bg-slate-200 grow flex justify-center items-center">
      {/* <WelcomeScreen /> */}
      <PersonaPrompts id={id} />
    </div>
  );
};

export default PromptSelection;
