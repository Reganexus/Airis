
import { useRouter } from "next/navigation"; // Make sure to import from 'next/router' not 'next/navigation'

export const useStoreChatbotSession = () => {
  const router = useRouter();

  return (
        name: string | undefined, 
        description: string | undefined, 
        chatbot_id: string, 
        persona_id: string
    ) => {
        console.log("Storing session...");
        sessionStorage.setItem('aiName', name ?? "");
        sessionStorage.setItem('aiDescription', description ?? "");
        sessionStorage.setItem('chatbot_id', chatbot_id);
        sessionStorage.setItem('persona_id', persona_id);

        router.push('/chat');
    };
};
