


export async function generatePreviousChat(convo: any[], messageindex: number, gptcontent: string) {

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
  

export async function generateTitle(convo_id: number) {

    /**
     * Generates the title for a chat based on the given conversation ID.
     * @param convo_id - The ID of the conversation.
     * @returns A Promise that resolves to the title of the chat.
     * @throws An error if the network response is not successful.
     */
    
    const response = await fetch('/api/query/query-chat-title', {
        method: 'POST',
        body: JSON.stringify({
            conversation_id: convo_id
        })
    });

    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}