const prompts = [{}];

const PromptSelection = () => {
  return (
    <div className="bg-slate-200 grow flex justify-center items-center">
      <WelcomeScreen />
    </div>
  );
};

export default PromptSelection;

const WelcomeScreen = () => {
  return (
    <div className="w-full max-w-7xl border border-slate-500 h-[80%] z-10 flex flex-col justify-between items-center">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-bold">Welcome to Airis, Julia!</h1>
        <h4 className="text-xl font-semibold">How may I help you today?</h4>
      </div>

      {/* Initiator Propmts */}
      <div className="grid grid-cols-2 grid-rows-2"></div>

      <p className="text-center">
        This AI chatbot is for informational purposes only and should not be
        considered professional advice.
      </p>
    </div>
  );
};
