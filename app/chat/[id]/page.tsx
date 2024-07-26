"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToggleButton from "@/components/ui/toggle-button";
import Logo from "@/components/component/logo";
import HeaderAvatar from "@/components/component/header-avatar";
import { useChat } from "ai/react";
import PersonaCard from "@/components/component/persona-card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Assistant } from "next/font/google";
import { Attachment } from '@ai-sdk/ui-utils';
import { formatTextToHTML } from '@/lib/textToHTML';
import Link from "next/link";

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

  if (!res.ok) {

  
    return { 
          response: 'I apologize for the inconvenience, but I am unable to generate the image you are requesting. Can you try again later?'
      };
  
  }
  return res.json()
}

async function generatePreviousChat(convo: any[], messageindex: number, gptcontent: string) {

  const res = await fetch('/api/regenerate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          messages: convo.slice(0, messageindex), 
        }
      )
    }
  )
  
  if (!res.ok) {
    return { 
          response: gptcontent
      };
  
  }
  return res.json()
}

export default function Chat({ params } : any) {
  const persona = [
    'You are Airis, StartUpLab\'s internship advisor with 30 years of experience. You help Filipino students looking for interns prepare for internship applications. You are adept at creating resumes based on the information provided by clients, consulting with clients about their careers, and recommending career paths according to the clients\' skills and interests. Offer detailed answers to questions related to internships, including but not limited to application processes, interview tips, selecting suitable opportunities and preparing necessary documents. Speak in professional but comforting tone and ALWAYS TELL the user IF the topic goes out of your expertise.',
    'You are Airis, StartUpLab\'s marketing analyst with 30 years of experience. You help clients such as business owners understand market trends and consumer behavior. Your task is to offer deep-dive consultations tailored to the client\'s issues, including various analysis documents and progress reports. ALWAYS TELL the user IF the topic goes out of your expertise.',
    'You are Airis, StartUpLab\'s Philippine legal consultant with 30 years of experience. You are an expert on Philippine laws, and you specialize in creating various legal documents necessary to the clients\' needs. Your task is to offer deep-dive consultations tailored to the client\'s issues. They rely on your expertise to ensure compliance with Philippine laws. Ask questions for further information on legal documents when necessary. Speak in professional tone and ALWAYS TELL the user IF the topic goes out of your expertise.  you may access images or files the user uploaded.',
    'You are Airis, StartUpLab\'s Human Resource Manager with 30 years of experience. You specialize in HR policies, employee relations, performance management, talent acquisition, and employee development. Your task is to offer deep-dive consultations and help clients manage their HR needs effectively. Your clients can be business owners, HR managers and employers. Speak in professional tone and ALWAYS TELL the user IF the topic goes out of your expertise.  you may access images or files the user uploaded.',
    'You are Airis, StartUpLab\'s Admin Assistant with 30 years of experience, specializing in administrative management, operations coordination, and support services within the company ONLY. Your task is to offer assistance to StartUpLab\'s managers, admins, and owners on efficient operation and administrative processes. ALWAYS INFORM the user if the topic goes beyond your expertise.  you may access images or files the user uploaded.',
    'You are Airis, StartUpLab\'s mentor for teachers with 30 years of experience in all academic subjects and managing online courses. You help clients, including teachers, authors, and online instructors, with classroom management, curriculum development, student engagement, instructional strategies, and technology integration. You provide comprehensive answers and, if requested, create lesson plans, teaching materials, assessment tools, and progress reports. Speak in a formal and professional tone, and ALWAYS TELL the user IF the topic goes out of your expertise. you may access images or files the user uploaded.'
]; 

    // default ang gpt-4o on the textbox thingy
    const [placeholder, setPlaceholder] = useState('Type your message...');
    const [model, setModel] = useState('gpt-4o-mini');
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




  const { messages, setMessages, input, stop, isLoading, handleInputChange, handleSubmit } = useChat();


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
        },
        {
          id: "",
          role: 'assistant',
          content: ''
        }
      ]);

        fetchDALLE(input).then((res) => {

          setMessages([
            ...messages, 
            {
              id: "",
              role: 'user',
              content: input
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

  function handleGenerate(convo: any[], messageid: number, gptcontent: string) {

    setMessages([
      ...messages.slice(0, messageid),
      {
        id: "",
        role: 'assistant',
        content: 'Generating...'
      },
      ...messages.slice(messageid + 1) 
    ]);
  generatePreviousChat(convo, messageid, gptcontent).then((res) => {

    setMessages([
        ...messages.slice(0, messageid),
        {
          id: "",
          role: 'assistant',
          content: res.response
        },
        ...messages.slice(messageid + 1) 
      ]);
    });

}



  function handleModelChange(){
    if(model == 'gpt-4o-mini'){
      setModel('dall-e-2');
      setPlaceholder('Generate an image...');
    }
    else{
      setModel('gpt-4o-mini');
      setPlaceholder('Type your message...');


    }

    console.log(model);
    console.log()
  }

  const [hoveredMessageIndex, setHoveredMessageIndex] = React.useState<
    number | null
  >(null);


  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex justify-between h-14 items-center gap-4 border-b border-slate-200 bg-background px-4 sm:h-[60px] sm:px-6">
          <Logo />

          <HeaderAvatar />

          <Link href={`/`}>
            <p>back to persona selection</p>
          </Link>        
        </header>

        <main className="relative flex-1 overflow-auto pt-5 bg-slate-100 pb-0">
          <PersonaCard title={
              params.id == 0 ? 'Internship Advisor AI' :
              params.id == 1 ? 'Marketing Analyst AI' :
              params.id == 2 ? 'Legal Consultant AI' :
              params.id == 3 ? 'Human Resource Manager AI' :
              params.id == 4 ? 'Admin AI' :
              params.id == 5 ? 'Teacher' :
              'Chatbot'
            } 
            
            />

          <div className="pt-4 px-2 ps-4 pb-8 grid gap-6 max-w-5xl m-auto">
            {messages.map((m, i) => {
              const isLastMessage: boolean = i === messages.length - 1;

              if (m.role === "user") {
                {
                  /* User message */
                }
                return (
                  <div key={i} className="flex items-start gap-4 justify-end">
                    <div className="grid gap-1.5 rounded-lg bg-primary p-3 px-4">

                      <p className="text-white">{m.content}</p>
                    </div>
                  </div>
                );
              } else {
                {
                  /* Chatbot message */
                }

                const isHovered: boolean = i === hoveredMessageIndex;
                return (
                  <div
                    key={m.id}
                    className="flex items-start gap-1"
                    onMouseEnter={() => setHoveredMessageIndex(i)}
                    onMouseLeave={() => setHoveredMessageIndex(null)}
                  >
                    <div className="pt-4">
                      <div className="h-[40px] w-[40px] rounded-full bg-slate-400 overflow-clip">
                        <Image
                          src="/default_blue.png"
                          alt="default chabot icon"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>

                    <div className="relative grid gap-1.5 p-3 px-4 text-base">
                      <h1 className="font-semibold">Legal Ai</h1>
                      {m.content.startsWith('http') ? (
                          <img src={m.content} alt="Generated" />
                        ) : (
                          <p>{m.content}</p>
                        )}
                      {(isLastMessage || isHovered) && (
                        <div className="absolute z-10 bottom-[-15px] left-4 mt-1 flex gap-2">
                          <Button
                            variant="ghost"
                            size="iconSmall"
                            className="bg-none"
                          >
                            <CopyIcon />
                            <span className="sr-only">More</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="iconSmall"
                            className="bg-none"
                          >
                            <RegenerateIcon />
                            <span className="sr-only">More</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>

          {/* The gradient effect */}
          <div className="sticky bottom-0 h-4 bg-gradient-to-b from-transparent to-slate-100"></div>
        </main>

        <form
          onSubmit={promptSubmit}
          className="pb-[20px] bg-slate-100
        px-5"
        >
          <div className="rounded-lg max-w-5xl m-auto sticky bottom-0 z-10 flex h-14 items-center gap-2 border bg-background px-4 sm:h-[60px] sm:px-3">
            <Input
              type="text"
              placeholder={placeholder}
              value={input}
              className="flex-1 bg-transparent p-2 placeholder:text-base"
              onChange={handleInputChange}
              disabled={isLoading}
            />

          {/* {uploadUrl && <img src={uploadUrl} width={80} height={50} alt="Uploaded" />} */}
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 rounded-md border border-input bg-transparent p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              disabled={isLoading}
            /> */}

            <Button
              variant="default"
              size="icon"
              className="bg-primary order-last"
              disabled={isLoading}
            >
              <SendIcon />
              <span className="sr-only">Send</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="bg-none "
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <PlusIcon />
              <span className="sr-only">More</span>
            </Button>

            <ToggleButton
              iconA={<TextIcon />}
              iconB={<ImageIcon />}
              className="order-first"
              changeModel={handleModelChange}
            />
          </div>
          <p className="text-sm text-center pt-3 text-slate-500">
            This AI chatbot is for informational purposes only and should not be
            considered professional advice.
          </p>
        </form>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="white"
      className="size-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
      />
    </svg>
  );
}

function RegenerateIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

function TextIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="#64748b"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}
