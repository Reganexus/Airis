import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    // must take chatbot_id
    const information = await req.json()
    const result = await client.sql`
        UPDATE chatbot 
        SET frequency = frequency + 1 
        WHERE chatbot_id = ${information.chatbot_id}`;
    console.log("Frequency updated");
  } catch (error) {
    console.log("Error saving frequency.");
  }
  return new Response(JSON.stringify({ error: '' }));
}