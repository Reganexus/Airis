import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';


export const maxDuration = 30;	

export async function POST(req: Request) {

  const { messages, data } = await req.json();	


  console.log("MESSAGE KURURING: ");
  console.log(data.textInput);	
  // console.log("DATA image64:");
  // console.log(data.image64);

  if(data.image64 != ""){
    console.log("DATA IS SUBMITTED");
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      maxTokens: 4096,
      messages: [ // GPT-4 with Vision is JUST GPT-4. So you can still talk with it like GPT-4
        // There is no "system" message (THIS MAY CHANGE)
        {
          role: "user",
          content: [
            { type: "text", text: (data.textInput == "") ? "What's in this image?" : data.textInput },
            {
              type: "image", // Use the correct type as per your API's schema
              image: data.image64 // base64 images
            },
            {
              type: "image", // Use the correct type as per your API's schema
              image: data.image64 // base64 images
            },
          ],
          
        }
      ],
    });
    return result.toAIStreamResponse();	

  }
  else{
    console.log("IMAGE IS NOT SUBMITTED");
    const result = await streamText({	
      model: openai('gpt-4o-mini'),	
      maxTokens: 4096,
      messages,	
    });	
    return result.toAIStreamResponse();	

  }


  // return result.toAIStreamResponse();	
}

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     const { messages, data } = await req.json();
//     console.log(data.file);
//     // Ensure messages are correctly structured
//     const coreMessages = convertToCoreMessages(messages);

//     // Convert arrays in message.content to strings
//     coreMessages.forEach((message) => {
//       if (Array.isArray(message.content)) {
//         message.content = message.content.join(' ');
//         console.log("Converted array to string:", message.content);
//       }
//     });

//     // Include image URL in messages if provided
//     if (data?.imageUrl) {
//       console.log("IMAGE IS UPLOADED!");
//       coreMessages.push({
//         role: 'user',
//         content: `![Uploaded Image](${data.imageUrl})`, // Using the actual image URL from data
//       });
//     }

//     // Call the language model with the transformed messages
//     const result = await streamText({
//       model: openai('gpt-4o-mini'),
//       system: "analyze the image sent to you.",
//       messages: coreMessages,
//     });

//     return result.toAIStreamResponse();
//   } catch (error) {
//     console.error('Error processing request:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }



