"use client";
import React, { useState } from "react";

import Image from "next/image";

const SelectStyle = ({ onUserSelect }) => {
    const [selectedOption, setSelectedOption] = useState();

    const videoStyles = [
        {
            id: 1,
            name: "Realistic",
            description:
                "Lifelike visuals and environments, focusing on accuracy and authenticity.",
            useCases: ["Documentaries", "Nature films", "Training videos"],
            image: "/realistic.webp",
        },
        {
            id: 2,
            name: "Funny",
            description:
                "Humor-driven, entertaining, and often lighthearted content.",
            useCases: ["Memes", "Ads", "Lighthearted tutorials"],
            image: "/funny_comedic.webp",
        },
        {
            id: 3,
            name: "Dramatic",
            description:
                "Intense, emotional, and cinematic with high-impact visuals and music.",
            useCases: ["Movie trailers", "Inspirational videos", "Campaigns"],
            image: "/dramatic.webp",
        },
        {
            id: 4,
            name: "Whimsical",
            description:
                "Dreamlike, fantastical, and imaginative storytelling.",
            useCases: ["Music videos", "Art projects", "Storytelling"],
            image: "/whimsical.png",
        },
        {
            id: 5,
            name: "Professional",
            description:
                "Polished, minimalistic, and focused on business or formal presentations.",
            useCases: [
                "Product demos",
                "Corporate presentations",
                "Explainer videos",
            ],
            image: "/professional.png",
        },
    ];

    return (
        <div className="py-4">
            <h2 className="font-bold text-2xl text-primary">Style</h2>
            <p className="text-gray-500">Select the style of your video</p>
            <div className="flex gap-4 mt-4">
                {videoStyles.map((style) => (
                    <div
                        className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl ${
                            selectedOption == style.name &&
                            "border-4 border-primary"
                        }`}
                        key={style.id}
                    >
                        <Image
                            src={style.image}
                            alt={style.name}
                            width={100}
                            height={110}
                            className="rounded-md cursor-pointer h-28 object-cover"
                            onClick={() => {
                                setSelectedOption(style.name);
                                onUserSelect("imageStyle", style.name);
                            }}
                        />
                        <h2 className="text-sm bg-black text-white text-center py-1 rounded-b-lg">
                            {style.name}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectStyle;
