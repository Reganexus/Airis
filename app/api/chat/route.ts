import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);
  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
  });

  return result.toAIStreamResponse();
}