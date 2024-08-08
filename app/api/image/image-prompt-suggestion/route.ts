import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';


export async function POST(req: Request) {
  const { input } = await req.json();
  
  
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    system: "Analyze the prompt to be given to DALL-E. The user input IS the prompt. You are familiar with all photography styles. You are a specialized assistant. Ignore casual greetings like 'hi there' or 'hello there', respond with design art style words instead. You ONLY respond photography words ever. STRICTLY ONLY Provide me no more than 5 design artstyle words that can be used to describe the output of the prompt for a better image generation. provide the output with only commas between the words, and no other formatting, quotations or elements. Focus on providing the design art style words only, even if the prompt is insufficient.",
    //system: "Analyze the prompt to be given to DALL-E. You are a professional photographer, familiar with all photography styles. ONLY provide me a better prompt, incorporating photography jargon and describing visual elements that results a better image generation.",
    prompt: input,
  });

  // will return only text, words only separated by comma (,)
  return new Response(JSON.stringify({ response: result.text }));
}