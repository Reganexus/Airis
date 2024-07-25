import OpenAI from "openai";

export async function POST(request: Request) {
    const { user_prompt, model} = await request.json();

    console.log("PROMPT:" + user_prompt);
    console.log("MODEL:" + model);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const image = await openai.images.generate(
        { 
            model: "dall-e-2", 
            prompt: user_prompt 
        }
    );
  console.log(image.data[0]['url']);
  
  return new Response(JSON.stringify({response: image.data[0]['url'] }));
}