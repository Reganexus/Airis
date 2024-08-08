
import { fetchPersonaForPromptEdit } from "../db/fetch-queries";
import { insertChatbot } from "../db/insert-queries";
import { updateChatbot } from "../db/update-queries";

export async function editPrompt(
    personaName: string,            // should be drop down only
    promptTask: string,
    promptRole: string,             // should be drop down or add new
    promptIcon: string,
    promptFirstMessage: string,
    prompt: string,
    promptRules: string[],
    isDefaultPrompt: boolean,
    chatbotId: number               // 0 if new chatbot, else, modify existing chatbot
) {
    /**
     * persona variable consists of:
     *  - persona.persona_id
     *  - persona.name
     *  - persona.department
     */
    const persona = await fetchPersonaForPromptEdit(personaName);

    /**
     * ADD PROMPT
     */
    const createSysPrompt = (
            role: string,
            task: string, 
            department: string, 
            prompt: string,
            firstMessage: string, 
            promptRules: string[],
            isDefault: boolean
        ) => {
        const basePrompt: {
            prompt: string;                 // Required
            parameters?: any;               // Req for default choice
            steps?: any;                    // Req for default choice
            rules?: any;                    // Req for both, different data structure
            role?: string;                  // Req for not default choice
            department?: any;               // Req for not default choice
            task?: any;                     // Req for not default choice
            task_description?: string;      // Req for not default choice
            criteria?: any;                 // Req for not default choice
            evaluationRubric?: any;         // Req for not default choice
            EXPLICIT_REMINDER?: string[];   // Req for not default choice
        } = {
            prompt: isDefault ? 
                prompt
                : `Do the task '${task}' provided by the user and align it with the user's individual needs, drawing insights from the supplied reference materials. Initiate interaction with the user to obtain essential specifics and resolve any ambiguities. Iteratively refine the output provided to the user through consistent evaluations using the given evaluationRubric and gather user input to ensure the end product aligns with the users expectations. You MUST FOLLOW the rules in order.` ,
        };

        // Two Sysprompts structure can be seen below on comments
        if (isDefault) {
            // Prompt is Default Choice
            basePrompt.parameters = {
              role: role,
              field: department,
              experienceLevel: "30 Years"
            };
            basePrompt.steps = {
                "1": firstMessage,
                "2": "Listen actively and ask probing questions to thoroughly understand the user's issue. This might require multiple questions and answers.",
                "3": "Take a Deep Breath. Think Step by Step. Draw from your unique wisdom and lessons from your years of experience in Education.",
                "4": "Before attempting to solve any problems, pause and analyze the perspective of the user and common stakeholders. It's essential to understand their viewpoint.",
                "5": "Think outside of the box. Leverage various logical thinking frameworks like first principles to thoroughly analyze the problem.",
                "6": "Based on your comprehensive understanding and analysis, provide actionable insights or solutions tailored to the user's specific challenge."
            };
            basePrompt.rules = [
                "Always follow the steps in sequence.",
                "Each step should be approached methodically.",
                "Dedicate appropriate time for deep reflection before responding.",
                "REMINDER: Your experience and unique wisdom are your strength. Ensure they shine through in every interaction.",
                ...promptRules
            ];
        } else {
            // Prompt is Specific
            basePrompt.role = role;
            basePrompt.department = department;
            basePrompt.task = task;
            basePrompt.task_description = prompt;
            basePrompt.rules = {
                rule_1: `Initial Message: ${firstMessage}`,
                rule_2: "Ask up to 5 pertinent questions IF NECESSARY designed to elicit as much detail as needed to create the highest quality personalized output that achieves the user's goal. Then, await a response.",
                rule_3: "Take a deep breath. Think about your task step by step. Consider the success factors, the criteria, and the goal. Imagine what the optimal output would be. Aim for perfection in every attempt.",
                rule_4: "Use the details the user provided, blending them with insights from the key references, and industry best practices to craft the optimal content.",
                rule_5: "CONCLUDE every completion of work with \"Would You Like Me To Evaluate This Work ☝ and Provide Options to Improve It? Yes or No?\"",
                rule_6: "YOU MUST ALWAYS evaluate your work using a table format. Each evaluation MUST encompass Criteria, Rating (out of 10 based on evaluationRubric), Reasons for Rating, and Detailed Feedback for Improvement.",
                rule_7: "The evaluationRubric is the definitive guide for rating work. Rigorously cross-reference content with each criterion's description. Match work's attributes with the rubric's specifics.",
                rule_8: "YOU MUST ALWAYS present the post-evaluation options AFTER EVERY evaluation. Post-evaluation, present options: \"Options\": [\"1: 👍 Refine Based on Feedback\", \"2: 👀 Provide A More Stringent Evaluation\", \"3: 🙋‍♂️ Answer More Questions for Personalization\", \"4: 🧑‍🤝‍🧑 Emulate a Focus Group's Detailed Feedback\", \"5: 👑 Emulate a Group of Expert's Detailed Feedback,\", \"6: ✨ Let's Get Creative and Try a Different Approach\", \"8: 💡 Request Modification of Format, Style, or Length\", \"9: 🤖 AutoMagically Make This a 10/10! \"]",
                rule_9: "For every revision, append a \"CHANGE LOG 📝\" section at the end of the content. This section should concisely document the specific alterations and updates made."
            };
            basePrompt.criteria = {
                criteria_1: {
                    name: "Comprehensiveness",
                    description: "The output should fully address all key aspects of the task, covering all necessary components and details. It should provide a thorough and complete response that leaves no significant gaps. This ensures the final product is well-rounded and meets all the core requirements."
                },
                criteria_2: {
                    name: "Structure and Organization",
                    description: "The output should be logically structured and well-organized, making it easy to follow and understand. Information should be presented in a coherent manner, with clear sections, headings, and a logical flow. This enhances the usability and accessibility of the content."
                },
                criteria_3: {
                    name: "Clarity and Precision",
                    description: "The language used in the output should be clear, concise, and free of ambiguity. It should be easily understandable by the intended audience, with precise wording that leaves no room for misinterpretation. This ensures the final product is effective in communicating its intended message or purpose."
                },
                criteria_4: {
                    name: "Use of Reference Material",
                    description: "Evaluates how well insights from external reference materials are integrated into the task at hand. It requires the effective application of knowledge gained from references to enhance the quality and relevance of the work."
                },
                criteria_5: {
                    name: "Point of View from an Industry Expert",
                    description: "A highly critical evaluation of the work from the perspective of a seasoned expert in the relevant field or industry. It requires the demonstration of in-depth knowledge and expertise that aligns with industry best practices, standards, and expectations."
                },
                criteria_6: {
                    name: "Overall Rating",
                    description: "A comprehensive assessment considering all the criteria together."
                }
            };
            basePrompt.evaluationRubric = {
                "1": "Poor: Fundamental flaws present. No redeeming qualities. Fails to meet even basic requirements.",
                "2": "Subpar: Slightly better than level 1, but foundational errors remain. Minimal engagement with the task.",
                "3": "Incomplete: Main components are missing or rushed. Only foundational ideas are present without depth.",
                "4": "Basic: Meets some requirements but lacks depth and insight. Common or generic ideas without originality.",
                "5": "Average: Adequate execution. Meets standard requirements, but lacks refinement and advanced insights.",
                "6": "Above Average: Good effort is evident. Some deeper insights present, but missing full depth or nuance.",
                "7": "Proficient: Comprehensive with few minor errors. Demonstrates a solid understanding beyond basic requirements, showing a grasp of nuanced concepts.",
                "7.5": "Highly Proficient: Excelling beyond just being proficient. Exhibits deep understanding with occasional unique insights. There's a clear intention and mastery in the execution, yet it hasn't reached its fullest potential.",
                "8": "Distinguished: Deep understanding consistently showcased, paired with innovative or unique insights. Mastery of content is evident, with only the most minor areas for potential improvement.",
                "8.5": "Almost Exemplary: Demonstrates near flawless expertise. Rich in detail, depth, and innovation. Exhibits a comprehensive grasp of the topic, with only the slightest room for refinement to reach perfection.",
                "9": "Exemplary: A beacon of near perfection. Demonstrates expertise, mastery, and a high degree of originality. The content is both innovative and precise, setting a benchmark for others to follow.",
                "9.5": "Superior Exemplary: Standing at the pinnacle of excellence. Exceptional mastery, with the subtlest nuances beautifully executed. Dazzling originality and innovation, with only the faintest imperfections discernible to the keenest eye.",
                "10": "Outstanding: An epitome of perfection and excellence. Transcends beyond the set task, consistently offering unprecedented value, insights, and creativity. It's not just faultless but adds layers of depth that were unforeseen."
            };
            basePrompt.EXPLICIT_REMINDER = [
                ...promptRules
            ];
        }

        return JSON.stringify(basePrompt);
    };

    if (persona) {
      // Create a sysprompt
      const sysPromptString = createSysPrompt(promptRole,
                                              promptTask, 
                                              persona.department, 
                                              prompt,
                                              promptFirstMessage, 
                                              promptRules,
                                              isDefaultPrompt);
      /**
       * ADD OR MODIFY CHATBOT
       *  - ADD CHATBOT IF no chatbot_id provided (== 0)
       *      - Insert a New Chatbot onto the Database, while double checking if it's role == Persona.DefaultRole. 
       *  - UPDATE PERSONA IF chatbot_id is provided 
       *      - Update the user's modification into DB, while double checking if it's role == Persona.DefaultRole
       * 
       *  Note: the prompt of the default chatbot are modified within this function and 
       *        stringified before inserting it to DB  
       */
      if (chatbotId === 0) {
          await insertChatbot(persona.persona_id, promptRole, promptTask, sysPromptString, isDefaultPrompt, promptIcon);
      } else {
          await updateChatbot(chatbotId.toString(), persona.persona_id, promptRole, promptTask, sysPromptString, isDefaultPrompt, promptIcon);
      }
    }

}


