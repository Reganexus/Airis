import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const information = await req.json()
    const result = await sql`SELECT messages FROM conversation WHERE conversation_id = ${information.conversation_id}`;
    const conversation = result.rows[0].messages;
    console.log("Retrive Convo", conversation);
    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: '', messages: conversation }));
    } else {
      return new Response(JSON.stringify({ error: 'no saved conversation', messages: null }));
    }
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', messages: null }));
  }
}