import { NextResponse } from "next/server";
import axios from "axios";
import cloudinary from "@/utils/cloudinary";
import { v4 as uuid } from "uuid";

// Stability AI API Key
const API_KEY = process.env.NEXT_PUBLIC_STABILITY_API_KEY; // Make sure the API key is stored securely

// Stability AI API URL
const STABILITY_API_URL =
    "https://api.stability.ai/v2beta/stable-image/generate/ultra";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!API_KEY) {
            return NextResponse.json(
                { error: "Missing Stability AI API Key." },
                { status: 500 }
            );
        }

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required." },
                { status: 400 }
            );
        }

        // Prepare form data to send to Stability AI API
        const formData = new FormData();
        formData.append("prompt", prompt);
        formData.append("output_format", "webp"); // Specify the desired output format (webp, png, etc.)

        // Make API request to Stability AI to generate the image
        const response = await axios.post(STABILITY_API_URL, formData, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                Accept: "image/*",
                ...formData, // Add form-data headers
            },
            responseType: "arraybuffer", // Receive image as arraybuffer
        });

        if (response.status !== 200) {
            throw new Error(`Error from Stability AI: ${response.status}`);
        }

        // Get the image buffer from the response
        const arrayBuffer = response.data;
        const buffer = Buffer.from(arrayBuffer);

        // Generate a unique file name
        const fileName = `${uuid()}.webp`;

        // Upload the image to Cloudinary
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "canvas-video-app", // Specify the folder in Cloudinary
                    resource_type: "auto", // Cloudinary will detect the image type (webp, png, etc.)
                    public_id: `images/${fileName}`, // Unique public ID for the image
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            uploadStream.end(buffer); // End the stream with the image buffer
        });

        // Return the uploaded image's secure URL
        return NextResponse.json(
            { success: true, fileUrl: cloudinaryResponse.secure_url },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in API:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
