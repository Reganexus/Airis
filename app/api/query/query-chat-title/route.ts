import { sql } from '@vercel/postgres';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
export async function POST(req: Request) {
  try {
    const information = await req.json()
    const retrieveMessages = await sql`SELECT messages FROM conversation WHERE conversation_id = ${information.conversation_id}`;
    const { rows: chatbot } = retrieveMessages;
    chatbot[0].messages.shift();

    // Generate on GPT
    const result = await generateText({
        model: openai('gpt-4o-mini'),
        system: "Analyze the provided conversation and generate a concise title, no more than 5 words, that accurately reflects the main topic or outcome of the discussion. STRICTLY GENERATE TEXT ONLY.",
        messages: chatbot[0].messages,
    });
    
    console.log("Generated Title", result.text);
        
    // Save the Title generated
    const updateTitle = await sql`UPDATE conversation SET title = ${result.text}  WHERE conversation_id = ${information.conversation_id}`;

    if (chatbot.length === 0) {
        return new Response(JSON.stringify({ error: 'Convo not found', chatbot: null }));
    }

    return new Response(JSON.stringify({ error: '' }));
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error setting title' }));
  }
}