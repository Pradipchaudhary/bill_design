"use client";

import { db } from "@/lib/db";
import { Users } from "@/lib/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect } from "react";

const Provider = ({ children }) => {
    const { user } = useUser();

    useEffect(() => {
        const checkUser = async () => {
            if (user) {
                await isNewUser();
            }
        };
        checkUser();
    }, [user]);

    const isNewUser = async () => {
        const result = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);

        if (!result[0]) {
            await db
                .insert(Users)
                .values({
                    name: user?.fullName ?? "",
                    email: user?.primaryEmailAddress?.emailAddress ?? "",
                    imageUrl: user?.imageUrl ?? "",
                    createdAt: user?.createdAt ?? new Date().toISOString(),
                    updatedAt: user?.updatedAt ?? new Date().toISOString(),
                })
                .returning(); // Optional: depending on your database setup
        }
    };

    return <div>{children}</div>;
};

export default Provider;
