import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    //  get the email 
    const client = await db.connect();
    const information = await req.json()
    const resultemail = await client.sql`SELECT user_id FROM users WHERE email = ${information.email}`;
    const user_id = resultemail.rows[0].user_id;
    const result = await client.sql`SELECT conversation_id, user_id, chatbot_id, title, created_at FROM conversation WHERE user_id = ${user_id} ORDER BY conversation_id DESC`;

    return new Response(JSON.stringify({ error: '', chat_history: result.rows }));
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error fetching chat history', chat_history: null }));
  }
}