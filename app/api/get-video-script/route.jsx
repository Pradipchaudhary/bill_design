import { chatSession } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json(); // Getting the prompt from the request body

        // Send the prompt to chatSession and await the response
        const result = await chatSession.sendMessage(prompt);
        // console.log(result.response.text());

        return NextResponse.json({
            result: JSON.parse(result.response.text()),
        });
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: error.message });
    }
}
