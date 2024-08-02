export async function deleteChatHistory(email: any) {
    const response = await fetch('/api/query/query-delete-history', {
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
    return data.error
}