
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const chatbotInformation = await req.json()
    
    // Update the default chatbot of a specific persona
    const result = await sql`
      UPDATE chatbot
        SET role = ${chatbotInformation.personaDefaultRole}, 
            task = ${chatbotInformation.task}, 
            sysprompt = ${chatbotInformation.stringifiedSysprompt}::jsonb
        WHERE persona_id = ${chatbotInformation.personaId} 
        AND default_prompt = true`;


    if (!result) {
      return new Response(JSON.stringify({ error: 'Error modifying default chatbot' }));
    }
    return new Response(JSON.stringify({ error: ''}));
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}