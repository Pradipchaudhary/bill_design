"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

const Dashboard = () => {
    const [videList, setVideoList] = useState([]);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl text-primary">Dashboard</h1>
                <Link href={"/dashboard/create-new"}>
                    <Button>+ Create New</Button>
                </Link>
            </div>

            {/* Empty state */}
            {videList?.length == 0 && (
                <div>
                    <EmptyState />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