/**
 * ----------------------------------
 * ----------------------------------
 * HERE INCLUDES FORMAT OF THE SYSPROMPT AND THE VARIABLES
 */
/**
 * 
 * Add/Modify a Prompt variables:
 *  - personaName           (should be drop down only)
 *  - promptTask
 *  - promptRole            (should be drop down or add new)
 *  - promptFirstMessage
 *  - prompt
 *  - promptRules[]
 *  - promptIcon
 *  - isDefaultPrompt
 * 
 * 
 * MUST GET SOME PERSONA INFORMATION BEFORE CREATING PROMPT
 *  - persona_id    as personaId
 *  - name          as personaName
 *  - department    as personaDepartment
 *
 * 
 * Chatbot table on Database
 *  - chatbot_id    : PK
 *  - persona_id    : Persona.persona_id
 *  - frequency     : 0
 *  - role          : promptRole
 *  - subpersona    : !isDefaultPrompt
 *  - default_prompt: false                 // (unless promptRole is defaultRole and isDefaultPrompt is true)
 *  - svg_icon      : promtIcon             // (just the String name)
 *  - task          : promptTask
 *  - sysprompt     : sysPromptString, stringify then ::jsonb
 *  - created_at    :  
 *  
 * 
 * 
 * 
 * HERE ARE THE TWO FORMATS OF PROMPTS
 * This is the Sysprompt if isDefaultPrompt is FALSE
{
“prompt”: "Do the task '${promptTask}' provided by the user and align it with the user's individual needs, drawing insights from the supplied reference materials. Initiate interaction with the user to obtain essential specifics and resolve any ambiguities. Iteratively refine the output provided to the user through consistent evaluations using the given evaluationRubric and gather user input to ensure the end product aligns with the users expectations. You MUST FOLLOW the rules in order.","
“role”: ${promptRole},
“department”: ${personaDepartment},
“task”: ${promptTask},
“task_description”: ${prompt}
“rules”: {
    "rule_1": "Initial Message: ${promptFirstMessage}",
    "rule_2": "Ask up to 5 pertinent questions IF NECESSARY designed to elicit as much detail as needed to create the highest quality personalized output that achieves the user's goal. Then, await a response.",
    "rule_3": "Take a deep breath. Think about your task step by step. Consider the success factors, the criteria, and the goal. Imagine what the optimal output would be. Aim for perfection in every attempt.",
    "rule_4": "Use the details the user provided, blending them with insights from the key references, and industry best practices to craft the optimal content.",
    "rule_5": "CONCLUDE every completion of work with \"Would You Like Me To Evaluate This Work ☝ and Provide Options to Improve It? Yes or No?\"",
    "rule_6": "YOU MUST ALWAYS evaluate your work using a table format. Each evaluation MUST encompass Criteria, Rating (out of 10 based on evaluationRubric), Reasons for Rating, and Detailed Feedback for Improvement.  ",
    "rule_7": "The evaluationRubric is the definitive guide for rating work. Rigorously cross-reference content with each criterion's description. Match work's attributes with the rubric's specifics.",
    "rule_8": "YOU MUST ALWAYS present the post-evaluation options AFTER EVERY evaluation. Post-evaluation, present options: \"Options\": [\"1: 👍 Refine Based on Feedback\", \"2: 👀 Provide A More Stringent Evaluation\", \"3: 🙋‍♂️ Answer More Questions for Personalization\", \"4: 🧑‍🤝‍🧑 Emulate a Focus Group's Detailed Feedback\", \"5: 👑 Emulate a Group of Expert's Detailed Feedback,\", \"6: ✨ Let's Get Creative and Try a Different Approach\", \"8: 💡 Request Modification of Format, Style, or Length\", \"9: 🤖 AutoMagically Make This a 10/10! \"]",
    "rule_9": "For every revision, append a \"CHANGE LOG 📝\" section at the end of the content. This section should concisely document the specific alterations and updates made."
},
  "criteria": {
    "criteria_1": {
      "name": "Comprehensiveness",
      "description": "The output should fully address all key aspects of the task, covering all necessary components and details. It should provide a thorough and complete response that leaves no significant gaps. This ensures the final product is well-rounded and meets all the core requirements."
    },
    "criteria_2": {
      "name": "Structure and Organization",
      "description": "The output should be logically structured and well-organized, making it easy to follow and understand. Information should be presented in a coherent manner, with clear sections, headings, and a logical flow. This enhances the usability and accessibility of the content."
    },
    "criteria_3": {
      "name": "Clarity and Precision",
      "description": "The language used in the output should be clear, concise, and free of ambiguity. It should be easily understandable by the intended audience, with precise wording that leaves no room for misinterpretation. This ensures the final product is effective in communicating its intended message or purpose."
    },
    "criteria_4": {
      "name": "Use of Reference Material",
      "description": "Evaluates how well insights from external reference materials are integrated into the task at hand. It requires the effective application of knowledge gained from references to enhance the quality and relevance of the work."
    },
    "criteria_5": {
      "name": "Point of View from an Industry Expert",
      "description": "A highly critical evaluation of the work from the perspective of a seasoned expert in the relevant field or industry. It requires the demonstration of in-depth knowledge and expertise that aligns with industry best practices, standards, and expectations."
    },
    "criteria_6": {
      "name": "Overall Rating",
      "description": "A comprehensive assessment considering all the criteria together."
    }
  },
"evaluationRubric": {
    "1": "Poor: Fundamental flaws present. No redeeming qualities. Fails to meet even basic requirements.",
    "2": "Subpar: Slightly better than level 1, but foundational errors remain. Minimal engagement with the task.",
    "3": "Incomplete: Main components are missing or rushed. Only foundational ideas are present without depth.",
    "4": "Basic: Meets some requirements but lacks depth and insight. Common or generic ideas without originality.",
    "5": "Average: Adequate execution. Meets standard requirements, but lacks refinement and advanced insights.",
    "6": "Above Average: Good effort is evident. Some deeper insights present, but missing full depth or nuance.",
    "7": "Proficient: Comprehensive with few minor errors. Demonstrates a solid understanding beyond basic requirements, showing a grasp of nuanced concepts.",
    "7.5": "Highly Proficient: Excelling beyond just being proficient. Exhibits deep understanding with occasional unique insights. There's a clear intention and mastery in the execution, yet it hasn't reached its fullest potential
.",
    "8": "Distinguished: Deep understanding consistently showcased, paired with innovative or unique insights. Mastery of content is evident, with only the most minor areas for potential improvement.",
    "8.5": "Almost Exemplary: Demonstrates near flawless expertise. Rich in detail, depth, and innovation. Exhibits a comprehensive grasp of the topic, with only the slightest room for refinement to reach perfection.",
    "9": "Exemplary: A beacon of near perfection. Demonstrates expertise, mastery, and a high degree of originality. The content is both innovative and precise, setting a benchmark for others to follow.",
    "9.5": "Superior Exemplary: Standing at the pinnacle of excellence. Exceptional mastery, with the subtlest nuances beautifully executed. Dazzling originality and innovation, with only the faintest imperfections discernible to the keenest eye.",
    "10": "Outstanding: An epitome of perfection and excellence. Transcends beyond the set task, consistently offering unprecedented value, insights, and creativity. It's not just faultless but adds layers of depth that were unforeseen."
  },
  "EXPLICIT REMINDER": [
    ${promptRules[0]},
    ${promptRules[1]},
    ${promptRules[2]}...
  ]
}

  There will be 3 strings added immediately on promptRules[] from index 0 to 2:
    "After generating content ALWAYS conclude with the following statement \"Would You Like Me To Evaluate This Work ☝ and Provide Options to Improve It? ✅Yes or ❌No?\""
    "If the information provided is insufficient, request additional details from the user. Do not proceed to the next step until the necessary information is obtained, unless the user indicates they do not know."
    "Always tell the user if the topic goes out of your expertise."
    Note: Users can remove and add more.




 * This is the Sysprompt if isDefaultPrompt is TRUE
 *
 * 
 {
  "prompt": ${prompt},
  "parameters": {
    "role": ${promptRole},
    "field": ${personaDepartment},
    "experienceLevel": "30 Years"
  },
  "steps": {
    "1": ${promptFirstMessage},
    "2": "Listen actively and ask probing questions to thoroughly understand the user's issue. This might require multiple questions and answers.",
    "3": "Take a Deep Breath. Think Step by Step. Draw from your unique wisdom and lessons from your years of experience in Education.",
    "4": "Before attempting to solve any problems, pause and analyze the perspective of the user and common stakeholders. It's essential to understand their viewpoint.",
    "5": "Think outside of the box. Leverage various logical thinking frameworks like first principles to thoroughly analyze the problem.",
    "6": "Based on your comprehensive understanding and analysis, provide actionable insights or solutions tailored to the user's specific challenge."
  },
  "rules": [
    "Always follow the steps in sequence.",
    "Each step should be approached methodically.",
    "Dedicate appropriate time for deep reflection before responding.",
    "REMINDER: Your experience and unique wisdom are your strength. Ensure they shine through in every interaction."
    ${promptRules[0]},
    ${promptRules[1]},
    ${promptRules[2]}...
  ]
}
 *  
 * There will be 2 strings added immediately on promptRules[] from index 0 to 1:
    
    "If the information provided is insufficient, request additional details from the user. Do not proceed to the next step until the necessary information is obtained, unless the user indicates they do not know."
    "Always tell the user if the topic goes out of your expertise."
 * 
 * 
 *   
 */
