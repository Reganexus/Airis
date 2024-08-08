

export async function insertPersona(
    personaName: string,
    personaDepartment: string,
    personaDescription: string,
    personaIcon: string,
    personaBg: string,
    personaLink: string
) {
  /**
   * function required for creating the Persona
   */
    const response = await fetch('/api/query/query-persona/add-persona', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: personaName,
        department: personaDepartment,
        tagline: personaDescription,
        logo_name: personaIcon,
        bg_name: personaBg,
        persona_link: personaLink
      })
    });
  
    const data = await response.json();
    return data[0]
}

export async function insertDefaultChatbot(
  personaId: string,
  personaDefaultRole: string,
  task: string,
  stringifiedSysprompt: string
) {
  /**
   * function required for adding the default-chatbot of a newly created persona
   */
  const response = await fetch('/api/query/query-chatbot/add-default-chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personaId: personaId,
      personaDefaultRole: personaDefaultRole,
      task: task,
      stringifiedSysprompt: stringifiedSysprompt
    })
  });

  const data = await response.json();
  return data[0]
}

export async function insertChatbot(
  personaId: string,
  role: string,
  task: string,
  stringifiedSysprompt: string,
  isDefaultPrompt: boolean,
  svg_icon: string
) {
  /**
   * function required for adding a chatbot
   */
  const response = await fetch('/api/query/query-chatbot/add-chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      persona_id: personaId,
      role: role,
      task: task,
      stringifiedSysprompt: stringifiedSysprompt,
      isDefaultPrompt: isDefaultPrompt,
      svg_icon: svg_icon
    })
  });

  const data = await response.json();
  return data[0]
}