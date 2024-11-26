import { drizzle } from "drizzle-orm/neon";
import { neon, neonConfig } from "@neondatabase/serverless";

// Enable WebSocket for Neon
neonConfig.webSocket = true;

// Use environment variable for the database URL
const connectionString = process.env.NEXT_PUBLIC_DATABASE_URL;

// Create Neon client
const client = neon(connectionString);

// Initialize Drizzle with Neon client
export const db = drizzle(client);
