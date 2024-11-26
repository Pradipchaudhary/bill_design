"use client";

import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SelectTopic = ({ onUserSelect }) => {
    const [selectedOption, setSelectedOption] = useState();
    const options = [
        "Custom prompt",
        "Random AI Story",
        "Scary Story",
        "Historical Facts",
        "Bad Time Story",
        "Motivation",
    ];

    return (
        <div className="py-4">
            <h2 className="font-bold text-2xl text-primary">Content</h2>
            <p className="text-gray-500 mb-3">
                What is the topic of your video ?
            </p>
            <Select
                className="p-2"
                onValueChange={(value) => {
                    setSelectedOption(value);
                    value !== "Custom prompt" && onUserSelect("topic", value);
                }}
            >
                <SelectTrigger className="w-[380px] pt-2 text-lg">
                    <SelectValue placeholder="Content Types" />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option, index) => (
                        <SelectItem value={option} key={index}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedOption == "Custom prompt" && (
                <div>
                    {" "}
                    <Textarea
                        className="mt-4 p-10 shadow-sm"
                        placeholder="Write prompt on which you want to generate video"
                        onChange={(e) => onUserSelect("topic", e.target.value)}
                    ></Textarea>
                </div>
            )}
        </div>
    );
};

export default SelectTopic;
