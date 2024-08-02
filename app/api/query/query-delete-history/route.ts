import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    //  get the email 
    const information = await req.json()
    const resultemail = await sql`SELECT user_id FROM users WHERE email = ${information.email}`;
    const user_id = resultemail.rows[0].user_id;
    if (user_id) {
        const result = await sql`DELETE FROM conversation WHERE user_id = ${user_id}`;
    }
    return new Response(JSON.stringify({ error: '' }));
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error deleting history'}));
  }
}