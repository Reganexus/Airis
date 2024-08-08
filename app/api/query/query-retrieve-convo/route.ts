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
      console.log(`Conversation ${i}: `, conversation[i]);

      // Checks if the message is an image, if so, it should have an annotation, which contains the name of the image
      if (conversation[i].annotations && conversation[i].annotations.length > 0) {
        console.log('ANNOTATION: ', conversation[i].annotations);

        // This will change the url of the image message into a new blob url, since the initial blob url might be expired
        const targetBlob = imgList.blobs.find(blob => blob.pathname.includes(conversation[i].annotations));
        if(targetBlob){
          conversation[i].content = targetBlob.url;
        }
      }
      //   let annotations = conversation[i].annotations;
      //   for(let j = 0; j < annotations.length; j++){
      //     console.log(`ANNOTATION: ${j}`);
      //     console.log(annotations[j]);


      //     // temporary solution. need to be REVISED

      //     if (targetBlob) {
      //       console.log('Found Blob:', targetBlob);
      //       conversation[i].content[j] = targetBlob.url;
      //       console.log('THIS IS THE CONTENT');
      //       console.log(conversation[i].content);
      //     } else {
      //       console.log('Blob not found.');
      //     }

      //   }
      // }
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