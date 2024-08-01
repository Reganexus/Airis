import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const information = await req.json()
    const result = await sql`SELECT messages FROM conversation WHERE conversation_id = ${information.conversation_id}`;
    const user_id = result.rows[0].messages;
    console.log("Retrive Convo", user_id);
    return new Response(JSON.stringify({ error: '', convo_id: information.conversation_id }));
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}