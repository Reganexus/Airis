export async function fetchChatbot(chatbot_id: string | null) {
  const response = await fetch('/api/query/query-chatbot-one', {
      method: 'POST',
      body: JSON.stringify({
        id: chatbot_id 
      })
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data
}

export async function fetchChatbotAllSelection() {
  const response = await fetch('/api/query/query-chatbot-all-selection', {
      method: 'POST'
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.chatbot
}

export async function fetchSaveConvo(message: any[], email: any, chatbot_id: number, convo_id: number) {
    const response = await fetch('/api/query/query-save-convo', {
      method: 'POST',
      body: JSON.stringify({
        conversation_id: convo_id,
        messages: message,
        email: email,
        chatbot_id: chatbot_id
      })
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // must return status, convo_id
    const data = await response.json();
    return data
}
  
export async function fetchChatHistory(email: any) {
    const response = await fetch('/api/query/query-chat-history', {
      method: 'POST',
      body: JSON.stringify({
        email: email
      })
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // must return status, convo_id
    const data = await response.json();
    return data.chat_history
}
  
export async function fetchOldChat(convo_id: number) {
    const response = await fetch('/api/query/query-retrieve-convo', {
        method: 'POST',
        body: JSON.stringify({
        conversation_id: convo_id
        })
    });
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // must return status, convo_id
    const data = await response.json();
    return data
}
  
export async function fetchChatUID(convo_id: number, email: any) {
    const response = await fetch('/api/query/query-get-uid', {
        method: 'POST',
        body: JSON.stringify({
        conversation_id: convo_id,
        email: email
        })
    });
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    // must return status, convo_id
    const data = await response.json();
    return data.error
}


export async function fetchPersonas() {
  const res = await fetch("/api/query/query-persona", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()

  return data;
}

export async function fetchSelectedPersona() {
  const res = await fetch("/api/query/query-persona", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()

  return data;
}

export async function fetchPrompts(persona_id: string) {
    const response = await fetch('/api/query/query-tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ persona_id: persona_id }), // Send persona_id in the request body
      cache: 'force-cache',                             // forced caching
      next: { revalidate: 3600 }
    });

    const data = await response.json();
    return data
}

export async function fetchPersonaSelected(agent: string | string[] ) {
  const response = await fetch('/api/query/query-persona-selected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      persona: agent
    }),
    cache: 'force-cache',
    next: { revalidate: 3600 }
  });

  const data = await response.json();
  return data[0]

}