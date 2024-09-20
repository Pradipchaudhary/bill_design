// src/components/VideoSettings.js

import React, { useState } from "react";

const VideoSettings = ({ onStart, onFramesCaptured }) => {
    const [text, setText] = useState("Hello World!");
    const [animationStyle, setAnimationStyle] = useState("slide");
    const [duration, setDuration] = useState(300);
    const [musicFile, setMusicFile] = useState(null);

    const handleMusicUpload = (e) => {
        setMusicFile(e.target.files[0]);
    };

    const handleStart = () => {
        onStart(text, animationStyle, duration, musicFile);
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text"
            />
            <select
                value={animationStyle}
                onChange={(e) => setAnimationStyle(e.target.value)}
            >
                <option value="slide">Slide</option>
                <option value="fade">Fade</option>
            </select>
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                placeholder="Duration (frames)"
            />
            <input type="file" accept="audio/*" onChange={handleMusicUpload} />
            <button onClick={handleStart}>Start Animation</button>
        </div>
    );
};

export default VideoSettings;
