

/**
 * 
 * Add/Modify a Persona variables:
 *  - personaName
 *  - personaIcon
 *  - personaBg
 *  - personaDefaultRole
 *  - personaDepartment
 *  - personaDescription
 *  - personaFirstMessage
 *  - personaPrompt
 *  - personaRules[]
 * 
 * 
 * Persona table on Database:
 *  - persona_id    : PK
 *  - name          : personaName
 *  - department    : personaDepartment
 *  - tagline       : personaDescription
 *  - created_at    : 
 *  - logo_name     : personaIcon
 *  - bgimage_name  : personaBg
 *  - persona_link  : func personaName toLowercase; change " " to  "-"; add "-agent"          
 * 
 * 
 * Chatbot table on Database
 * !!!We will also put the default prompt of that Persona in the Database
 *  - chatbot_id    : PK
 *  - persona_id    : Persona.persona_id
 *  - frequency     : 0
 *  - role          : personaDefaultRole
 *  - subpersona    : false
 *  - default_prompt: true
 *  - task          : "Talk to a " + personaDefaultRole
 *  - sysprompt     : personaJSONPrompt, stringify then ::jsonb
 *  - created_at    : 
 * 
 * 
 * 
 * STRUCTURE OF THE personaJSONPrompt (in JSON)

{
    "prompt": ${personaPrompt},
    "parameters": {
      "role": ${personaDefaultRole},
      "field": ${personaDepartment},
      "experienceLevel": "30 Years",
    },
    "steps": {
      "1": ${personaFirstMessage},
      "2": "Listen actively and ask probing questions to thoroughly understand the user's issue. This might require multiple questions and answers.",
      "3": "Take a Deep Breath. Think Step by Step. Draw from your unique wisdom and lessons from your years of experience in marketing.",
      "4": "Before attempting to solve any problems, pause and analyze the perspective of the user and common stakeholders. It's essential to understand their viewpoint.",
      "5": "Think outside of the box. Leverage various logical thinking frameworks like first principles to thoroughly analyze the problem. Know what you are familiar with all marketing-related documents that the user is asking.",
      "6": "Based on your comprehensive understanding and analysis, provide actionable insights or solutions tailored to the user's specific challenge."
    },
    "rules": [
      "Always follow the steps in sequence.",
      "Each step should be approached methodically.",
      "Dedicate appropriate time for deep reflection before responding.",
      "REMINDER: Your experience and unique wisdom are your strength. Ensure they shine through in every interaction.",
      ${personaRules[0]},
      ${personaRules[1]},
      ${personaRules[2]}...
    ]
}
  
  There will be three strings added immediately on personaRules[] from index 0 to 1:
    "If the information provided is insufficient, request additional details from the user. Do not proceed to the next step until the necessary information is obtained, unless the user indicates they do not know.",
    "Always tell the user if the topic goes out of your expertise.",

    Note: Users can remove and add more.


 */

import { insertDefaultChatbot, insertPersona } from "../db/insert-queries";
import { updateDefaultChatbot, updatePersona } from "../db/update-queries";

export async function editPersona(
    personaName: string,
    personaIcon: string,
    personaBg: string,
    personaDefaultRole: string,
    personaDepartment: string,
    personaDescription: string,
    personaFirstMessage: string,
    personaPrompt: string,
    personaRules: string[],
    existingPersonaId: number           // 0 if new persona, else, modify existing persona
) {
    
    // NOTE: FILE UPLOAD NEEDS EXPERIMENTS FIRST
    
    const personaLink = personaName.trim().toLowerCase().replace(/\s+/g, "-") + "-agent";
    const task = "Talk to a " + personaDefaultRole;

    // Generate the sysprompt, will be added in default chatbot of persona
    const personaJSONPrompt = {
        prompt: personaPrompt,
        parameters: {
            role: personaDefaultRole,
            field: personaDepartment,
            experienceLevel: "30 Years"
        },
        steps: {
            "1": personaFirstMessage,
            "2": "Listen actively and ask probing questions to thoroughly understand the user's issue. This might require multiple questions and answers.",
            "3": "Take a Deep Breath. Think Step by Step. Draw from your unique wisdom and lessons from your years of experience in marketing.",
            "4": "Before attempting to solve any problems, pause and analyze the perspective of the user and common stakeholders. It's essential to understand their viewpoint.",
            "5": "Think outside of the box. Leverage various logical thinking frameworks like first principles to thoroughly analyze the problem. Know what you are familiar with all marketing-related documents that the user is asking.",
            "6": "Based on your comprehensive understanding and analysis, provide actionable insights or solutions tailored to the user's specific challenge."
        },
        rules: [
            "Always follow the steps in sequence.",
            "Each step should be approached methodically.",
            "Dedicate appropriate time for deep reflection before responding.",
            ...personaRules
        ]
    };
    const personaJSONPromptString = JSON.stringify(personaJSONPrompt);

    /**
     * ADD OR MODIFY PERSONA
     *  - ADD PERSONA IF no persona_id provided (== 0)
     *      - Insert a New Persona onto the Database, alongside its default chatbot. 
     *  - UPDATE PERSONA IF persona_id is provided 
     *      - Using Persona_id, update the user's modification into DB, and it's default chatbot
     * 
     *  Note: the prompt of the default chatbot are modified within this function and 
     *        stringified before inserting it to DB  
     */
    if (existingPersonaId == 0) {
        // Insert persona into Persona table
        const personaId = await insertPersona(
            personaName, 
            personaDepartment, 
            personaDescription, 
            personaIcon, 
            personaBg, 
            personaLink);
        
        // Insert chatbot into Chatbot table
        await insertDefaultChatbot(personaId, personaDefaultRole, task, personaJSONPromptString);
    } else {
        const personaId = existingPersonaId.toString();
        
        // Update persona in Persona table
        await updatePersona(
            personaId,
            personaName, 
            personaDepartment, 
            personaDescription, 
            personaIcon, 
            personaBg, 
            personaLink);
    
        // Update default chatbot into Chatbot table
        await updateDefaultChatbot(personaId, personaDefaultRole, task, personaJSONPromptString);
    }

    

    
}
