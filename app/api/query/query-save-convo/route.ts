import { db, sql } from '@vercel/postgres';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    const information = await req.json()
    const result = await client.sql`SELECT user_id FROM users WHERE email = ${information.email}`;
    const user_id = result.rows[0].user_id;

    if (information.conversation_id == 0) {
        /**
         * Conversation is new
         * Must create a title first (by calling gpt-4o-mini) 
         *  before inserting the recorded conversation in the database
         */

        const messageStringify = JSON.stringify(information.messages);
        /**
         * Do not use the system prompt on generating the title, start with the Airis first message
         */
        information.messages.shift();

        const title = await generateText({
          model: openai('gpt-4o-mini'),
          system: "Analyze the provided conversation and generate a concise title, no more than 5 words, that accurately reflects the main topic or outcome of the discussion. STRICTLY GENERATE TEXT ONLY.",
          messages: information.messages,
        });
        
        if (title) {
          const result2 = await client.sql`INSERT INTO conversation (user_id, chatbot_id, title, messages) VALUES (${user_id}, ${information.chatbot_id}, ${title.text}, ${messageStringify}::jsonb) RETURNING conversation_id`;
          const conversation_id = result2.rows[0].conversation_id;
          if (result2) {
              console.log("Query executed successfully");

          } else {
              console.log("Query execution failed");
          }
          return new Response(JSON.stringify({ error: '', convo_id: conversation_id, new_convo: true }));
        }
        
    } else {
        /**
         * Conversation is Old
         * Must only update the messages on the DB
         * stringify the messages to include all messages on updating it
         */
        const messageStringify = JSON.stringify(information.messages)

        const result2 = await client.sql`UPDATE conversation SET messages = ${messageStringify}::jsonb WHERE conversation_id = ${information.conversation_id}`;

        if (result2) {
            console.log("Update executed successfully");
        } else {
            console.log("Update execution failed");
        }
        return new Response(JSON.stringify({ error: '', convo_id: information.conversation_id, new_convo: false }));
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error saving conversation', chatbot: null }));
  }
}