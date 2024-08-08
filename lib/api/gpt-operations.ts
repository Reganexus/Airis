


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