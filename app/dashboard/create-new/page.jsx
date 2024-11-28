"use client";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuid } from "uuid";

const videoScriptList = [
    {
        imagePrompt:
            "Realistic image of a bustling medieval marketplace, cobblestone streets, people in period clothing bargaining, vibrant colors, detailed architecture, bright sunlight",
        contentText:
            "Our story begins in 14th century Florence, a city brimming with life and ambition. The Renaissance was just dawning, and alongside the art and philosophy, a fierce rivalry was brewing...",
    },
    {
        imagePrompt:
            "Realistic portrait of a young, ambitious, determined-looking man in 14th-century Florentine clothing, holding a quill and parchment, intense gaze, high-quality details, cinematic lighting",
        contentText:
            "Meet Giovanni di Francesco, a promising young merchant with a keen eye for opportunity and a thirst for wealth. He had a secret plan...",
    },
];

const CreateNew = () => {
    const [formData, setFormData] = useState({
        topic: "",
        imageStyle: "",
        duration: "",
    });
    const [videoScript, setVideoScript] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [audioFileUrl, setAudioFileUrl] = useState(null);
    const [caption, setCaption] = useState(null);
    const [imageList, setImageList] = useState([]);

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
    };

    const GetVideoScript = async () => {
        setLoading(true);
        setError(""); // Clear any existing error
        const prompt = `Write a script to generate a ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with "imagePrompt" and "contentText" fields.`;

        try {
            const result = await axios.post("/api/get-video-script", {
                prompt,
            });
            const resultData = result.data?.result;

            if (resultData && Array.isArray(resultData)) {
                setVideoScript(resultData);
                await GenerateAudioFile(resultData);
                // await GenerateImages(resultData);
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

    const GenerateAudioFile = async (videoScriptData) => {
        try {
            setLoading(true);
            const id = uuid();
            const script = videoScriptData
                .map((item) => item.contentText || "")
                .join(" ");

            const response = await axios.post("/api/generate-audio", {
                text: script,
                id,
            });
            console.log("Generate Audio file : ", response);
            const audioUrl = response.data?.fileUrl;
            if (response.status === 200 && audioUrl) {
                setAudioFileUrl(audioUrl);
                // await GenerateAudioCaption(audioUrl);
            } else {
                throw new Error("Failed to generate audio.");
            }
        } catch (error) {
            console.error("Error generating audio file:", error);
            setError(
                error.response?.data?.error ||
                    "There was an issue generating the audio file."
            );
        } finally {
            setLoading(false);
        }
    };

    const GenerateAudioCaption = async (fileUrl) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/generate-caption", {
                audioFileUrl: fileUrl,
            });
            console.log("Generate Audio Captiion:", response);
            if (response.data?.data) {
                setCaption(response.data.data);
            } else {
                throw new Error("Failed to generate captions.");
            }
        } catch (error) {
            console.error("Error generating audio captions:", error);
            setError("Failed to generate captions.");
        } finally {
            setLoading(false);
        }
    };

    const GenerateImages = async (videoScriptList) => {
        try {
            setLoading(true); // Indicate loading state
            setError(null); // Clear any previous errors

            const imagePromises = videoScriptList.map((element) =>
                axios
                    .post("/api/generate-image", {
                        prompt: element.imagePrompt,
                    })
                    .then((res) => {
                        if (res.data?.fileUrl) {
                            return res.data.fileUrl;
                        }
                        throw new Error("No image URL found in response.");
                    })
            );

            const images = await Promise.all(imagePromises);

            console.log("Generated images:", images); // Debugging output
            setImageList(images); // Update state with generated image URLs
        } catch (error) {
            console.error("Error generating images:", error);
            setError("Failed to generate images. Please try again later.");
        } finally {
            setLoading(false); // End loading state
        }
    };

    const onClickHandler = () => {
        if (!formData.topic || !formData.imageStyle || !formData.duration) {
            setError("Please select all fields before creating the video.");
            return;
        }
        GenerateImages(videoScriptList);
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
