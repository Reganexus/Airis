import Image from "next/image";
import "/app/main/persona-selection-scrollbar.css";
import Link from "next/link";

const PersonaChatHistory = () => {
  return (
    <div className="bg-slate-100 min-w-80 max-w-80 flex flex-col border-r border-slate-300">
      {/* Persona Card */}
      <div className="p-2 bg-slate-50">
        <div className="relative w-full flex flex-col bg-ai-law min-h-48 h-auto overflow-clip rounded-lg border">
          <div className="absolute bottom-0 w-full h-[60%] bg-white p-5 pt-8 rounded-t-lg">
            <div className="absolute left-3 top-[-25px] rounded-full w-14 h-14 border-4 border-white overflow-clip">
              <Image
                src={"/persona_icons/icon_law.png"}
                alt="icon picture"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <h4 className="font-bold text-slate-700">Legal AI</h4>

            <p className="text-sm text-slate-500">
              A reliable persona for all your legal needs.
            </p>
          </div>
        </div>
      </div>

      {/* Chat History Header */}
      <div className="border-t border-b flex justify-between items-center p-3 gap-4 px-3 pb-3 bg-slate-50">
        <h3 className=" font-bold text-slate-700">Chat History</h3>

        <ClearHistoryButton />
      </div>

      {/* Chat History Selection List */}
      <div className="flex flex-col max-h-full max-w-full overflow-y-auto gap-3 p-3 px-4 py-4 h-full relative persona-selection-scrollbar">
        <ChatHistoryBatch topics={dummyHistory} />
        <ChatHistoryBatch topics={dummyHistory} />
        <ChatHistoryBatch topics={dummyHistory} />
        <ChatHistoryBatch topics={dummyHistory} />
        <ChatHistoryBatch topics={dummyHistory} />
      </div>
    </div>
  );
};

export default PersonaChatHistory;

interface Topic {
  title: string;
  id: string;
}

interface ChatHistoryBatchProps {
  date?: string;
  topics: Topic[];
}

const dummyHistory = [
  {
    id: "sadfasdf",
    title: "Lorem ipsum dolorem skibidi tolient gyatterist asdfasdf",
  },
  {
    id: "sadfasdf",
    title: "Lorem ipsum dolorem skibidi tolient gyatterist asdfasdf",
  },
  {
    id: "sadfasdf",
    title: "Lorem ipsum dolorem skibidi tolient gyatterist asdfasdf",
  },
];

const ChatHistoryBatch: React.FC<ChatHistoryBatchProps> = ({
  date = "Yesterday",
  topics = dummyHistory,
}) => {
  return (
    <div className="w-full flex flex-col">
      <h5 className="font-semibold text-slate-600 mb-2">{date}</h5>
      {topics.map((t) => (
        <Link
          key={t.id}
          href="#"
          className="text-slate-600 rounded-lg hover:bg-slate-200 max-w-full overflow-hidden px-4 py-2 text-sm whitespace-nowrap text-nowrap text-ellipsis"
        >
          {t.title}
        </Link>
      ))}
    </div>
  );
};

const ClearHistoryButton = () => {
  return (
    <button className="text-slate-500 py-1 px-2 hover:bg-red-200 hover:text-red-700 rounded-lg border bg-slate-200 flex gap-1 items-center">
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
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>

      <p className="text-sm">Clear History</p>
    </button>
  );
};
