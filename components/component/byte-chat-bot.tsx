
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { generatePreviousChat, generateTitle } from "@/lib/api/gpt-operations";
import { generateDALLE } from "@/lib/api/dall-e-operations";

import { fetchChatbot, fetchSaveConvo, fetchChatHistory, fetchOldChat, fetchChatUID } from "@/lib/db/fetch-queries";



interface ByteChatBotProps {
  historyConversationId?: string;
}

/**
 * Represents the Chat component.
 * @param {Object} params - The id object, telling which persona will be utilized.
 * @returns {JSX.Element} The Chat component.
 */
export function ByteChatBot({ historyConversationId }: ByteChatBotProps) {

  // Router
  const router = useRouter();
  // Access user information from session
  const { data: session, status } = useSession();
  const user = session?.user;
  
  //  consists of the chatbot conversation id
  const [conversationId, setConversationId] =  useState(0);
  // if a chathistory is clicked, this will be saved
  useEffect(() => {
     if (historyConversationId) {

        const numberHistoryConversationId = Number(historyConversationId);
       
        // VALIDATE -  historyConversationId type should be number
        if (isNaN(numberHistoryConversationId)) {
          
          // Redirect to base chat route if invalid ID
            // TO BE REVISED, GO TO CHAT SELECTION INSTEEEEEEED
          router.push('/chat'); 
          return;
        }


        // VALIDATE - User should be logged in, with right account
        if (status === 'unauthenticated') {
          router.push('/chat');
          return;
        }
        
        console.log(status)

        if (status === 'authenticated' && user != undefined) { 
          const validateUser = async () => {
              const data = await fetchChatUID(numberHistoryConversationId, user?.email);
            
              if (data == 'wrong uid') {
                router.push('/chat');
                return;
              }  else {
                setConversationId(numberHistoryConversationId);

                const getOldChat = async () => {
                  try {
                    const data = await fetchOldChat(numberHistoryConversationId);
                    if (data.error != '') {
                      console.log("Cannot find old conversation", data.error);
                      router.push('/chat'); 
                      return
                    }
      
                    // Fetch the Chatbot as well
                    const chatdata = await fetchChatbot();
                    setChosenChatbot(chatdata.chatbot);
      
      
                    console.log("Messages Set")
                    setMessages(data.messages);
                    
                  } catch (error) {
                    console.error("Failed to fetch chatbot data", error);
                  }
                }
                getOldChat()
      
                // Allow the system to save the conversation after the user has  sent a message
                isPromptRendered.current = false; 
              }
          }
          validateUser()
        }
    } else {
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
          promptSubmit({ preventDefault: () => {} });
        } catch (error) {
          console.error("Failed to fetch chatbot data", error);
        }
      };
      
      fetchData();
      return () => {
        mounted.current = false;
      };
    }
  }, [historyConversationId, status]);

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

  const [quality, setQuality] = useState('standard');
  useEffect(() => {
    console.log("QUALITY has been updated to: " + quality);
  }, [quality]); 

  const [imgSize, setImgSize] = useState('256x256');
  useEffect(() => {
    console.log("IMAGE SIZE has been updated to: " + imgSize);
  }, [imgSize]); 

  const [imgStyle, setImgStyle] = useState('natural');
  useEffect(() => {
    console.log("IMAGE STYLE has been updated to: " + imgStyle);
  }, [imgStyle]); 

  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    console.log("IMAGE QUANTITY has been updated to: " + quantity);
  }, [quantity]); 

  const [model, setModel] = useState('gpt-4o-mini');
  useEffect(() => {
    if (model == 'dall-e-2'){
      setImgSize('256x256');
      setQuality('standard');
      setImgStyle('natural');
    }
    else if (model == 'dall-e-3'){
      setImgSize('1024x1024');
    }
    console.log("MODEL has been updated to: " + model);
  }, [model]); 


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
  const { messages, setMessages, input, isLoading, handleInputChange, handleSubmit } = useChat();

  /**
   * Handles the submission event of both chat components (GPT or DALL-E)
   * this is called by the form
   */
  async function promptSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log("MESSAGES: ");
    console.log(messages);
    console.log("INPUT: ");
    console.log(input);
    if (model == 'gpt-4o-mini') {
      /**
       * GPT-4o MODEL
       * Calls the app/api/chat/route.ts to stream text output
       */
      handleSubmit(e);
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

        generateDALLE(model, input, quality, imgSize, imgStyle, quantity).then((res) => {
          setIsLoading2(false);
          console.log("FILE NAMES TO BE SET:");
          console.log(res.filenames);
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
              content: res.response,
              annotations: res.filenames,
            }
          ]);
        });
    }
  }

  /**
   * Should only be triggered when isLoading is changed
   */
  const isFirstRender = useRef(true);
  const isSecondRender = useRef(true);
  const isPromptRendered = useRef(true);

  useEffect(() => {
    // Skip the first and second render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else if (isSecondRender.current) {
      isSecondRender.current = false;
      return;
    }
    
    if (!isLoading && !isLoading2 && status == 'authenticated' && user) {
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
          console.log(data)
          // we need to run GPT to generate title on the new convo only
          if (data.new_convo) {
            console.log("setting")
            setConversationId(data.convo_id);
            const data2 = await generateTitle(data.convo_id);
            console.log(data2)
          }
          
        } catch (error) {
          console.error("Failed to fetch chatbot data", error);
        }
      };

      saveData()
    }
  }, [isLoading, isLoading2]);


  // Getting chat history
  const [chatHistory, setChatHistory] = useState<Array<any>>();

  useEffect(() => {
    if (status === 'authenticated' && user) {
      // a generation has stopped
      const getChatHistory = async () => {
        
          const data = await fetchChatHistory(user?.email);
          console.log("chat history fetched", data);
          setChatHistory(data)
      };

      
      getChatHistory()

    }
      
  }, [status, user]);
  
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
    setQuality('standard');
    setImgSize('256x256');
    setImgStyle('natural');
    setQuantity(1);

    if(model == 'gpt-4o-mini'){
      setModel('dall-e-2');
      
      setPlaceholder('Generate an image...');
    }
    else{
      setModel('gpt-4o-mini');
      console.log('MODEL SET TO: ' + model);
      setPlaceholder('Type your message...');
    }
    //console.log(model);
  }

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
          <PersonaCard persona={"AI"} />

          <div className="pt-4 px-2 ps-4 pb-8 grid gap-6 max-w-5xl m-auto">
            {messages.map((m, i) => {
              console.log("THIS IS THE SHIT: ");
              console.log(m.content);
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
                      <h1 className="font-semibold">{ "AI" }</h1>
                      {
                        Array.isArray(m.content) ? (
                          m.content.map((url, index) => (
                            <img key={index} src={url} alt="Generated" />
                          ))
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: formatTextToHTML(m.content) }} />
                        )
                      }
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

            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value); 
                setQuantity(1);             
              }}
              className="flex-1 bg-transparent p-2 placeholder:text-base"
              disabled={model !== 'dall-e-2' && model !== 'dall-e-3' || isLoading || isLoading2}
            >
              <option value="dall-e-2">DALL-E 2</option>
              <option value="dall-e-3">DALL-E 3</option>
            </select>
            <select
              value={quality}
              onChange={(e) => {
                setQuality(e.target.value)
              }}
              className="flex-1 bg-transparent p-2 placeholder:text-base"
              disabled={model !== 'dall-e-3' || isLoading || isLoading2}
            >
              <option value="standard">Standard</option>
              <option value="hd">HD</option>
            </select>

            <select
              value={imgSize}
              onChange={(e) => setImgSize(e.target.value)}
              className="flex-1 bg-transparent p-2 placeholder:text-base"
              disabled={model !== 'dall-e-2' && model !== 'dall-e-3' || isLoading || isLoading2}
            >
              


                  <option value="256x256"  disabled={model!== 'dall-e-2'}>256x256</option>
                  <option value="512x512"  disabled={model!== 'dall-e-2'}>512x512</option>
                  <option value="1024x1024">1024x1024</option>
                  <option value="1792x1024" disabled={model!== 'dall-e-3'}>1792x1024</option>
                  <option value="1024x1792" disabled={model!== 'dall-e-3'}>1024x1792</option>
   

            </select>

            <select
              value={imgStyle}
              onChange={(e) => setImgStyle(e.target.value)}
              className="flex-1 bg-transparent p-2 placeholder:text-base"
              disabled={model !== 'dall-e-3' || isLoading || isLoading2}
              
            >
              <option value="natural">Natural</option>
              <option value="vivid">Vivid</option>
            </select>

            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex-1 bg-transparent p-2 placeholder:text-base"
              disabled={model !== 'dall-e-2' || isLoading || isLoading2}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-center pt-3 text-slate-500">
            This AI chatbot is for informational purposes only and should not be
            considered professional advice.
          </p>
        </form>
      </div>

      {/* Sidebar */}
      <SideBar chatHistory={chatHistory} />
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
