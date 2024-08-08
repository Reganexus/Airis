export async function generateDALLE(model: string, prompt: string, quality: string, size: string, style: string, quantity: number) {
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
            model: model,
            user_prompt: prompt,
            quality: quality,
            size: size, 
            style: style,
            quantity: quantity,
          }
        )
      }
    )
  
    const data = await res.json();
    console.log("FETCH DALL-E RESPONSE: ");
    console.log("THE WHOLE DATA: ", data);
    console.log(data.filenames);
    console.log(data.response);
  
    if (!res.ok) {
      
      // return an error message when the image cannot be generated.
      return { 
            response: 'I apologize for the inconvenience, but I am unable to generate the image you are requesting. Can you try again later?'
        };
    
    }
    return data
  }