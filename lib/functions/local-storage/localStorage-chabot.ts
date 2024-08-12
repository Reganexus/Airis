
'use client';
import { useRouter } from "next/navigation"; // Make sure to import from 'next/router' not 'next/navigation'

export const useStoreChatbotSession = () => {
    // Function when a Prompt is clicked on Prompt Selectioon
  const router = useRouter();

  return (
        name: string | undefined, 
        description: string | undefined, 
        chatbot_id: string, 
        task: string
    ) => {
        console.log("Storing session...");
        localStorage.setItem('aiName', name ?? "");
        localStorage.setItem('aiDescription', description ?? "");
        localStorage.setItem('chatbot_id', chatbot_id);
        localStorage.setItem('task', task);

        router.push('/chat');
    };
};

export const useStorePersonaLogoSession = () => {
    // Function when a Persona is clicked on to pass the persona_logo
  return (
        persona_logo: string | undefined, 
    ) => {
        console.log("Storing persona logo session...");
        localStorage.setItem('persona_logo', persona_logo ?? "");
    };
};
