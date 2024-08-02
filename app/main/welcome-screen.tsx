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
      <div className="bg-white p-8 rounded-lg shadow w-full">
        <h1 className="text-5xl font-bold mb-2 text-primary">
          Welcome to Airis, Julia!
        </h1>
        <h4 className="text-2xl font-semibold text-slate-600 pl-2">
          How may I help you today?
        </h4>
      </div>

      {/* Initiator Propmts */}
      <div className="w-full h-96 grid grid-cols-2 grid-rows-3 gap-8">
        {prompts.map((p) => (
          <div
            className={`relative overflow-clip ${p.bg} rounded-lg shadow-md hover:cursor-pointer border border-slate-300`}
            key={p.prompt}
          >
            <div className="bg-white w-full bottom-0 absolute h-[90%] rounded-t-lg p-4 flex flex-col justify-between">
              <h4 className="text-slate-600">{p.ai}</h4>
              <h2 className="font-semibold">{p.prompt}</h2>
              <DiagonalArrow />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-slate-700">
        This AI chatbot is for informational purposes only and should not be
        considered professional advice.
      </p>
    </div>
  );
};

export default WelcomeScreen;

const DiagonalArrow = () => {
  return (
    <span className="absolute right-4 bottom-3 text-slate-700">
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
