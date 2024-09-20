import React, { useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const canvasRef = useRef(null);

    const handleAnimation = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let x = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Arial";
            ctx.fillText("Hello, Canvas Animation!", x, canvas.height / 2);
            x += 2;
            if (x > canvas.width)
                x = -ctx.measureText("Hello, Canvas Animation!").width;
            requestAnimationFrame(animate);
        };
        animate();
    };

    const handleDownload = async () => {
        const canvas = canvasRef.current;
        const imageBlob = await new Promise((resolve) => {
            canvas.toBlob(resolve, "image/png");
        });

        const formData = new FormData();
        formData.append("canvasImage", imageBlob, "canvas.png");

        try {
            const response = await axios.post(
                "http://localhost:5000/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const videoUrl = response.data.videoUrl;
            alert(`Video generated! You can download it from: ${videoUrl}`);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    return (
        <div className="App">
            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{ border: "1px solid black" }}
            />
            <div>
                <button onClick={handleAnimation}>Start Animation</button>
                <button onClick={handleDownload}>Download as Video</button>
            </div>
        </div>
    );
}

export default App;
