
import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    const chatbotInformation = await req.json()
    
    // Update the chosen chatbot of the user
    
    /**
     * Get the chatbot_id and the role of the default_prompt
     * Compare it to the current chatbot to identify if the current chatbot's role
     * is the default Role, thus possibly changing the default prompt of default role
     *  
     */ 
    const defaultRole = await client.sql`
        SELECT chatbot_id, role
        FROM chatbot
        WHERE default_prompt = true
            AND persona_id = ${chatbotInformation.persona_id}
    `;
    const personaDefaultRole = defaultRole.rows[0];

    const subpersona = !chatbotInformation.isDefaultPrompt;
    if ((personaDefaultRole.role == chatbotInformation.role) && chatbotInformation.isDefaultPrompt) {
        /**
         * Current Chatbot is in Default Role with Default Choice
         * Chanage the previous Default Role into false
         */

        const result2 = await client.sql`
          UPDATE chatbot
            SET default_prompt = false,
                subpersona = true
            WHERE chatbot_id = ${personaDefaultRole.chatbot_id}`;

        if (!result2) {
            return new Response(JSON.stringify({ error: 'Error demoting default chatbot' }));
        }
        const result = await client.sql`
          UPDATE chatbot
            SET role = ${chatbotInformation.role}, 
                task = ${chatbotInformation.task}, 
                svg_icon = ${chatbotInformation.svg_icon},
                sysprompt = ${chatbotInformation.stringifiedSysprompt}::jsonb,
                default_prompt = true,
                subpersona = ${subpersona}
            WHERE chatbot_id = ${chatbotInformation.chatbot_id}`;

        if (!result) {
            return new Response(JSON.stringify({ error: 'Error modifying chatbot' }));
        }
    } else {
        /**
         * Current Chatbot is either in Default Role but not Default Choice, or not Default Role
         */
        const result = await client.sql`
          UPDATE chatbot
            SET role = ${chatbotInformation.role}, 
                task = ${chatbotInformation.task}, 
                svg_icon = ${chatbotInformation.svg_icon},
                sysprompt = ${chatbotInformation.stringifiedSysprompt}::jsonb,
                subpersona = ${subpersona}
            WHERE chatbot_id = ${chatbotInformation.chatbot_id}`;
            
        if (!result) {
            return new Response(JSON.stringify({ error: 'Error modifying default chatbot' }));
        }
    }


    return new Response(JSON.stringify({ error: ''}));
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}