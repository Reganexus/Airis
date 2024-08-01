import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    // must take user email and conversation_id
    const information = await req.json()
    const result = await sql`
      SELECT u1.user_id AS user_id1, u2.user_id AS user_id2
      FROM users u1
      JOIN conversation c ON u1.user_id = c.user_id
      JOIN users u2 ON c.conversation_id = u2.conversation_id
      WHERE u1.email = ${information.email} AND c.conversation_id = ${information.conversation_id}
    `;
    
    if (result.rows.length > 0 && result.rows[0].user_id1 === result.rows[0].user_id2) {
      return new Response(JSON.stringify({ error: '' }));
    } else {
      return new Response(JSON.stringify({ error: 'wrong uid' }));
    }
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error querying user_id', messages: null }));
  }
}