import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const chatbotquery = await sql`
      SELECT c.chatbot_id, 
            c.persona_id, 
            c.role, 
            c.task, 
            c.subpersona, 
            c.default_prompt, 
            p.persona_id AS persona_id, 
            p.name AS persona_name, 
            p.tagline AS persona_tagline
      FROM chatbot c
      INNER JOIN persona p on p.persona_id = c.persona_id ORDER BY subpersona`;

    const { rows: chatbot } = chatbotquery;
    if (chatbot.length === 0) {
      return new Response(JSON.stringify({ error: 'Chatbot not found', chatbot: null }));
    }
    return new Response(JSON.stringify({ error: '', chatbot: chatbot }));
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}