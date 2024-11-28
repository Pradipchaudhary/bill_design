// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { audioFileUrl } = await req.json();

        const client = new AssemblyAI({
            apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
        });

        const FILE_URL = audioFileUrl;

        // Request parameters
        const data = {
            audio: FILE_URL,
        };

        const transcript = await client.transcripts.transcribe(data);
        console.log(transcript.words);

        return NextResponse.json({ data: transcript.words });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
