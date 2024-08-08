const PersonaSelectionLoading = () => {
  return (
    <div className="bg-slate-100 w-full max-w-[23rem] flex flex-col border-r border-slate-300 dark:bg-slate-900 dark:border-slate-500">
      {/* Header */}
      <div className="shadow flex justify-between items-center p-5 gap-4 px-6 pb-5 border-b dark:border-slate-600">
        <div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">
            Persona Selection
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Select a persona from list below
          </p>
        </div>
        <AddPersonaIcon />
      </div>

      {/* Persona Selection List */}
      <div className="flex flex-col max-h-full overflow-hidden gap-3 p-3 px-4 py-6 h-full relative persona-selection-scrollbar">
        {Array.from({ length: 6 }, (_, index) => (
          <PersonaCardSkele key={index} />
        ))}
      </div>
    </div>
  );
};

export default PersonaSelectionLoading;

const PersonaCardSkele: React.FC = () => {
  return (
    <div
      className={`bg-slate-300 dark:bg-slate-800 rounded-2xl min-h-36 border border-slate-300 shadow-sm relative overflow-clip dark:border-slate-500`}
    >
      <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer opacity-25"></div>

      <div className="absolute bg-white w-full rounded-t-2xl bottom-0 left-0 h-[80%] flex flex-col p-4 pt-9 pl-4 dark:bg-slate-600">
        <span className="absolute top-2 right-2 text-xs py-1 px-2 bg-airis-primary bg-opacity-15 rounded-2xl text-airis-primary dark:bg-cyan-700/50 font-semibold text-opacity-0 overflow-clip">
          Selected
          <span className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-cyan-800 dark:via-cyan-700 dark:to-cyan-800 animate-shimmer"></span>
        </span>

        <div className="w-[50px] h-[50px] rounded-full border-4 border-white bg-slate-200 dark:bg-slate-700 absolute top-[-15px] left-3 overflow-clip dark:border-slate-600">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer opacity-25"></div>
        </div>

        <h3 className="text-slate-700 font-bold self-start bg-slate-300 dark:bg-slate-500 text-opacity-0 rounded-md relative overflow-clip">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 animate-shimmer opacity-25"></div>
          AI NAME HERE
        </h3>
        <p className="text-xs text-slate-500 m-0 inline bg-slate-100 dark:bg-slate-500 my-1 rounded-sm text-opacity-0 relative overflow-clip">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer opacity-25"></div>
          Line here blah lorem ipsum skibidi
        </p>
        <p className="text-xs text-slate-500 m-0 inline bg-slate-100 dark:bg-slate-500 rounded-sm text-opacity-0 relative overflow-clip">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer opacity-25"></div>
          Line here blah lorem
        </p>
      </div>
    </div>
  );
};

const AddPersonaIcon = () => {
  return (
    <button className="text-slate-500 p-3 hover:bg-slate-200 hover:text-primary rounded-lg border bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
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
          d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
        />
      </svg>
    </button>
  );
};
