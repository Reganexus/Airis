'use client';
import { ByteChatBot } from "@/components/component/byte-chat-bot";
import { SessionProvider } from "next-auth/react";

export default function ChatPage() {

  return (
    <SessionProvider>
      <ByteChatBot />
    </SessionProvider>
  );
}
