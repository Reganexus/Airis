
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const chatbotInformation = await req.json()

    // Insert a new chatbot related to the new persona
    const result = await sql`
      INSERT INTO chatbot (persona_id, frequency, role, subpersona, default_prompt, task, sysprompt)
        VALUES (${chatbotInformation.personaId}, 
                0, 
                ${chatbotInformation.personaDefaultRole}, 
                false, 
                true, 
                ${chatbotInformation.task},
                ${chatbotInformation.stringifiedSysprompt}::jsonb)
        RETURNING chatbot_id`;

    if (!result) {
      return new Response(JSON.stringify({ error: 'Error adding default chatbot' }));
    }
    return new Response(JSON.stringify({ error: ''}));
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}