"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ToggleButton from "@/components/ui/toggle-button";
import "@/app/main/persona-selection-scrollbar.css";

// import Logo from "@/components/component/logo";
// import HeaderAvatar from "@/components/component/header-avatar";

import SideBar from "@/app/main/side-bar";
import PersonaChatHistory from "@/app/chat/persona-chat-history";

import { useChat } from "ai/react";
import PersonaCard from "./persona-card";
import { formatTextToHTML } from "@/lib/textToHTML";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generatePreviousChat, generateTitle } from "@/lib/api/gpt-operations";
import { generateDALLE } from "@/lib/api/dall-e-operations";

import { fetchChatbot, fetchSaveConvo, fetchChatHistory, fetchOldChat, fetchChatUID } from "@/lib/db/fetch-queries";
import { fetchAndSetChatHistory } from "@/lib/chat/handle-chat-history";
import { handleChatRegenerate } from "@/lib/chat/handle-chat-submit";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";


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

  //  consists of the chatbot conversation id
  const [conversationId, setConversationId] = useState(0);

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
  const [chosenChatbot, setChosenChatbot] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState<Array<any>>();

  const mounted = useRef(true);
  const isFirstRender = useRef(true);
  const isSecondRender = useRef(true);
  const isPromptRendered = useRef(true);
  
  const aiName = sessionStorage.getItem('aiName');
  const aiDescription = sessionStorage.getItem('aiDescription');
  
  const [uploadUrl, setUploadUrl] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [image, setImage] = useState<string>("");
  const [displayImage, setDisplayImage] = useState<string>("");
  useEffect(() => {
    // Clean up the URL object when the component unmounts or when the image changes
    return () => {
      if (displayImage) {
        URL.revokeObjectURL(displayImage);
      }
    };
  }, [displayImage]);
  
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files == null || event.target.files.length === 0) {
      // Reset the image state if no file is selected or the dialog is closed
      setImage("");
      setDisplayImage("");
      return;
    }
    const file = event.target.files[0];
    console.log("FILE: ");
    console.log(file);
    const url = URL.createObjectURL(file);
    setDisplayImage(url);
    //convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result == "string") {
        console.log(reader.result);
        setImage(reader.result);
      }
    }

    reader.onerror = (error) => {
      console.log("error: " + error);
    }
  }


  /**
   * Represents the loading state of the component.
   * When isLoading2 is true, it indicates that the DALL-E API call or GPT-4o re-generate call is currently loading.
   */
  const [isLoading2, setIsLoading2] = useState(false);

  /**
   * Represents the placeholder text for the input field.
   * The placeholder text is displayed when the input field is empty.
   */
  const [placeholder, setPlaceholder] = useState("Type your message...");
  /**
   * Represents the selected model for generating responses.
   * The model can be either 'gpt-4o-mini' (default) or 'dall-e-2'.
  */
  const [quality, setQuality] = useState('standard');
  const [imgSize, setImgSize] = useState('256x256');
  const [imgStyle, setImgStyle] = useState('natural');
  const [quantity, setQuantity] = useState(1);

  const [model, setModel] = useState('gpt-4o-mini');




  useEffect(() => {
    if (model == 'dall-e-2') {
      setImgSize('256x256');
      setQuality('standard');
      setImgStyle('natural');
    }
    else if (model == 'dall-e-3') {
      setImgSize('1024x1024');
    }
    console.log("MODEL has been updated to: " + model);
  }, [model]);

  // if a chathistory is clicked, this will be saved

  // we will get a chatbot  
  const [chatbotId, setChatbotId] = useState<string | null>(null);
  const [personaId, setPersonaId] = useState<string | null>(null);
  useEffect(() => {
    // Retrieve values from sessionStorage
    const chatbot_id = sessionStorage.getItem('chatbot_id');
    const persona_id = sessionStorage.getItem('persona_id');
    setChatbotId(chatbot_id);
    setPersonaId(persona_id);
  }, []);



  useEffect(() => {
    if (historyConversationId) {

      const numberHistoryConversationId = Number(historyConversationId);

      // VALIDATE -  historyConversationId type should be number
      if (isNaN(numberHistoryConversationId)) {

        // Redirect to base chat route if invalid ID
        // TO BE REVISED, GO TO CHAT SELECTION INSTEEEEEEED
        router.push('/');
        return;
      }

      // VALIDATE - User should be logged in, with right account
      if (status === 'unauthenticated') {
        router.push('/');
        return;
      }

      console.log(status)

      if (status === 'authenticated' && user != undefined) {
        const validateUser = async () => {
          const data = await fetchChatUID(numberHistoryConversationId, user?.email);

          if (data == 'wrong uid') {
            router.push('/');
            return;
          } else {
            setConversationId(numberHistoryConversationId);

            const getOldChat = async () => {
              try {
                const data = await fetchOldChat(numberHistoryConversationId);
                if (data.error != '') {
                  console.log("Cannot find old conversation", data.error);
                  router.push('/');
                  return
                }
                console.log("Here is the fetched chatbot id of the chosen chat history,", data.chatbot_id)
                // Fetch the Chatbot as well
                const chatdata = await fetchChatbot(data.chatbot_id);
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
      if (chatbotId) {
        // fetch the chatbot data
        const fetchData = async (chatbotId: string | null) => {
          console.log("Chatbot ID", chatbotId)
          console.log("fetchData called");
          try {
            const data = await fetchChatbot(chatbotId);
            setChosenChatbot(data.chatbot);
            const stringify = JSON.stringify(data.chatbot?.sysprompt)
            setMessages([
              {
                id: "firstprompt",
                role: 'user',
                content: stringify
              },
            ]);
            promptSubmit({
              preventDefault: () => { },
              target: undefined
            });
          } catch (error) {
            console.error("Failed to fetch chatbot data", error);
          }
        };
        fetchData(chatbotId);
        return () => {
          mounted.current = false;
        };
      }
    }
  }, [chatbotId, historyConversationId, status]);

  // useEffect(() => {
  //   // if a chathistory is clicked, this will be saved
  //   handleChatHistory(
  //     historyConversationId,
  //     status,
  //     user,
  //     router,
  //     mounted
  //   ).then(
  //     (result) => {
  //       if (result?.status == 'newchat') {
  //         // New Chat
  //         setChosenChatbot(result?.chatbot);
  //         promptSubmit({ preventDefault: () => {} });

  //       } else {  
  //         // Old Chat
  //         setConversationId(result?.convo_id ?? 0);
  //         setChosenChatbot(result?.chatbot);
  //         setMessages(result?.chat);
  //       }
  //       console.log("Resltttttttttttttttttt", chosenChatbot)
  //     }
  //   );
  // }, [historyConversationId, status]);


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
        const data = await fetchSaveConvo(messages, user?.email, chosenChatbot.chatbot_id, conversationId);
        // we need to run GPT to generate title on the new convo only
        if (data.new_convo) {
          setConversationId(data.convo_id);
          await generateTitle(data.convo_id);
        }
      };


      saveData()
    }
  }, [isLoading, isLoading2]);

  /**
   * Handles the submission event of both chat components (GPT or DALL-E)
   * this is called by the form
   */
  async function promptSubmit(e: {
    target: any; preventDefault: () => void
  }) {

    e.preventDefault();
    // let newBlob = {'url': ""};
    if (model == 'gpt-4o-mini') {


      // if (!inputFileRef.current?.files) {
      //   throw new Error('No file selected');
      // }
      // else{
      //   const file = inputFileRef.current.files[0];
      //   console.log("FILE:");
      //   console.log(file);
      //   if(file){
      //       newBlob = await upload(file.name, file, {
      //       access: 'public',
      //       handleUploadUrl: '/api/avatar/upload',
      //     });
      //     setBlob(newBlob);
      //     console.log(newBlob);

      //   }
      // }

      handleSubmit(e, {
        data: { image64: image, textInput: input },
      });
    }
    else {
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
          role: "user",
          content: input,
        },
        {
          id: "",
          role: "assistant",
          content: "",
        },
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
   * Handles the change of the model and updates the placeholder text when toggle button is clicked.
   */
  function handleModelChange() {
    setQuality('standard');
    setImgSize('256x256');
    setImgStyle('natural');
    setQuantity(1);

    if (model == 'gpt-4o-mini') {
      setModel('dall-e-2');

      setPlaceholder('Generate an image...');
    }
    else {
      setModel('gpt-4o-mini');
      console.log('MODEL SET TO: ' + model);
      setPlaceholder('Type your message...');
    }


    setIsImageModel((i) => !i);
  }

  const [hoveredMessageIndex, setHoveredMessageIndex] = React.useState<
    number | null
  >(null);

  const [isHistoryOpen, setIsHistoryOpen] = React.useState<boolean>(true);
  const [isImageModel, setIsImageModel] = React.useState<boolean>(false);






  // JSX ELEMENT:
  return (
    <div className="flex h-screen w-full">
      <SideBar />

      {isHistoryOpen && <PersonaChatHistory />}

      {/* Main Content */}
      <div className="flex flex-1 flex-col h-screen">
        <main className="relative overflow-auto pt-5 bg-slate-100 pb-0 h-full">
          <PersonaCard
            persona={"ai"}
            setIsOpenHistory={setIsHistoryOpen}
          />

          <div className="pt-4 px-2 ps-4 pb-8 grid gap-6 max-w-5xl m-auto">
            {messages.map((m, i) => {

              const isLastMessage: boolean = i === messages.length - 1;

              if (m.role === "user" && m.id != 'firstprompt') {
                {
                  /* User message */
                }
                return (


                  <>
                    {displayImage != "" && <div key={i} className="flex items-start gap-4 justify-end">
                      <div className="grid gap-1.5 rounded-lg bg-primary p-3 px-4">
                        <img src={displayImage}
                          alt="Uploaded preview"
                          style={{ marginTop: '20px', maxWidth: '200px', height: 'auto' }} />
                      </div>
                    </div>}
                    <div key={i} className="flex items-start gap-4 justify-end">
                      <div className="grid gap-1.5 rounded-lg bg-primary p-3 px-4">
                        <p className="text-white">{m.content}</p>
                      </div>
                    </div>
                  </>

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
                    {/** AI Logo */}
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
                      <h1 className="font-semibold">{aiName}</h1>
                      {
                          // If Output is image,
                          //  output of ai is url but will be converted into array immediately
                            Array.isArray(m.content) ? (
                            m.content.map((url, index) => (
                              <>
                              <p>Here is your image:</p>
                              <img key={index} src={url} alt="Generated" />
                              </>
                            ))
                          ) : (
                          // gpt outputs Text instead
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
                            onClick={() =>
                              handleChatRegenerate(messages, i, m.content, setIsLoading2, setMessages)
                            }
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

        {/* INPUT */}
        <form
          onSubmit={promptSubmit}
          className="pb-[20px] bg-slate-100 px-5 max-h-96 flex-1"
        >
          <div
            className={
              !isImageModel
                ? `rounded-lg max-w-5xl m-auto z-10 flex items-start gap-2 border bg-white px-4 h-auto sm:px-3 p-2`
                : `rounded-lg max-w-5xl m-auto z-10 flex gap-2 border bg-white px-4 h-auto sm:px-3 p-2`
            }
          >
            <div
              className={
                !isImageModel
                  ? `w-full flex items-start justify-between`
                  : `w-full flex flex-col h-auto gap-1 border rounded-md p-2`
              }
            >
              {/* Text Prompt input */}
              <Input
                placeholder={placeholder}
                value={input}
                className={
                  !isImageModel
                    ? `bg-transparent placeholder:text-base p-2 px-4 persona-selection-scrollbar h-auto` //text mode
                    : `bg-transparent px-1 pt-1 placeholder:text-base h-full persona-selection-scrollbar` //image mode
                }
                onChange={handleInputChange}
                disabled={isLoading || isLoading2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input) {
                    e.preventDefault(); // Prevents default form submission
                    promptSubmit(e); // Triggers form submission
                  }
                }}

              />

              <input name="file"
                type="file"
                onChange={handleImageChange}
              />

              {/* <input type="file" id="fileUpload" name="fileUpload" /> */}

              {/* Hide these buttons if Image mode */}
              {!isImageModel && (
                <>
                  <Button
                    variant="default"
                    size="icon"
                    className="bg-primary order-last p-3"
                    disabled={isLoading || isLoading2 || !input}
                  >
                    <SendIcon />
                    <span className="sr-only">Send</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-none p-2 mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <PlusIcon />
                    <span className="sr-only">More</span>
                  </Button>
                </>
              )}

              {/* Toggle between text and image generation */}
              <ToggleButton
                iconA={<TextIcon />}
                iconB={<ImageIcon />}
                className="order-first self-start"
                changeModel={handleModelChange}
              />

              {/* Suggestion Chips */}
              {isImageModel && <SuggestionChips />}
            </div>

            {/* Image model setting */}
            {isImageModel && (
              <div className="min-w-80 border rounded-lg h-auto flex flex-col p-3 gap-2">
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-700" htmlFor="">
                    Model
                  </label>

                  {/* Dropdown for model selection */}
                  <select
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setQuantity(1);
                    }}
                    className="text-sm text-slate-600 py-1 px-2 border rounded-md bg-slate-50"
                    disabled={model !== 'dall-e-2' && model !== 'dall-e-3' || isLoading || isLoading2}
                  >
                    <option value="dall-e-2">DALL-E 2</option>
                    <option value="dall-e-3">DALL-E 3</option>
                  </select>
                </div>

                {/* Dropdown for image quality selection */}
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-700" htmlFor="">
                    Quality{" "}
                    <sup className="font-normal text-slate-600">DALL-E3</sup>
                  </label>
                  <select
                    value={quality}
                    onChange={(e) => {
                      setQuality(e.target.value)
                    }}
                    className="text-sm text-slate-600 py-1 px-2 border rounded-md bg-slate-50"
                    disabled={model !== 'dall-e-3' || isLoading || isLoading2}
                  >
                    <option value="standard">Standard</option>
                    <option value="hd">HD</option>
                  </select>
                </div>

                {/* Dropdown for image size selection */}
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-700" htmlFor="">
                    Size
                  </label>

                  <select
                    value={imgSize}
                    onChange={(e) => setImgSize(e.target.value)}
                    className="text-sm text-slate-600 py-1 px-2 border rounded-md bg-slate-50"
                    disabled={model !== 'dall-e-2' && model !== 'dall-e-3' || isLoading || isLoading2}
                  >
                    <option value="256x256" disabled={model !== 'dall-e-2'}>256x256</option>
                    <option value="512x512" disabled={model !== 'dall-e-2'}>512x512</option>
                    <option value="1024x1024">1024x1024</option>
                    <option value="1792x1024" disabled={model !== 'dall-e-3'}>1792x1024</option>
                    <option value="1024x1792" disabled={model !== 'dall-e-3'}>1024x1792</option>
                  </select>
                </div>

                {/* Dropdown for image style selection */}
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-700" htmlFor="">
                    Style{" "}
                    <sup className="font-normal text-slate-600">DALL-E3</sup>
                  </label>

                  <select
                    value={imgStyle}
                    onChange={(e) => setImgStyle(e.target.value)}
                    className="text-sm text-slate-600 py-1 px-2 border rounded-md bg-slate-50"
                    disabled={model !== 'dall-e-3' || isLoading || isLoading2}
                  >
                    <option value="natural">Natural</option>
                    <option value="vivid">Vivid</option>
                  </select>
                </div>

                {/* Dropdown for image quantity selection */}
                <div className="flex justify-between items-center">
                  <label className="font-semibold text-slate-700" htmlFor="">
                    Quantity{" "}
                    <sup className="font-normal text-slate-600">DALL-E2</sup>
                  </label>

                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="text-sm text-slate-600 py-1 px-2 border rounded-md bg-slate-50"
                    disabled={model !== 'dall-e-2' || isLoading || isLoading2}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="py-2 bg-primary text-white rounded-lg mt-2">
                  Generate
                </button>
              </div>
            )}
            {/**/}
          </div>

          <p className="text-sm text-center pt-3 text-slate-500">
            This AI chatbot is for informational purposes only and should not be
            considered professional advice.
          </p>
        </form>
      </div>

      {/* Previus Sidebar commented out by ken */}
      {/* <SideBar onPersonaChange={handlePersonaChange} /> */}
      {/* <SideBar chatHistory={chatHistory} /> */}
    </div>
  );
}

const dummySuggestions = [
  { suggestion: "photo" },
  { suggestion: "illustration" },
  { suggestion: "3d render" },
  { suggestion: "typography" },
];

const SuggestionChips = ({ suggestions = dummySuggestions }) => {
  return (
    <div className="w-full mt-auto flex gap-1">
      {suggestions.map((s) => (
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          key={s.suggestion}
          className="bg-slate-50 border rounded-sm py-1 px-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-600"
        >
          {s.suggestion}
        </button>
      ))}

      {/* More button? */}
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className="bg-slate-50 border rounded-sm py-1 px-2 text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-600"
      >
        ...
      </button>
    </div>
  );
};

// ICONS
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
