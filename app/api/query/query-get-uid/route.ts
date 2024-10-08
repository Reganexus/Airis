import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    // must take user email and conversation_id
    const information = await req.json()
    const result = await client.sql`
      SELECT u1.user_id AS user_id1
      FROM users u1
      JOIN conversation c ON u1.user_id = c.user_id
      WHERE u1.email = ${information.email} AND c.conversation_id = ${information.conversation_id}
    `;
    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: '' }));
    } else {
      return new Response(JSON.stringify({ error: 'wrong uid' }));
    }
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error querying user_id', messages: null }));
  }
}