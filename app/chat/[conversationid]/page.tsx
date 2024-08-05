'use client';
import { ByteChatBot } from "@/components/component/byte-chat-bot";
import { SessionProvider } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ChatPage() {
    //const router = useRouter();
    const { conversationid } = useParams(); // Access the dynamic route parameter

    return (
        <SessionProvider>
            {conversationid && <ByteChatBot historyConversationId={conversationid as string} />}
        </SessionProvider>
    );
}
