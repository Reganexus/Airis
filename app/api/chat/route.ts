import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    console.log(messages);

    // Ensure messages are correctly structured
    const coreMessages = convertToCoreMessages(messages);

    // If the data contains an image URL, include it in the messages
    if (data && data.imageUrl) {
      coreMessages.push({
        role: 'user',
        content: `![Uploaded Image](https://th.bing.com/th/id/R.92fbfefc16ed0223802a847a4b2ebe6b?rik=TrjQEpzOvw%2fQpg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-jjOrjq42cwo%2fUzylPWLyfPI%2fAAAAAAAAA_A%2fFPtuRLYigHM%2fs1600%2fanimais-zebra-345552.jpg&ehk=3PaiDPE5H2qjQK46W6n%2bpL6ChsV5vauF3z%2b6mAxrm0w%3d&risl=&pid=ImgRaw&r=0)`, // Including the image URL in the message
      });
    }

    console.log(data.imageUrl);

    // Call the language model with the transformed messages
    const result = await streamText({
      model: openai('gpt-4o'),
      system: data.persona,
      messages: coreMessages,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}