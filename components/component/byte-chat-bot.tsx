
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToggleButton from "@/components/ui/toggle-button";

import Logo from "@/components/component/logo";
// import HeaderAvatar from "@/components/component/header-avatar";

import { useChat } from "ai/react";
import PersonaCard from "./persona-card";
import { formatTextToHTML } from '@/lib/textToHTML';
import Image from "next/image";
import SideBar from "./side-bar";
import { Persona } from '@/lib/types';
import { Personas } from '@/lib/types';
import { PersonaCode } from '@/lib/types';
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";



async function generatePreviousChat(convo: any[], messageindex: number, gptcontent: string) {

  /**
   * Generates previous chat based on the given conversation, message index, and GPT content.
   * @param convo - The conversation array of the whole message prompts
   * @param messageindex - The index of the message to be re-generated.
   * @param gptcontent - The message content to be re-generated.
   * @returns A Promise that resolves to the re-generated response from the server or the same previous message if the API call is not successful.
   */

  const res = await fetch('/api/regenerate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          // slice the convo array from the top message to the chosen message
          messages: convo.slice(0, messageindex), 
        }
      )
    }
  )
  
  if (!res.ok) {
    // return the previous chat message if the API response is not
    return { 
          response: gptcontent
      };
  
  }
  return res.json()
}

async function generateTitle(convo_id: number) {
  const response = await fetch('/api/query/query-chat-title', {
    method: 'POST',
    body: JSON.stringify({
      conversation_id: convo_id
    })
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  // must return status, convo_id
  const data = await response.json();
  return data
}

async function fetchDALLE(prompt: string) {
  /**
   * Fetches an image using the DALL-E model based on the provided prompt.
   * @param prompt - The prompt for generating the image.
   * @returns A Promise that resolves to the generated image response or an error message.
   */

  const res = await fetch('/api/image',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          model: "dall-e-3",
          user_prompt: prompt,
        }
      )
    }
  )

  if (!res.ok) {

    // return an error message when the image cannot be generated.
    return { 
          response: 'I apologize for the inconvenience, but I am unable to generate the image you are requesting. Can you try again later?'
      };
  
  }

  
  return res.json()
}

async function fetchChatbot() {
  const response = await fetch('/api/query', {
    method: 'POST',
    body: JSON.stringify({
      id: '2'
    })
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log("Data: ", data.chatbot);
  return data
}

async function fetchSaveConvo(message: any[], email: any, chatbot_id: number, convo_id: number) {
  const response = await fetch('/api/query/query-save-convo', {
    method: 'POST',
    body: JSON.stringify({
      conversation_id: convo_id,
      messages: message,
      email: email,
      chatbot_id: chatbot_id
    })
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  // must return status, convo_id
  const data = await response.json();
  return data
}

async function fetchChatHistory(email: any) {
  const response = await fetch('/api/query/query-chat-history', {
    method: 'POST',
    body: JSON.stringify({
      email: email
    })
  });
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  // must return status, convo_id
  const data = await response.json();
  return data
}





/**
 * Represents the Chat component.
 * @param {Object} params - The id object, telling which persona will be utilized.
 * @returns {JSX.Element} The Chat component.
 */
export function ByteChatBot() {

  const { data: session, status } = useSession();
  // Access user information from session
  const user = session?.user;
  
  /**
   * Represents an array of persona descriptions.
   * Each persona description includes the name, role, and expertise of Airis, a fictional character from StartUpLab.
   * Airis is an expert in various fields and provides consultations and assistance to clients.
   * The persona descriptions provide information about Airis's background, skills, and the topics she can help with.
   */

  const personas: Personas = {
    law: {
      persona: 'Law AI',
      prompt: 'You are Airis, StartUpLab\'s Philippine legal consultant with 30 years of experience. You are an expert on Philippine laws, and you specialize in creating various legal documents necessary to the clients\' needs. Your task is to offer deep-dive consultations tailored to the client\'s issues. They rely on your expertise to ensure compliance with Philippine laws. Ask questions for further information on legal documents when necessary. Speak in professional tone and ALWAYS TELL the user IF the topic goes out of your expertise. you may access images or files the user uploaded.'
    },
    marketing: {
      persona: 'Marketing AI',
      prompt: 'You are Airis, StartUpLab\'s marketing analyst with 30 years of experience. You help clients such as business owners understand market trends and consumer behavior. Your task is to offer deep-dive consultations tailored to the client\'s issues, including various analysis documents and progress reports. ALWAYS TELL the user IF the topic goes out of your expertise.'
    },
    hr: {
      persona: 'Human Resources AI',
      prompt: 'You are Airis, StartUpLab\'s Human Resource Manager with 30 years of experience. You specialize in HR policies, employee relations, performance management, talent acquisition, and employee development. Your task is to offer deep-dive consultations and help clients manage their HR needs effectively. Your clients can be business owners, HR managers and employers. Speak in professional tone and ALWAYS TELL the user IF the topic goes out of your expertise. you may access images or files the user uploaded.'
    },
    intern: {
      persona: 'Intern Advisor AI',
      prompt: 'You are Airis, StartUpLab\'s internship advisor with 30 years of experience. You help Filipino students looking for interns prepare for internship applications. You are adept at creating resumes based on the information provided by clients, consulting with clients about their careers, and recommending career paths according to the clients\' skills and interests. Offer detailed answers to questions related to internships, including but not limited to application processes, interview tips, selecting suitable opportunities and preparing necessary documents. Speak in professional but comforting tone and ALWAYS TELL the user IF the topic goes out of your expertise.'
    },
    teacher: {
      persona: 'Teacher AI',
      prompt: 'You are Airis, StartUpLab\'s mentor for teachers with 30 years of experience in all academic subjects and managing online courses. You help clients, including teachers, authors, and online instructors, with classroom management, curriculum development, student engagement, instructional strategies, and technology integration. You provide comprehensive answers and, if requested, create lesson plans, teaching materials, assessment tools, and progress reports. Speak in a formal and professional tone, and ALWAYS TELL the user IF the topic goes out of your expertise. you may access images or files the user uploaded.'
    },
    admin: {
      persona: 'Admin AI',
      prompt: 'You are Airis, StartUpLab\'s Admin Assistant with 30 years of experience, specializing in administrative management, operations coordination, and support services within the company ONLY. Your task is to offer assistance to StartUpLab\'s managers, admins, and owners on efficient operation and administrative processes. ALWAYS INFORM the user if the topic goes beyond your expertise. you may access images or files the user uploaded.'
    }
  };

  // Default
  // chosenChatbot contains:
  /**
   * chatbot_id:
   * created_at:
   * persona_id:
   * role:
   * subpersona:
   * task:
   * sysprompt:
   * 
   * Only sysprompt will be used in the chatbot page, others will be used on selection page 
   */
  // Define a state variable to store the chosen chatbot
  const [chosenChatbot, setChosenChatbot] = useState<any>(null);
  const mounted = useRef(true);
  useEffect(() => {
    if (!mounted.current) return;
    console.log("useEffect called");
    // fetch the chatbot data
    const fetchData = async () => {
      
      console.log("fetchData called");
      try {
        const data = await fetchChatbot();
        setChosenChatbot(data.chatbot);
        const stringify = JSON.stringify(data.chatbot?.sysprompt)
        setMessages([
        {
          id: "firstprompt",
          role: 'user',
          content: stringify
        },
        ]);
        console.log("Data fetched and state set");
        //promptSubmit({ preventDefault: () => {} });
      } catch (error) {
        console.error("Failed to fetch chatbot data", error);
      }
    };
    
    fetchData();
    return () => {
      mounted.current = false;
    };
  }, []);

  const [firstchat, setFirstChat] = useState(true);


  // Initialize state with the default persona
  const [chosenPersona, setChosenPersona] = useState<Persona>(personas['law']);

  /**
   * Represents the loading state of the component.
   * When isLoading2 is true, it indicates that the DALL-E API call or GPT-4o re-generate call is currently loading.
   */
  const [isLoading2, setIsLoading2] = useState(false);


  /**
   * Represents the placeholder text for the input field.
   * The placeholder text is displayed when the input field is empty.
   */
  const [placeholder, setPlaceholder] = useState('Type your message...');

  /**
   * Represents the selected model for generating responses.
   * The model can be either 'gpt-4o-mini' (default) or 'dall-e-2'.
   */
  const [model, setModel] = useState('gpt-4o-mini');

  /**
   * Represents the URL of the uploaded file.
   * The uploadUrl is used to display the uploaded image or file.
   */
  const [uploadUrl, setUploadUrl] = useState("");
  
  

  /**
   * Represents the array of attachments.
   * The attachments array contains the uploaded images.
   */


  /**
   * Handles the change event when an image is selected.
   */
  const handleImageChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadUrl(url);
    }
  };

  /**
   * Represents a useChat hook from ai-sdk
   * - the main backbone for streaming text like ChatGPT
   * @messages    - holds the chat messages, with three roles 'system', 'assistant', and 'user'
   * @setMessages - allows to manually update messages state (important on DALL-E and re-generate previous prompt)
   * @input       - holds the current input value in the chat component
   * @stop        - it stops the chat component from further generating a text. Only works on the general streaming the text, not on DALL-E and re-generating previous prompt
   * @isLoading   - contains the loading state of the chat component, is a boolean
   * @handleInputChange - handles the change event of the input field
   * @handleSubmit      - handles submission event of the chat component (GPT-4o only)
   */
  const { messages, setMessages, input, stop, isLoading, handleInputChange, handleSubmit } = useChat();

  /**
   * Handles the submission event of both chat components (GPT or DALL-E)
   * this is called by the form
   */
  async function promptSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (model == 'gpt-4o-mini') {
      /**
       * GPT-4o MODEL
       * Calls the app/api/chat/route.ts to stream text output
       */
      handleSubmit(e, {
        data: { imageUrl: uploadUrl },
      });
    } else {
      /**
       * DALL-E MODEL
       * Calls the app/api/image/route.ts to generate image output
       * set isLoading2 to true to disable the form while we wait for DALL-E to finish processing 
       * then, manually add the user prompt to messages state, since this is not part of useChat hook
       * fetch DALL-E image url response and manually add it to messages state to display the output on to the UI
       */
      setIsLoading2(true);
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
          setIsLoading2(false);
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
    if (input != '') {
      setFirstChat(false);
    }
  }

  /**
   * Should only be triggered when isLoading is changed
   */
  const isFirstRender = useRef(true);
  const isSecondRender = useRef(true);
  const isPromptRendered = useRef(true);

  // TO BE CHANGED IF THE HISTORY CONVERSATION  IS CLICKED INSTEAD,  
  const [conversationId, setConversationId] =  useState(0);

  useEffect(() => {
    // Skip the first and second render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else if (isSecondRender.current) {
      isSecondRender.current = false;
      return;
    }
    
    if (!isLoading && !isLoading2 && status == 'authenticated') {
      // do not save if when first prompt is being shown 
      
      if (isPromptRendered.current) {
        isPromptRendered.current = false;
        return;
      }
      // a generation has stopped
      const saveData = async () => {
      
        try {
          const data = await fetchSaveConvo(messages, user?.email, chosenChatbot.chatbot_id, conversationId);
          console.log("Conversation Saved");

          // we need to run GPT to generate title on the new convo only
          if (data.new_convo) {
            setConversationId(data.convo_id);
            const data2 = await generateTitle(conversationId);
          }
          
        } catch (error) {
          console.error("Failed to fetch chatbot data", error);
        }
      };

      
      saveData()
      
    }
  }, [isLoading, isLoading2]);

  useEffect(() => {

      // a generation has stopped
      const chatHistory = async () => {
      
        try {
          const data = await fetchChatHistory(user?.email);
          console.log("chat history fetched");

          console.log(data)
          
        } catch (error) {
          console.error("Failed to fetch chatbot data", error);
        }
      };

      
      chatHistory
      
  }, []);
  
  /**
   * Handles the generation of chat messages based on the provided conversation, message ID, and GPT content.
   * 
   * @param convo - The conversation array.
   * @param messageid - The ID of the message to be generated.
   * @param gptcontent - The GPT content to be used for generation.
   */
  function handleGenerate(convo: any[], messageid: number, gptcontent: string) {
    
    setIsLoading2(true);
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
      setIsLoading2(false);
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



  /**
   * Handles the change of the model and updates the placeholder text when toggle button is clicked.
   */
  function handleModelChange(){
    if(model == 'gpt-4o-mini'){
      setModel('dall-e-2');
      setPlaceholder('Generate an image...');
    }
    else{
      setModel('gpt-4o-mini');
      setPlaceholder('Type your message...');
    }
    //console.log(model);
  }

  const handlePersonaChange = (personacode: PersonaCode) => {
    // Add any additional logic to handle persona changes
    console.log("PERSONA: "+ personacode);
    
    setChosenPersona(personas[personacode]);
    setMessages([]);
  };


  /*
   *
   */
  const [hoveredMessageIndex, setHoveredMessageIndex] = React.useState<
    number | null
  >(null);

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex justify-between h-14 items-center gap-4 border-b border-slate-200 bg-background px-4 sm:h-[60px] sm:pl-6 sm:pr-3">
          <Logo />

          <Button variant="ghost" size="icon" className="bg-none">
            <LeftArrow />
            <span className="sr-only">More</span>
          </Button>

          {/* <HeaderAvatar /> */}
        </header>

        <main className="relative flex-1 overflow-auto pt-5 bg-slate-100 pb-0">
          <PersonaCard persona={chosenPersona.persona} />

          <div className="pt-4 px-2 ps-4 pb-8 grid gap-6 max-w-5xl m-auto">
            {messages.map((m, i) => {

              const isLastMessage: boolean = i === messages.length - 1;

              if (m.role === "user" && m.id != 'firstprompt') {
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
              } else if (m.role == 'assistant') {
                {
                  /* Chatbot message */
                }

                const isHovered: boolean = i === hoveredMessageIndex;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-1"
                    onMouseEnter={() => setHoveredMessageIndex(i)}
                    onMouseLeave={() => setHoveredMessageIndex(null)}
                  >
                    { /** AI Logo */}
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
                      <h1 className="font-semibold">{ chosenPersona.persona }</h1>
                      {m.content.startsWith('http') ? (
                        <img src={m.content} alt="Generated" />
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: formatTextToHTML(m.content) }} />
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
                            onClick={() => handleGenerate(messages, i, m.content)}
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
              disabled={isLoading || isLoading2}
            />

            <Button
              variant="default"
              size="icon"
              className="bg-primary order-last"
              disabled={isLoading || isLoading2}
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

      {/* Sidebar */}
      <SideBar onPersonaChange={handlePersonaChange} />
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

function LeftArrow() {
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
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
      />
    </svg>
  );
}
