import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    const chosenChatbot = await req.json()
    const chatbotquery = await client.sql`SELECT * FROM chatbot WHERE chatbot_id = ${chosenChatbot.id}`;
    const { rows: chatbot } = chatbotquery;
    if (chatbot.length === 0) {
      return new Response(JSON.stringify({ error: 'Chatbot not found', chatbot: null }));
    }
    return new Response(JSON.stringify({ error: '', chatbot: chatbot[0] }));
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}