'use client';
import { ByteChatBot } from "@/components/component/byte-chat-bot";
import { SessionProvider } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ChatPage() {
    //const router = useRouter();
    const { historyConversationId } = useParams(); // Access the dynamic route parameter

    return (
        <SessionProvider>
            {historyConversationId && <ByteChatBot historyConversationId={historyConversationId as string} />}
        </SessionProvider>
    );
}
