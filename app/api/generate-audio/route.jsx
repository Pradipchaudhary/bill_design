import { ElevenLabsClient } from "elevenlabs";
import { v4 as uuid } from "uuid";
import { NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";

const ELEVENLABS_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

const client = new ElevenLabsClient({
    apiKey: ELEVENLABS_API_KEY,
});

export async function POST(req) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        // Generate audio from ElevenLabs API
        const audio = await client.generate({
            voice: "Rachel",
            model_id: "eleven_turbo_v2_5",
            text,
        });

        const fileName = `${uuid()}.mp3`;

        // Create a new Promise to handle the Cloudinary upload
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "canvas-video-app-audio", // Folder where audio files will be stored
                    resource_type: "auto", // Automatically detect file type
                    public_id: `audio_files/${fileName}`, // Specify a public ID for the file
                },
                (error, result) => {
                    if (error) {
                        reject(error); // Reject if there is an error in the upload
                    } else {
                        resolve(result); // Resolve with the result from Cloudinary
                    }
                }
            );

            // Pipe the audio stream to Cloudinary's upload stream
            audio.pipe(uploadStream);
        });

        // Return the response with the Cloudinary URL
        return NextResponse.json(
            { success: true, fileUrl: cloudinaryResponse.secure_url },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
