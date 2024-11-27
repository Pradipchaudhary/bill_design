import { ElevenLabsClient } from "elevenlabs";
import { v4 as uuid } from "uuid";
import { createWriteStream } from "fs";
import path from "path";
import { NextResponse } from "next/server";

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

        const audio = await client.generate({
            voice: "Rachel",
            model_id: "eleven_turbo_v2_5",
            text,
        });

        const fileName = `${uuid()}.mp3`;
        const filePath = path.join(process.cwd(), "public", fileName);
        const fileStream = createWriteStream(filePath);

        audio.pipe(fileStream);

        return new Promise((resolve, reject) => {
            fileStream.on("finish", () => {
                resolve(
                    NextResponse.json(
                        { success: true, fileUrl: `/public/${fileName}` },
                        { status: 200 }
                    )
                );
            });

            fileStream.on("error", (error) => {
                reject(
                    NextResponse.json({ error: error.message }, { status: 500 })
                );
            });
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
