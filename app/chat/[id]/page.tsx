'use client';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import Spinner from "@/components/outputs/spinner"
import { useChat } from 'ai/react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Assistant } from "next/font/google";
import { Attachment } from '@ai-sdk/ui-utils';


async function fetchDALLE(prompt: string) {
  const res = await fetch('/api/image',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          model: "dall-e-2",
          user_prompt: prompt,
        }
      )
    }
  )
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default function Chat({ params } : any) {

    // Consists of the prompts
    const persona = [
        'You are Airis, StartUpLab\'s internship advisor with 30 years of experience. You help Filipino students looking for interns prepare for internship applications. You are adept at creating resumes based on the information provided by clients, consulting with clients about their careers, and recommending career paths according to the clients\' skills and interests. Offer detailed answers to questions related to internships, including but not limited to application processes, interview tips, selecting suitable opportunities and preparing necessary documents. Speak in professional but comforting tone and ALWAYS TELL the user IF the topic goes out of your expertise.',
        'You are Airis, StartUpLab\'s marketing analyst with 30 years of experience. You help clients such as business owners understand market trends and consumer behavior. Your task is to offer deep-dive consultations tailored to the client\'s issues, including various analysis documents and progress reports. ALWAYS TELL the user IF the topic goes out of your expertise.',
        'You are Airis, StartUpLab\'s Philippine legal consultant with 30 years of experience. You are an expert on Philippine laws, and you specialize in creating various legal documents necessary to the clients\' needs. Your task is to offer deep-dive consultations tailored to the client\'s issues. They rely on your expertise to ensure compliance with Philippine laws. Ask questions for further information on legal documents when necessary. Speak in professional tone and ALWAYS TELL the user IF the topic goes out of your expertise.',
        'You are Airis, StartUpLab\'s Human Resource Manager with 30 years of experience. You specialize in HR policies, employee relations, performance management, talent acquisition, and employee development. Your task is to offer deep-dive consultations and help clients manage their HR needs effectively. Your clients can be business owners, HR managers and employers. Speak in professional tone and ALWAYS TELL the user IF the topic goes out of your expertise.',
        'You are Airis, StartUpLab\'s Admin Assistant with 30 years of experience, specializing in administrative management, operations coordination, and support services within the company ONLY. Your task is to offer assistance to StartUpLab\'s managers, admins, and owners on efficient operation and administrative processes. ALWAYS INFORM the user if the topic goes beyond your expertise.',
        'You are Airis, StartUpLab\'s mentor for teachers with 30 years of experience in all academic subjects and managing online courses. You help clients, including teachers, authors, and online instructors, with classroom management, curriculum development, student engagement, instructional strategies, and technology integration. You provide comprehensive answers and, if requested, create lesson plans, teaching materials, assessment tools, and progress reports. Speak in a formal and professional tone, and ALWAYS TELL the user IF the topic goes out of your expertise.'
    ]; 


    // default ang gpt-4o on the textbox thingy
    const [placeholder, setPlaceholder] = useState('Type your message...');
    const [model, setModel] = useState('gpt-4o-mini');
    const [modelBtn, setModelBtn] = useState('GPT');
    const [dallid, setdallid] = useState(0);
    const [uploadUrl, setUploadUrl] = useState("");

    const [attachments] = useState<Attachment[]>([
      {
        name: 'earth.png',
        contentType: 'image/png',
        url: 'https://example.com/earth.png',
      },
    ]);


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setUploadUrl(url);
      }
    };

    const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
      initialMessages: [
      ],
    });
    
    async function promptSubmit(e: { preventDefault: () => void; }) {
      e.preventDefault();
      if (model == 'gpt-4o-mini') {
        // GPT-4o MODEL
        handleSubmit(e, {
          data: { imageUrl: uploadUrl,
                  persona: persona[params.id],
           },
          
        });
        }
      else {
        // DALL-E MODEL
        setMessages([
          ...messages, 
          {
            id: "",
            role: 'user',
            content: input
          }
        ]);
        
        
        fetchDALLE(input).then((res) => {

          setMessages([
            ...messages, 
            {
              id: "",
              role: 'user',
              content: res.prompt
            },
            {
              id: "",
              role: 'assistant',
              content: res.response
            }
          ]);
        });
      }
    }

    function handleClick(){
      if(model == 'gpt-4o-mini'){
        setModel('dall-e-2');
        setModelBtn('DALL-E');
        setPlaceholder('Generate an image...');
      }
      else{
        setModel('gpt-4o-mini');
        setModelBtn('GPT');
        setPlaceholder('Type your message...');


      }
    }
   

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
        <div className="flex items-center gap-2 border-b pb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="flex-1 truncate">
            
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
        <Button variant="ghost" className="mt-4 w-full justify-start gap-2 bg-muted">
          <PlusIcon className="h-4 w-4" />
          New chat
        </Button>
        <div className="flex-1 overflow-auto">
          <div className="grid gap-4 py-4">
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <div className="flex-1 truncate">
                <p className="text-sm text-muted-foreground">Hello, how can I help?</p>
              </div>
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <div className="flex-1 truncate">
                <p className="text-sm text-muted-foreground">Product question</p>
              </div>
            </Link>
            <Link href="#" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted" prefetch={false}>
              <div className="flex-1 truncate">
                <p className="text-sm text-muted-foreground">Help with order</p>
              </div>
            </Link>
          </div>
        </div>
        
      </div>


      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-[60px] sm:px-6">
          <Button variant="ghost" size="icon" className="sm:hidden">
            {/*<MenuIcon className="h-5 w-5" />*/}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-medium">
            {
              params.id == 0 ? 'Internship Advisor AI' :
              params.id == 1 ? 'Marketing Analyst AI' :
              params.id == 2 ? 'Legal Consultant AI' :
              params.id == 3 ? 'Human Resource Manager AI' :
              params.id == 4 ? 'Admin AI' :
              params.id == 5 ? 'Teacher' :
              'Chatbot'
            }
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <p>{JSON.stringify(messages)}</p>
          <div className="grid gap-6">
                    {messages.map((m, index) => {
          if (m.role === 'user') {
            // User message
            return (
              <>
                <div key={index} className="flex items-start gap-4 justify-end">
                  <div className="grid gap-1.5 rounded-md bg-primary p-3 text-sm text-primary-foreground">
                    <p>{m.content}</p>
                  </div>
                </div>
              </>
            );
          } else if (m.role === 'assistant') {
            // Chatbot message
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="grid gap-1.5 rounded-md bg-muted p-3 text-sm">
                  {m.content.startsWith('http') ? (
                    <img src={m.content} alt="Generated" />
                  ) : (
                    <p>{m.content}</p>
                  )}
                </div>
              </div>
            );
          }
          return null;
        })}

          </div>
          
        </main>

        {isLoading && (
        <div>
          <Spinner />
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
        )}

        <form onSubmit={promptSubmit}>
          <footer className="sticky bottom-0 z-10 flex h-14 items-center gap-2 border-t bg-background px-4 sm:h-[60px] sm:px-6">
          <button onClick = {handleClick}  type = "button" id = "model-btn">{modelBtn}</button>
            <Input
              type="text"
              placeholder={placeholder}
              value={input}
              className="flex-1 rounded-md border border-input bg-transparent p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              onChange={handleInputChange}
              disabled={isLoading}
            />
  
            {uploadUrl && <img src={uploadUrl} width={80} height={50} alt="Uploaded" />}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 rounded-md border border-input bg-transparent p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              disabled={isLoading}
            />
                

            <Button variant="ghost" size="icon" disabled={isLoading}>
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </footer>
        </form>
      </div>
    </div>
  )
}


function MoveHorizontalIcon(props) {
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
    )
  }
  
  
  function PlusIcon(props) {
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
    )
  }
  
  
  function SearchIcon(props) {
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
    )
  }
  
  
  function SendIcon(props) {
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
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    )
  }
  
  
  function SettingsIcon(props) {
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
    )
  }
  
  
  function XIcon(props) {
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
    )
  }
  