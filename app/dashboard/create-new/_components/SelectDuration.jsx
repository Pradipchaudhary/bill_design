"use client";

import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectTopic = ({ onUserSelect }) => {
    const [selectedOption, setSelectedOption] = useState();

    return (
        <div className="py-4">
            <h2 className="font-bold text-2xl text-primary">Duration</h2>
            <p className="text-gray-500 mb-3">Select the video duration</p>
            <Select
                className="p-2"
                onValueChange={(value) => {
                    setSelectedOption(value);
                    value != "Custom prompt" && onUserSelect("duration", value);
                }}
            >
                <SelectTrigger className="w-[380px] pt-2 text-lg">
                    <SelectValue placeholder="Select Video duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="30 Seconds">30 Seconds</SelectItem>
                    <SelectItem value="60 Seconds">60 Seconds</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SelectTopic;
