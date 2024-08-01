const prompts = [
  { ai: "Intern AI", bg: "bg-ai-intern", prompt: "Create a Resume" },
  {
    ai: "Marketing AI",
    bg: "bg-ai-marketing",
    prompt: "Create a Company Brand",
  },
  {
    ai: "Human Resources AI",
    bg: "bg-ai-hr",
    prompt: "Create an Employment Contract",
  },
  { ai: "Law AI", bg: "bg-ai-law", prompt: "Create a Prospectus" },
  { ai: "Admin AI", bg: "bg-ai-admin", prompt: "Create an Expense Report" },
  {
    ai: "Teacher AI",
    bg: "bg-ai-teacher",
    prompt: "Create a Test Review Sheet",
  },
];

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
    <div className="w-full max-w-7xl h-[90%] z-10 flex flex-col justify-between items-center p-4">
      {/* Header */}
      <div className="bg-white p-8 rounded-lg shadow w-full">
        <h1 className="text-5xl font-bold mb-2">Welcome to Airis, Julia!</h1>
        <h4 className="text-2xl font-semibold text-slate-600 pl-2">
          How may I help you today?
        </h4>
      </div>

      {/* Initiator Propmts */}
      <div className="grid grid-cols-2 grid-rows-2"></div>

      <p className="text-center text-slate-700">
        This AI chatbot is for informational purposes only and should not be
        considered professional advice.
      </p>
    </div>
  );
};
