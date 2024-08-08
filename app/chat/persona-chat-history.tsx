import Image from "next/image";
import "/app/main/persona-selection-scrollbar.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearChatHistory, fetchAndSetChatHistory } from "@/lib/chat/handle-chat-history";
import { useSession } from "next-auth/react";
import moment from 'moment';
import { usePathname, useRouter } from "next/navigation";

interface Conversation {
  conversation_id: number;
  user_id: number;
  chatbot_id: number;
  title: string;
  created_at: string; // ISO 8601 date-time string
}

interface GroupedConversation  {
  today: Conversation[];
  yesterday: Conversation[]; 
  last7Days: Conversation[]; 
  last30Days: Conversation[]; 
  older: Conversation[];
}

const groupByDates = (data: Array<Conversation>): GroupedConversation => {
  const today: Array<Conversation> = [];
  const yesterday: Array<Conversation> = [];
  const last7Days: Array<Conversation> = [];
  const last30Days: Array<Conversation> = [];
  const older: Array<Conversation> = [];

  if (data) {
    data.forEach((conversation) => {
      const date = moment(conversation.created_at);
      const now = moment();
  
      if (date.isSame(now, 'day')) {
        today.push(conversation);
      } else if (date.isSame(now.subtract(1, 'days'), 'day')) {
        yesterday.push(conversation);
      } else if (date.isBetween(now.subtract(7, 'days').startOf('day'), now.startOf('day'))) {
        last7Days.push(conversation);
      } else if (date.isBetween(now.subtract(30, 'days').startOf('day'), now.subtract(7, 'days').endOf('day'))) {
        last30Days.push(conversation);
      } else {
        older.push(conversation);
      }
    });
  }

  return { today, yesterday, last7Days, last30Days, older };
}

interface PersonaChatHistoryProps {
  refreshHistory: boolean;
}

const PersonaChatHistory: React.FC<PersonaChatHistoryProps> = ({ refreshHistory }) => {
  
  /**
   * Hooks and Important Variables such as user's session
   */
  const router = useRouter();
  const pathname = usePathname();
  const isInMainChatRoute = pathname === '/chat';
  const { data: session, status } = useSession();
  const user = session?.user;

  /**
   * Contains the Chatbot Name, Tagline displayed on Chat History Sidebar and groupings
   * of all past conversation in groupedHistory
   */
  const [aiName, setAiName ]= useState<string | null>();
  const [aiDescription, setAiDescription] = useState<string | null>();
  const [aiLogo, setAiLogo] = useState<string | null>();
  const [groupedHistory, setGroupedHistory] = useState<GroupedConversation>({
    today: [],
    yesterday: [],
    last7Days: [],
    last30Days: [],
    older: [],
  });
  useEffect(() => {
    const name = sessionStorage.getItem('aiName');
    const description = sessionStorage.getItem('aiDescription');
    const logo = sessionStorage.getItem('persona_logo');
    setAiName(name);
    setAiDescription(description);
    setAiLogo(logo);;
  }, []);

  useEffect(() => {
    // Check if the User is logged in
    // Fetch the Chat History
    fetchAndSetChatHistory(status, user)
    .then(
      (result) => {
        setGroupedHistory(groupByDates(result?.history))
      }
    );
  }, [status, user, refreshHistory]);
  
  

  const handleHistoryCleared = async () => {
    // Clear the chat history 
    const historyCleared = await clearChatHistory();
    if (historyCleared) {
      if (!isInMainChatRoute) {
        router.push('/chat')
      } else {
        setGroupedHistory({
          today: [],
          yesterday: [],
          last7Days: [],
          last30Days: [],
          older: [],
        });
      }
    }
  };

  
  return (
    <div className="bg-slate-100 min-w-80 max-w-80 flex flex-col border-r border-slate-300">
      {/* Persona Card */}
      <div className="p-2 bg-slate-50">
        <div className="relative w-full flex flex-col bg-ai-law min-h-48 h-auto overflow-clip rounded-lg border">
          <div className="absolute bottom-0 w-full h-[60%] bg-white p-5 pt-8 rounded-t-lg">
            <div className="absolute left-3 top-[-25px] rounded-full w-14 h-14 border-4 border-white overflow-clip">
              <Image
                src={aiLogo ?? "/persona_icons/icon_law.png"}
                alt="icon picture"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <h4 className="font-bold text-slate-700">{aiName}</h4>

            <p className="text-sm text-slate-500">
              {aiDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Chat History Header */}
      <div className="border-t border-b flex justify-between items-center p-3 gap-4 px-3 pb-3 bg-slate-50">
        <h3 className=" font-bold text-slate-700">Chat History</h3>

        <ClearHistoryButton historyCleared={handleHistoryCleared} />
      </div>

      {/* Chat History Selection List */}
      <div className="flex flex-col max-h-full max-w-full overflow-y-auto gap-3 p-3 px-4 py-4 h-full relative persona-selection-scrollbar">
        
        {groupedHistory && (
          <>
            {groupedHistory.today.length > 0 && <ChatHistoryBatch date="Today" topics={groupedHistory.today} />}
            {groupedHistory.yesterday.length > 0 && <ChatHistoryBatch date="Yesterday" topics={groupedHistory.yesterday} />}
            {groupedHistory.last7Days.length > 0 && <ChatHistoryBatch date="Previous 7 days" topics={groupedHistory.last7Days} />}
            {groupedHistory.last30Days.length > 0 && <ChatHistoryBatch date="Previous 30 days" topics={groupedHistory.last30Days} />}
            {groupedHistory.older.length > 0 && <ChatHistoryBatch date="Older" topics={groupedHistory.older} />}
          </>
        )}
      </div>
    </div>
  );
};

export default PersonaChatHistory;


interface ChatHistoryBatchProps {
  date?: string;
  topics: Array<Conversation>;
}

const dummyHistory = [
  {
    conversation_id: "",
    title: "Sign up Now",
  }
];

const ChatHistoryBatch: React.FC<ChatHistoryBatchProps> = ({
  date = "Yesterday",
  topics = dummyHistory,
}) => {
  
  
  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      <h5 className="font-semibold text-slate-600 mb-2">{date}</h5>
      {topics.map((t) => (
        <Link
          key={t.conversation_id}
          href="#"
          className="text-slate-600 rounded-lg hover:bg-slate-200 max-w-full overflow-hidden px-4 py-2 text-sm whitespace-nowrap text-nowrap text-ellipsis"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            router.push(`/chat/${t.conversation_id}`);
          }}
        >
          {t.title}
        </Link>
      ))}
    </div>
  );
};


interface ClearHistoryProps {
  historyCleared: () => void;
}
const ClearHistoryButton: React.FC<ClearHistoryProps> = ({ historyCleared }) => {
  return (
    <button 
      onClick={() => {historyCleared();}} 
      className="text-slate-500 py-1 px-2 hover:bg-red-200 hover:text-red-700 rounded-lg border bg-slate-200 flex gap-1 items-center"
    >
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
