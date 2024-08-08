
import { useRouter } from "next/navigation"; // Make sure to import from 'next/router' not 'next/navigation'

export const useStoreChatbotSession = () => {
    // Function when a Prompt is clicked on Prompt Selectioon
  const router = useRouter();

  return (
        name: string | undefined, 
        description: string | undefined, 
        chatbot_id: string, 
        persona_id: string,
        task: string
    ) => {
        console.log("Storing session...");
        sessionStorage.setItem('aiName', name ?? "");
        sessionStorage.setItem('aiDescription', description ?? "");
        sessionStorage.setItem('chatbot_id', chatbot_id);
        sessionStorage.setItem('persona_id', persona_id);
        sessionStorage.setItem('task', task);

        router.push('/chat');
    };
};

export const useStorePersonaLogoSession = () => {
    // Function when a Persona is clicked on to pass the persona_logo
  return (
        persona_logo: string | undefined, 
    ) => {
        console.log("Storing persona logo session...");
        sessionStorage.setItem('persona_logo', persona_logo ?? "");
    };
};
