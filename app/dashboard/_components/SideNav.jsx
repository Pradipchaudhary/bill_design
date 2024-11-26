"use client";

import {
    CircleUser,
    FileVideo,
    PanelsTopLeft,
    ShieldPlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideNav = () => {
    const menuOptions = [
        {
            id: 1,
            name: "Dashboard",
            path: "/dashboard",
            icon: PanelsTopLeft,
        },
        {
            id: 2,
            name: "Create New",
            path: "/create-new",
            icon: FileVideo,
        },
        {
            id: 3,
            name: "Upgrade",
            path: "/upgrade",
            icon: ShieldPlusIcon,
        },
        {
            id: 4,
            name: "Account",
            path: "/account",
            icon: CircleUser,
        },
    ];

    const path = usePathname() || ""; // Fallback to empty string if undefined

    return (
        <div className="w-64 h-screen shadow-md p-5">
            <div>
                {menuOptions.map((item) => (
                    <Link href={item.path} key={item.id}>
                        <div
                            className={`flex gap-3 p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer ${
                                path === item.path
                                    ? "bg-primary text-white"
                                    : ""
                            }`}
                        >
                            <item.icon className="w-6 h-6" />
                            <h2>{item.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SideNav;
