

export async function updatePersona(
    personaId: string,
    personaName: string,
    personaDepartment: string,
    personaDescription: string,
    personaIcon: string,
    personaBg: string,
    personaLink: string
) {
    /**
     * function required updating the specific persona
     */
    const response = await fetch('/api/query/query-persona/update-persona', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        persona_id: personaId,
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

export async function updateDefaultChatbot(
    personaId: string,
    personaDefaultRole: string,
    task: string,
    stringifiedSysprompt: string
  ) {
    /**
     * function required for updating the default chatbot of a specific persona
     */
    const response = await fetch('/api/query/query-chatbot/update-default-chatbot', {
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


export async function updateChatbot(
  chatbotId: string,
  personaId: string,
  role: string,
  task: string,
  stringifiedSysprompt: string,
  isDefaultPrompt: boolean,
  svg_icon: string
) {
  /**
   * function required for updating a chatbot, provided with chatbot-id
   */
  const response = await fetch('/api/query/query-chatbot/update-chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatbot_id: chatbotId,
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

export async function updateChatbotFrequency(
  chatbot_id: string,
) {
  /**
   * function required updating the specific persona
   */
  await fetch('/api/query/query-chatbot-frequency', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chatbot_id: chatbot_id
    })
  });

}