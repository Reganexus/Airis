
import { db, sql } from '@vercel/postgres';

export async function POST(req: Request) {
  const client = await db.connect();
  try {
    const chatbotInformation = await req.json()

    // Insert a new chatbot related to the new persona

    /**
     * Get the chatbot_id and the role of the default_prompt
     * Compare it to the current chatbot to identify if the current chatbot's role
     * is the default Role, thus possibly changing the default prompt of default role
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
      // New Chatbot is in Default Role with Default Choice
      // Update the current default chatbot to non-default
      const result2 = await client.sql`
        UPDATE chatbot
        SET default_prompt = false,
            subpersona = true
        WHERE chatbot_id = ${personaDefaultRole.chatbot_id}
      `;
        
      if (!result2.rowCount) {
        return new Response(JSON.stringify({ error: 'Error demoting previous default chatbot' }), { status: 500 });
      }

      // Insert the new default chatbot
      const result = await client.sql`
        INSERT INTO chatbot (persona_id, frequency, role, subpersona, default_prompt, svg_icon, task, sysprompt)
        VALUES (${chatbotInformation.persona_id},
                0,
                ${chatbotInformation.role},
                ${subpersona},
                true,
                ${chatbotInformation.svg_icon},
                ${chatbotInformation.task},
                ${chatbotInformation.stringifiedSysprompt}::jsonb)
        RETURNING chatbot_id
      `;

      if (!result.rowCount) {
        return new Response(JSON.stringify({ error: 'Error adding new chatbot' }), { status: 500 });
      }
    } else {
      // New Chatbot is either in Default Role but not Default Choice, or not Default Role
      const result = await client.sql`
      INSERT INTO chatbot (persona_id, frequency, role, subpersona, default_prompt, svg_icon, task, sysprompt)
      VALUES (${chatbotInformation.persona_id}, 
              0, 
              ${chatbotInformation.role}, 
              ${subpersona}, 
              false, 
              ${chatbotInformation.svg_icon},
              ${chatbotInformation.task},
              ${chatbotInformation.stringifiedSysprompt}::jsonb)
      RETURNING chatbot_id`;
  
      if (!result) {
        return new Response(JSON.stringify({ error: 'Error adding default chatbot' }));
      }
    }

    return new Response(JSON.stringify({ error: ''}));
  } catch (error) {
    console.error('Error fetching chatbot:', error);
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', chatbot: null }));
  }
}