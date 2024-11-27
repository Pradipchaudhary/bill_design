import { NextResponse } from "next/server";
import * as PlayHT from "playht"; // Ensure the PlayHT library is properly installed and imported
import fs from "fs";
import path from "path";
import tls from "tls"; // Native Node.js ESM syntax

export async function POST(req) {
    try {
        const { text, id } = await req.json();

        console.log("script text: ", text);

        // Validate input
        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        // Debugging/logging
        console.log("Audio Generate text:", text);
        console.log("Request ID:", id);

        // Initialize PlayHT API with your credentials
        PlayHT.init({
            userId: process.env.PLAYHT_USER_ID, // Use environment variables for security
            apiKey: process.env.PLAYHT_API_KEY,
        });

        // Generate the audio file
        const audioResponse = await PlayHT.tts({
            text,
            voice: "en_us_male", // Use a valid voice identifier from PlayHT
            voiceEngine: "Play3.0-mini", // Ensure this matches the correct PlayHT voice engine
        });

        // Check for errors in PlayHT response
        if (!audioResponse?.audioUrl) {
            throw new Error("Failed to generate audio from PlayHT API.");
        }

        // Fetch the audio file from the returned URL
        const audioStream = await fetch(audioResponse.audioUrl);

        if (!audioStream.ok) {
            throw new Error("Error fetching audio stream from the PlayHT URL.");
        }

        // Save the audio file to the local file system
        const filePath = path.join(
            process.cwd(),
            "public",
            "audio",
            `${id}.mp3`
        );
        const writeStream = fs.createWriteStream(filePath);

        await new Promise((resolve, reject) => {
            audioStream.body.pipe(writeStream);
            audioStream.body.on("error", reject);
            writeStream.on("finish", resolve);
        });

        console.log(`Audio file saved at: ${filePath}`);

        // Return a success response with the file URL
        const audioUrl = `/audio/${id}.mp3`; // Assuming this is accessible via public folder
        return NextResponse.json(
            { audioUrl, message: "Audio generated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error generating audio:", error);

        // Return error response
        return NextResponse.json(
            { error: error.message || "An unexpected error occurred" },
            { status: 500 }
        );
    }
}

// =========================================================================

// Audio Generate Function

const GenerateAudioFile = async (videScriptData) => {
    try {
        setLoading(true); // Show loading state

        const id = uuid(); // Generate unique request ID

        // Concatenate contentText if videScriptData is an array of objects
        const script = Array.isArray(videScriptData)
            ? videScriptData.map((item) => item.contentText || "").join(" ")
            : videScriptData; // Assume string if not an array

        // Make POST request to generate audio
        const response = await axios.post("/api/generate-audio", {
            text: script,
            id: id,
        });

        // Handle the server response
        const audioUrl = response.data?.audioUrl;
        if (response.status === 200 && audioUrl) {
            console.log("Audio file URL:", audioUrl);
            // You can handle the audio file URL here (e.g., play or download it)
        } else {
            throw new Error(
                response.data?.error || "Failed to generate audio."
            );
        }
    } catch (error) {
        console.error(
            "Error generating audio file:",
            error.response?.data?.error ||
                error.message ||
                "Unknown error occurred."
        );
    } finally {
        setLoading(false); // Clear the loading state
    }
};
