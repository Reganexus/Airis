'use client';
import { AirisChat } from "@/components/component/airis-chat";
import { SessionProvider } from "next-auth/react";

export default function ChatPage() {

  return (
    <SessionProvider>
      <AirisChat />
    </SessionProvider>
  );
}
