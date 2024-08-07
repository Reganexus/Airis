
import { fetchChatbot, fetchOldChat, fetchChatUID, fetchChatHistory } from "@/lib/db/fetch-queries";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MutableRefObject } from "react";

// if a chathistory is clicked, this will be saved
// export async function handleChatHistory(
//   historyConversationId: string | undefined,
//   status: string,
//   user: { name?: string | null | undefined; 
//             email?: string | null | undefined; 
//             image?: string | null | undefined; } 
//             | undefined,
//   router: AppRouterInstance,
//   mounted: MutableRefObject<boolean>
// ) {
//     if (historyConversationId) {

//         const numberHistoryConversationId = Number(historyConversationId);
        
//         // VALIDATE -  historyConversationId type should be number
//         if (isNaN(numberHistoryConversationId)) {
//         router.push('/');
//         return;
//         }

//         // VALIDATE - User should be logged in
//         if (status === 'unauthenticated') {
//         router.push('/');
//         return;
//         }

//         // VALIDATE - User should be in right account
//         if (status === 'authenticated' && user != undefined) {
//             const data = await fetchChatUID(numberHistoryConversationId, user.email);
//             if (data === 'wrong uid') {
//                 router.push('/');
//                 return;
//             }

//             const oldChat = await fetchOldChat(numberHistoryConversationId);
//             if (oldChat.error !== '') {
//                 router.push('/');
//                 return;
//             }

//             const chatbot = await fetchChatbot();
//             console.log("11111", numberHistoryConversationId)
//             console.log("11111", chatbot.chatbot)
//             console.log("11111", oldChat.messages)
//             return { 
//                 status: 'oldchat',
//                 convo_id: numberHistoryConversationId,
//                 chatbot: chatbot.chatbot,
//                 chat: oldChat.messages
//             }
//         }
//     } else {

//         console.log("1");
//         if (!mounted.current) return;
//         console.log("2Z");
//         // fetch the chatbot data
//         const fetchData = async () => {
//             console.log("24");
        
//             const data = await fetchChatbot();
//             setChosenChatbot(data.chatbot);
//             const stringify = JSON.stringify(data.chatbot?.sysprompt)
//             setMessages([
//             {
//                 id: "firstprompt",
//                 role: 'user',
//                 content: stringify
//             },
//             ]);
//             console.log("25 -", data)
//             mounted.current = false;
//             return { 
//                 status: "newchat",
//                 convo_id: 0,
//                 chatbot: data.chatbot,
//                 chat: stringify
//             }
//         };
      
//       fetchData();
//     }   
// }

export async function fetchAndSetChatHistory(
  status: string,
  user: { name?: string | null | undefined; 
    email?: string | null | undefined; 
    image?: string | null | undefined; } 
    | undefined,
) {
  if (status === 'authenticated' && user) {
    const data = await fetchChatHistory(user.email);
    return { history: data }
  }
}


export async function clearChatHistory() {
  
  try {
    const response = await fetch('/api/query/query-delete-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Ensure the content type is set to JSON
      },
    });

    if (response.ok) {
      console.log('Success: ', await response.text());
    } else {
      console.log('Failed: ', await response.text());
    }

    return true;
  
  } catch (error) {
    console.error('Error deleting history:', error);
  
    return false;
  
  }
  
}