import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    // Ensure messages are correctly structured
    const coreMessages = convertToCoreMessages(messages);

    // If the data contains an image URL, include it in the messages
    if (data && data.imageUrl) {
      coreMessages.push({
        role: 'user',
        content: `![Uploaded Image](${data.imageUrl})`, // Including the image URL in the message
      });
    }

    console.log(coreMessages);

    // Call the language model with the transformed messages
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: data.persona,
      messages: coreMessages,
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
