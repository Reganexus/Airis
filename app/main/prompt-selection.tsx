import PersonaPrompts from "./persona-prompts";
import WelcomeScreen from "./welcome-screen";

const PromptSelection = () => {
  return (
    <div className="bg-slate-200 grow flex justify-center items-center">
      {/* <WelcomeScreen /> */}
      <PersonaPrompts />
    </div>
  );
};

export default PromptSelection;
