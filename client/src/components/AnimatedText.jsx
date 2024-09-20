// src/components/AnimatedText.js

import React, { useRef, useEffect, useState } from "react";

const AnimatedText = ({ text, animationStyle, duration, onFramesCaptured }) => {
    const canvasRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let xPos = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "48px sans-serif";
            ctx.fillStyle = "blue";

            // Apply animation styles
            if (animationStyle === "slide") {
                ctx.fillText(text, xPos, 100);
                xPos += 2; // Move text
                if (xPos > canvas.width) xPos = -200; // Reset position
            } else if (animationStyle === "fade") {
                ctx.globalAlpha =
                    0.5 + Math.sin((frameIndex / duration) * Math.PI) * 0.5;
                ctx.fillText(
                    text,
                    canvas.width / 2 - ctx.measureText(text).width / 2,
                    100
                );
            }

            if (isAnimating && frameIndex < duration) {
                captureFrame(canvas, frameIndex);
                setFrameIndex((prev) => prev + 1);
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationFrameId);
    }, [isAnimating, frameIndex, text, animationStyle, duration]);

    const captureFrame = (canvas, index) => {
        const frame = canvas.toDataURL("image/png");
        onFramesCaptured(frame, index); // Callback to parent
    };

    const startAnimation = () => {
        setIsAnimating(true);
        setFrameIndex(0);
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={800}
                height={200}
                style={{ border: "1px solid black" }}
            />
            <button onClick={startAnimation}>Start Animation</button>
        </div>
    );
};

export default AnimatedText;
