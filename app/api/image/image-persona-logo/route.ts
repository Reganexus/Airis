import { list, put } from '@vercel/blob';

export async function POST(request: Request) {

    try {
        // Get all the Persona Icons stored in Assets/persona_icons
        const {blobs: personaIconsBlobs}  = await list({ prefix: 'Assets/persona_icons' });

        return new Response(JSON.stringify({ error: '', blob: personaIconsBlobs }));

    } catch (error) {
        // Debugging 
        console.error("An error occurred:", error);
        return new Response(JSON.stringify(
            {
                error: 'An error occurred',
                blob: null
            }
        ));
    }
}