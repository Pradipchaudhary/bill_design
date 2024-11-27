"use client";
import TryFreeButton from "@/components/TryFreeButton";

export default function Home() {
    return (
        <div className="h-screen w-full flex justify-center items-center flex-col">
            <h1 className="text-3xl font-semibold">Canvas Video app</h1>
            <TryFreeButton />
        </div>
    );
}
