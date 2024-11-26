import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center mt-10 border border-dashed p-5 py-24">
            <p className="p-5">You don't have any short video created </p>
            <Link href={"/dashboard/create-new"}>
                <Button>Create Video </Button>
            </Link>
        </div>
    );
};

export default EmptyState;
