import { sql } from '@vercel/postgres';
import { list } from '@vercel/blob';

export async function POST(req: Request) {
  try {

    const imgList = await list();
    const information = await req.json()
    const result = await sql`SELECT chatbot_id, messages FROM conversation WHERE conversation_id = ${information.conversation_id}`;
    const conversation = result.rows[0].messages;
    const chatbot_id = result.rows[0].chatbot_id;

    console.log("STORED IMAGES: ");
    console.log(imgList);
    for (let i = 0; i < conversation.length; i++) {
      if (conversation[i].annotations && conversation[i].annotations.length > 0) {
        let annotations = conversation[i].annotations;
        for(let j = 0; j < annotations.length; j++){
          console.log(`ANNOTATION: ${j}`);
          console.log(annotations[j]);
          

          // temporary solution. need to be REVISED
          const targetBlob = imgList.blobs.find(blob => blob.pathname.includes(annotations[j]));

          if (targetBlob) {
            console.log('Found Blob:', targetBlob);
            conversation[i].content[j] = targetBlob.url;
          } else {
            console.log('Blob not found.');
          }

        }
      }
    }

    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: '', messages: conversation, chatbot_id: chatbot_id }));
    } else {
      return new Response(JSON.stringify({ error: 'no saved conversation', messages: null }));
    }
  } catch (error) {
    
    return new Response(JSON.stringify({ error: 'Error fetching chatbot', messages: null }));
  }
}