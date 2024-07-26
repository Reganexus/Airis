/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/vOMG2D94tJC
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:
import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";

import Logo from "@/components/component/logo";
import HeaderAvatar from "@/components/component/header-avatar";

import { useChat } from "ai/react";

export function ByteChatBot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      {/* <div className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
        <div className="flex items-center gap-2 border-b pb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            <p className="font-medium">Acme Chatbot</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoveHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant="ghost"
          className="mt-4 w-full justify-start gap-2 bg-muted"
        >
          <PlusIcon className="h-4 w-4" />
          New chat
        </Button>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-4 py-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
              prefetch={false}
            >
              <div className="flex-1 truncate">
                <p className="text-sm text-muted-foreground">
                  Hello, how can I help?
                </p>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
              prefetch={false}
            >
              <div className="flex-1 truncate">
                <p className="text-sm text-muted-foreground">
                  Product question
                </p>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
              prefetch={false}
            >
              <div className="flex-1 truncate">
                <p className="text-sm text-muted-foreground">Help with order</p>
              </div>
            </Link>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex justify-between h-14 items-center gap-4 border-b border-slate-200 bg-background px-4 sm:h-[60px] sm:px-6">
          {/* <Button variant="ghost" size="icon" className="sm:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button> */}

          <Logo />

          <HeaderAvatar />
          {/* <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div> */}
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-slate-100">
          <div className="grid gap-6 max-w-5xl m-auto">
            {messages.map((m, i) => {
              if (m.role === "user") {
                {
                  /* User message */
                }
                return (
                  <div key={i} className="flex items-start gap-4 justify-end">
                    <div className="grid gap-1.5 rounded-full bg-primary p-3 px-4 text-sm">
                      <p className="text-white">{m.content}</p>
                    </div>
                  </div>
                );
              } else {
                {
                  /* Chatbot message */
                }
                return (
                  <div key={m.id} className="flex items-start gap-4">
                    <div className="pt-3">
                      <div className="h-[40px] w-[40px] rounded-full bg-slate-400 "></div>
                    </div>

                    <div className="grid gap-1.5 rounded-full p-3 px-4 text-sm">
                      <h1 className="font-semibold">Ai Chatbot</h1>
                      <p>{m.content}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </main>

        <form onSubmit={handleSubmit} className="pb-[50px] bg-slate-100">
          <footer className="rounded-lg max-w-5xl m-auto sticky bottom-0 z-10 flex h-14 items-center gap-2 border bg-background px-4 sm:h-[60px] sm:px-3">
            <Input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent p-2 text-sm "
              onChange={handleInputChange}
            />

            <Button variant="ghost" size="icon" className="bg-primary">
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}

// MenuIcon(props: React.SVGProps<SVGSVGElement>)
function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}