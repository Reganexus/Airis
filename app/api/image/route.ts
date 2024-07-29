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
            model: "dall-e-3", 
            prompt: user_prompt,
            size: "1024x1024"
        }
    );
    console.log(image);
    //console.log(image.data[0]['url']);
    //   console.log(JSON.stringify(
    //     {
    //         prompt: user_prompt, 
    //         response: image.data[0]['url'],
    //     }
    // ));
  
  return new Response(JSON.stringify(
        {
            prompt: user_prompt, 
            response: image.data[0]['url'],
        }
    ));
}