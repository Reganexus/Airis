import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const information = await req.json()
    const result = await sql`SELECT messages FROM conversation WHERE conversation_id = ${information.conversation_id}`;
    const conversation = result.rows[0].messages;
    console.log("Retrive Convo", conversation);
    return new Response(JSON.stringify({ error: '', messages: conversation }));
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', messages: null }));
  }
}