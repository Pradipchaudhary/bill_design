import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <div className="p-3 px-5 flex justify-between items-center shadow-md">
            <div>
                <h1>Canvas Video app </h1>
            </div>
            <div className="flex gap-3 items-center">
                <Link href={"/dashboard"}>
                    <Button>Dashboard</Button>
                </Link>
                <UserButton />
            </div>
        </div>
    );
};

export default Header;
