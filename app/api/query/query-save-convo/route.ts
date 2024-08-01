import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const information = await req.json()
    const result = await sql`SELECT user_id FROM users WHERE email = ${information.email}`;
    const user_id = result.rows[0].user_id;

    if (information.conversation_id == 0) {
        // this means the convo is new
        const result2 = await sql`INSERT INTO conversation (user_id, chatbot_id, messages) VALUES (${user_id}, ${information.chatbot_id}, ${information.messages[0]}::jsonb) RETURNING conversation_id`;
        const conversation_id = result2.rows[0].conversation_id;

        if (result2) {
            console.log("Query executed successfully");
            console.log("Conversation ID:", conversation_id);
        } else {
            console.log("Query execution failed");
        }
        return new Response(JSON.stringify({ error: '', convo_id: conversation_id, new_convo: true }));
    } else {
        // conversation is old

        //  stringify the messages to include all messages on updating it
        const messageStringify = JSON.stringify(information.messages[0])

        const result2 = await sql`UPDATE conversation SET messages = ${messageStringify}::jsonb, chatbot_id = ${information.chatbot_id} WHERE conversation_id = ${information.conversation_id}`;

        if (result2) {
            // Code to execute if the query was successful
            console.log("Update executed successfully");
        } else {
            // Code to execute if the query failed
            console.log("Update execution failed");
        }
        return new Response(JSON.stringify({ error: '', convo_id: information.conversation_id, new_convo: false }));
    }
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}