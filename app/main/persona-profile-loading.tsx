const PersonaProfileLoading = () => {
  return (
    <div className="border rounded-md rounded-b-none border-b-0 dark:border-slate-600 relative overflow-clip flex flex-col">
      {/* just a background color style */}
      <div className="bg-airis-primary h-1 mob:hidden"></div>

      <div className="relative w-full h-[95%] bottom-0  flex px-4 py-3 items-center gap-3 mob:hidden">
        {/* Image of the persona */}
        <div className="rounded-full w-14 h-14 border-4 border-white dark:border-slate-500 overflow-clip relative bg-slate-200 dark:bg-slate-700">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 animate-shimmer"></div>
        </div>

        {/* Persona Name and Descriptions */}
        <div className="flex flex-col">
          <h2 className="text-xl text-slate-800 font-bold self-start bg-slate-300 dark:bg-slate-500 mb-1 text-opacity-0 rounded-sm relative overflow-clip">
            <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></div>
            AI Persona Name
          </h2>

          <p className="text-slate-500 self-start bg-slate-200 dark:bg-slate-600 text-sm text-opacity-0 rounded-sm relative overflow-clip">
            <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></div>
            Persona Tagline ihere loreom ipsum Skibidi
          </p>
        </div>

        {/* Persona Action Buttons */}
        <div className="flex items-center ml-auto text-sm">
          <PersonaSettingsButton />

          <button className="text-slate-500 py-2 pr-3 pl-2 border border-white bg-slate-200 dark:bg-slate-700 dark:border-slate-500 border-r-0 flex items-center gap-2 text-opacity-0 relative overflow-clip">
            <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></div>
            <ModifyPromptIcon />
            Modify Prompt
          </button>

          <button className="text-slate-500 py-2 pr-3 pl-2  border border-white bg-slate-200 dark:bg-slate-700 dark:border-slate-500 rounded-lg rounded-l-none flex items-center gap-1 text-opacity-0 relative overflow-clip">
            <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></div>
            <AddPromptIcon />
            Add Prompt
          </button>
        </div>
      </div>

      <div className="hidden mob:flex py-4 px-2">
        <span className="flex items-center text-slate-600 text-sm">
          <BackIcon />
          Return
        </span>
      </div>
    </div>
  );
};

export default PersonaProfileLoading;

const PersonaSettingsButton = () => {
  return (
    <button className="text-slate-500 p-2 border border-white bg-slate-200 rounded-lg rounded-r-none border-r-0 text-opacity-0 overflow-clip relative dark:bg-slate-700 dark:border-slate-500">
      <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 animate-shimmer"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
      </svg>
    </button>
  );
};

const AddPromptIcon = () => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </span>
  );
};

const ModifyPromptIcon = () => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    </span>
  );
};

const BackIcon = () => {
  return (
    <span className="text-slate-500 mr-1 hover:bg-slate-200 hover:text-primary rounded-lg  dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
    </span>
  );
};
