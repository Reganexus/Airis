import OpenAI from "openai";
import { list, put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';


export async function POST(request: Request) {

    // Function to fetch and convert an image from a URL to a File object
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

    // Extract the required data from the request body
    const { user_prompt, model, quality, size, style, quantity } = await request.json();

    // List all the images in the storage
    const imgList = await list();
    console.log(imgList);

    // Log the extracted data for debugging purposes
    console.log("PROMPT:" + user_prompt);
    console.log("MODEL:" + model);
    console.log("QUALITY:" + quality);
    console.log("SIZE:" + size);
    console.log("STYLE:" + style);
    console.log("QUANTITY:" + quantity);

    // Create a new instance of the OpenAI API client
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Generate images using the OpenAI API
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

    // Array to store the generated image URLs
    let imgURLS= [];

    // Process each generated image
    for(let i = 0; i < image.data.length; i++){
        const imageUrl = image.data[i]['url'];
        imgURLS.push(imageUrl);

        // Check if the image URL is a valid string
        if (typeof imageUrl === 'string') {
            const url = new URL(imageUrl);
            const pathname = url.pathname;
            console.log("PATHNAME: " + pathname);
            const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
            
            console.log('Filename:', filename);

            // Get the image file
            const imgFile = await getImageAsFile(imageUrl, filename);

            // Check if the image file is successfully fetched and converted
            if (imgFile) {
                console.log('File:', imgFile);

                // Upload the image file to the storage
                const blob = await put(filename, imgFile, {
                    access: 'public',
                });
                
                console.log(blob);
                console.log('Blob URL:', blob.url);

                // Revalidate the cache for the root path
                revalidatePath('/');
            } else {
                console.error('Failed to get image file');
            }
        } else {
            console.error('Invalid URL');
        }
    }

    // Return the response with the generated image URLs
    return new Response(JSON.stringify(
        {
            prompt: user_prompt,
            response: imgURLS,
        }
    ));
}