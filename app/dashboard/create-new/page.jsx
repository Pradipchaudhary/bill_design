"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuid } from "uuid"; // Import UUID

const CreateNew = () => {
    const [formData, setFormData] = useState({
        topic: "",
        imageStyle: "",
        duration: "",
    });
    const [videoScript, setVideoScript] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [audioFileUrl, setAudioFileUrl] = useState();

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
    };

    const GetVideoScript = async () => {
        setLoading(true);
        setError(""); // Clear any existing error
        const prompt = `Write a script to generate a ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with "imagePrompt" and "contentText" fields.`;

        try {
            const result = await axios.post("/api/get-video-script", {
                prompt: prompt,
            });

            // Validate response structure
            const resultData = result.data?.result;
            if (resultData && Array.isArray(resultData)) {
                setVideoScript(resultData);
                GenerateAudioFile(resultData);
            } else {
                throw new Error(
                    "Unexpected response structure from the server."
                );
            }
        } catch (error) {
            console.error("Error fetching video script:", error);
            setError(
                error.response?.data?.error ||
                    "There was an issue generating the video script. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const GenerateAudioFile = async (videScriptData) => {
        try {
            setLoading(true); // Show loading state

            const id = uuid(); // Generate unique request ID

            // Concatenate contentText if videScriptData is an array of objects
            const script = Array.isArray(videScriptData)
                ? videScriptData.map((item) => item.contentText || "").join(" ")
                : videScriptData; // Assume string if not an array

            console.log("Script are here...before post request:", script);
            // Script are here...before post request
            // Make POST request to generate audio
            const response = await axios.post("/api/generate-audio", {
                text: script,
                id: id,
            });

            // Handle the server response

            const audioUrl = response.data?.fileUrl;
            if (response.status === 200 && audioUrl) {
                console.log("Audio file URL:", audioUrl);
                // You can handle the audio file URL here (e.g., play or download it)
                setAudioFileUrl(audioUrl);
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

    const onClickHandler = () => {
        if (!formData.topic || !formData.imageStyle || !formData.duration) {
            setError("Please select all fields before creating the video.");
            return;
        }
        GetVideoScript();
    };

    return (
        <div className="md:mx-20">
            <h1 className="font-bold text-4xl text-primary py-3">Create New</h1>
            <hr />
            <div>
                <SelectTopic onUserSelect={onHandleInputChange} />
                <SelectStyle onUserSelect={onHandleInputChange} />
                <SelectDuration onUserSelect={onHandleInputChange} />

                {error && <div className="text-red-500 py-2">{error}</div>}

                <Button className="py-4 mt-4" onClick={onClickHandler}>
                    Create Video
                </Button>

                <CustomLoading loading={loading} />
            </div>
        </div>
    );
};

export default CreateNew;
