import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json", // Changed this to application/json
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with image Prompt and Content Text as field",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: '```json\n[\n  {\n    "imagePrompt": "Realistic image of a bustling 17th-century London street, cobblestones, people in period clothing, horse-drawn carriages, and a sense of movement and energy.",\n    "contentText": "The year is 1665. London, a city teeming with life, is unknowingly on the brink of catastrophe.  The Great Plague is about to begin."\n  },\n  {\n    "imagePrompt": "Realistic image of a single, dimly lit room. A family huddled together, fear in their eyes, with signs of illness (pale skin, sweat) visible on some.",\n    "contentText": "The first cases appear, spreading like wildfire through the tightly packed houses.  Fear grips the city as families fall victim to the unseen enemy."\n  },\n  {\n    "imagePrompt": "Realistic image of a doctor in period clothing, examining a plague victim, tools of the time scattered on a table.  A sense of helplessness and despair.",\n    "contentText": "Doctors, armed with ineffective treatments and little understanding of the disease, struggle to cope.  The death toll rises exponentially."\n  },\n  {\n    "imagePrompt": "Realistic image of a large, open space outside of London, rows of hastily dug graves.  A somber atmosphere, crows circling overhead.",\n    "contentText": "Mass graves become the grim reality as the city struggles to bury its dead.  The stench of death hangs heavy in the air."\n  },\n  {\n    "imagePrompt": "Realistic image of a deserted London street, empty houses with boarded-up windows. A single figure, cloaked and hooded, walks through the deserted street. ",\n    "contentText": "The city becomes a ghost town as residents flee or succumb to the plague.  The once-vibrant streets are now eerily silent."\n  },\n  {\n    "imagePrompt": "Realistic image of a group of people lighting a bonfire, possibly burning infected clothing, with a sense of desperate action and hope amidst the despair.",\n    "contentText": "Desperate measures are taken.  People attempt to cleanse their homes and belongings with fire, hoping to eradicate the plague\'s insidious reach."\n  },\n  {\n    "imagePrompt": "Realistic image of a map of London, with markings indicating the spread of the plague, highlighting its progression.",\n    "contentText": "The plague\'s relentless advance is mapped, a grim testament to its devastating power."\n  },\n  {\n    "imagePrompt": "Realistic image of people returning to a slowly recovering London street, rebuilding and cleaning.  A mixture of relief and lingering unease on their faces.",\n    "contentText": "Slowly, after months of horror, the plague begins to recede.  A long and arduous journey to rebuild begins."\n  },\n  {\n    "imagePrompt": "Realistic image of a memorial or plaque dedicated to the victims of the Great Plague of London, showing a sense of remembrance and reflection.",\n    "contentText": "The Great Plague of London, a dark chapter in history, leaves a lasting mark.  The memory of the victims serves as a reminder of resilience and the enduring spirit of the human race."\n  }\n]\n```\n\n**Notes:**\n\n* This JSON provides 9 scenes.  To fit within 30 seconds, each scene would need to be very short (approximately 3-4 seconds).  You could reduce the number of scenes or increase the length of the video if needed.\n* The image prompts are designed to be detailed to guide an AI image generator toward realistic results.  You might need to experiment with different generators and prompt engineering to achieve the desired look.\n* The text is concise to fit the short timeframe.  You can adjust the wording as needed.\n*  You will need video editing software to combine the generated images with the text narration to create the final video.  Many free and paid options exist.\n* Consider using background music to enhance the emotional impact of the video.\n\n\nThis structured approach ensures a coherent narrative flow for your 30-second historical video. Remember to adjust the script based on the capabilities of your chosen AI image generator and video editing software.\n',
                },
            ],
        },
    ],
});
