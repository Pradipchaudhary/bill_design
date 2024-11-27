"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const TryFreeButton = () => {
    const { isSignedIn } = useAuth(); // Check user's authentication status
    const router = useRouter(); // For client-side navigation

    const handleClick = () => {
        if (isSignedIn) {
            router.push("/dashboard"); // Redirect to dashboard if signed in
        } else {
            router.push("/sign-in"); // Redirect to sign-in if not signed in
        }
    };

    return (
        <div className="mt-4 min-w-[130px]">
            <Button className="w-full" onClick={handleClick}>
                Try to Free
            </Button>
        </div>
    );
};

export default TryFreeButton;
