import { drizzle } from "drizzle-orm/neon";
import { neon, neonConfig } from "@neondatabase/serverless";

// Enable WebSocket mode for Neon
neonConfig.webSocket = true;

const client = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

export const db = drizzle(client);
