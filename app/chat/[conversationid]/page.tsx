'use client';
import { AirisChat } from "@/components/component/airis-chat";
import { SessionProvider } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ChatPage() {
    //const router = useRouter();
    const { conversationid } = useParams(); // Access the dynamic route parameter

    return (
        <SessionProvider>
            {conversationid && <AirisChat historyConversationId={conversationid as string} />}
        </SessionProvider>
    );
}
