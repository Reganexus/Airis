import { generatePreviousChat } from "../api/gpt-operations";

export function handleChatRegenerate(
    convo: any[], 
    messageid: number,
    gptcontent: string,
    setIsLoading2: (arg0: boolean) => void,
    setMessages: (arg0: any) => void,
) {
    setIsLoading2(true);
    setMessages([
      ...convo.slice(0, messageid),
      {
        id: "",
        role: "assistant",
        content: "Generating...",
      },
      ...convo.slice(messageid + 1),
    ]);
    generatePreviousChat(convo, messageid, gptcontent).then((res) => {
      setIsLoading2(false);
      setMessages([
        ...convo.slice(0, messageid),
        {
          id: "",
          role: "assistant",
          content: res.response,
        },
        ...convo.slice(messageid + 1),
      ]);
    });
  }