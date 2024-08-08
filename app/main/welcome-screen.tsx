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

const WelcomeScreen = () => {
  return (
    <div className="w-full max-w-7xl h-[90%] z-10 flex flex-col justify-between items-center p-4">
      {/* Header */}
      <div className="p-8 rounded-lg w-full dark:bg-opacity-0 border dark:border-0">
        <h1 className="text-5xl font-bold mb-2 text-primary dark:text-cyan-400">
          Welcome to Airis, Julia!
        </h1>
        <h4 className="text-2xl font-semibold text-slate-600 pl-2 dark:text-slate-300">
          How may I help you today?
        </h4>
      </div>

      {/* Initiator Propmts */}
      <div className="w-full h-96 grid grid-cols-2 grid-rows-3 gap-8">
        {prompts.map((p) => (
          <div
            className={`relative overflow-clip bg-airis-primary dark:bg-cyan-600 rounded-lg shadow-md hover:cursor-pointer border border-slate-300 dark:border-slate-500`}
            key={p.prompt}
          >
            <div className="bg-white dark:bg-slate-700  w-full bottom-0 absolute h-[95%] rounded-t-lg p-4 flex flex-col justify-between">
              <h4 className="text-slate-600 dark:text-slate-300">{p.ai}</h4>
              <h2 className="font-semibold dark:text-slate-200">{p.prompt}</h2>
              <DiagonalArrow />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-700 dark:text-slate-400">
        This AI chatbot is for informational purposes only and should not be
        considered professional advice.
      </p>
    </div>
  );
};

export default WelcomeScreen;

const DiagonalArrow = () => {
  return (
    <span className="absolute right-4 bottom-3 text-slate-700 dark:text-slate-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </span>
  );
};
