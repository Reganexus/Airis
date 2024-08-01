import OpenAI from "openai";
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

async function getImageAsFile(imageUrl: string | URL | Request, fileName: string) {
    try {
        // Fetch the image from the URL
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }

        // Convert the response into a Blob
        const imageBlob = await response.blob();

        // Create a File from the Blob
        const imageFile = new File([imageBlob], fileName, {
            type: imageBlob.type,
        });

        return imageFile;
    } catch (error) {
        console.error('Error fetching and converting image:', error);
        return null;
    }
}


export async function POST(request: Request) {

    async function getImageAsFile(imageUrl: string, fileName: string): Promise<File | null> {
        try {
            // Fetch the image from the URL
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
    
            // Convert the response into a Blob
            const imageBlob = await response.blob();
    
            // Create a File from the Blob
            const imageFile = new File([imageBlob], fileName, {
                type: imageBlob.type,
            });
    
            return imageFile;
        } catch (error) {
            console.error('Error fetching and converting image:', error);
            return null;
        }
    }

    const { user_prompt, model, quality, size, style, quantity } = await request.json();

    console.log("PROMPT:" + user_prompt);
    console.log("MODEL:" + model);
    console.log("QUALITY:" + quality);
    console.log("SIZE:" + size);
    console.log("STYLE:" + style);
    console.log("QUANTITY:" + quantity);


    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });


    const image = await openai.images.generate(
        {
            model: model, 
            prompt: user_prompt,
            size: size,
            n: quantity,
            quality: quality,
            style: style,
        }
    );


    
    let imgURLS= [];
    for(let i = 0; i < image.data.length; i++){
        const imageUrl = image.data[i]['url'];
        imgURLS.push(imageUrl);
        if (typeof imageUrl === 'string') {
            const url = new URL(imageUrl);
            const pathname = url.pathname;
            console.log("PATHNAME: " + pathname);
            const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
            
            console.log('Filename:', filename);
    
            // Get the image file
            const imgFile = await getImageAsFile(imageUrl, filename);
    
            if (imgFile) {
                console.log('File:', imgFile);
    
                // Now pass the file to the put function
                const blob = await put(filename, imgFile, {
                    access: 'public',
                });
    
                console.log('Blob URL:', blob.url);
                revalidatePath('/');
            } else {
                console.error('Failed to get image file');
            }
        } else {
            console.error('Invalid URL');
        }
    }

    return new Response(JSON.stringify(
        {
            prompt: user_prompt,
            response: imgURLS,
        }
    ));


}