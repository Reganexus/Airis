export function Page(): any {
  return (
    <div className="border rounded-md flex flex-col rounded-t-none dark:border-slate-600 grow">
      {/* Header of Prompts */}
      <div className="flex flex-col p-4 px-5">
        {/* Breadcrumbs */}
        <BreadCrumbsLoading />

        {/* text */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-500 dark:text-slate-300">
            Select a Prompt
          </h2>
        </div>
      </div>

      {/* Prompts Section and Cards */}
      <div className="flex flex-col p-4 h-full pt-0">
        {/* Default Prompt */}
        <DefaultPromptLoading />

        {/* PROMPS LISTS */}
        <div className="w-full basis-[70%] h-full max-h-full grid grid-cols-3 overflow-auto gap-4 grid-rows-fixed">
          <PromptsListLoading />
        </div>
      </div>
    </div>
  );
}

export function BreadCrumbsLoading() {
  return (
    <div className="bg-slate-100 dark:bg-slate-700 rounded-full px-5 text-slate-600 py-1  mb-4 self-start text-opacity-0 overflow-clip relative">
      <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer"></div>
      <span>Bread Crumbs</span>
    </div>
  );
}

export function DefaultPromptLoading() {
  return (
    <div className="basis-[30%] mb-4">
      <div className="bg-slate-300 dark:bg-slate-700 h-full relative flex flex-col justify-end rounded-lg p-6 overflow-clip">
        <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-200/60 via-slate-300/60 to-slate-200/60 animate-shimmer dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"></div>

        <h4 className="text-4xl text-white bg-slate-400 dark:bg-slate-600 self-start text-opacity-0 rounded-sm relative overflow-clip">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></div>
          Task Name Task name here skibidi toilet
        </h4>
        <DiagonalArrow />
      </div>
    </div>
  );
}

export function PromptsListLoading() {
  return (
    <>
      {/* Role List */}
      {Array.from({ length: 6 }, (_, index) => (
        <PromptCard key={index} />
      ))}
    </>
  );
}

const PromptCard = () => {
  return (
    <div>
      <div className="w-full h-full flex text-xl p-3 px-4 rounded-md border-slate-300 text-slate-600 text-opacity-0 bg-slate-100 dark:bg-slate-700 relative overflow-clip">
        <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-shimmer dark:from-slate-700 dark:via-slate-600 dark:to-slate-700"></div>
        <p className="self-start bg-slate-300 rounded-sm relative overflow-clip dark:bg-slate-600">
          <span className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></span>
          Prompt Tasks Text
        </p>
      </div>
    </div>
  );
};

// ICONS and BUTTONS

const DiagonalArrow = () => {
  return (
    <span className="absolute right-4 top-4 text-white text-opacity-0 rounded-full bg-slate-400 p-1 overflow-clip dark:bg-slate-600">
      <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 animate-shimmer dark:from-slate-600 dark:via-slate-500 dark:to-slate-600"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8"
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
