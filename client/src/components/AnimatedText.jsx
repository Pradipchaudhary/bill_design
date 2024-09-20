// src/components/AnimatedText.js

import React, { useRef, useEffect, useState } from "react";

const AnimatedText = () => {
    const canvasRef = useRef(null);
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let xPos = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
            ctx.font = "48px sans-serif";
            ctx.fillStyle = "blue";
            ctx.fillText("Hello World!", xPos, 100); // Draw text
            xPos += 2; // Move text to the right

            if (xPos > canvas.width) {
                xPos = -200; // Reset position if text goes out of canvas
            }

            // Capture frame and send it to server
            if (frameIndex < 300) {
                captureFrame(canvas, frameIndex);
                setFrameIndex((prev) => prev + 1);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw(); // Start animation

        return () => cancelAnimationFrame(animationFrameId); // Cleanup
    }, [frameIndex]);

    const captureFrame = (canvas, index) => {
        const frame = canvas.toDataURL("image/png");
        fetch("http://localhost:5000/frame", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ frame, index }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error("Error:", error));
    };

    return <canvas ref={canvasRef} width={800} height={200} />;
};

export default AnimatedText;
