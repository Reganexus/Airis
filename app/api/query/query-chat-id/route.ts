import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    
    // must take user email and conversation_id
    const information = await req.json()
    const result = await client.sql`SELECT * FROM conversation WHERE conversation_id = ${information.convo_id}`;
    
    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: '' }));
    } else {
      return new Response(JSON.stringify({ error: 'no saved conversation' }));
    }
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error querying user_id', messages: null }));
  }
}