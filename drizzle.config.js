import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./lib/schema.js",
    dbCredentials: {
        url: "postgresql://canvas-video-app_owner:dZ08VrjXzgtp@ep-green-tooth-a5gm2fe6.us-east-2.aws.neon.tech/canvas-video-app?sslmode=require",
    },
});
