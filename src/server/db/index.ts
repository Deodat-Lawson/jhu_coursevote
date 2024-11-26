import { neon } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

// Create the neon connection
const sql1 = neon(process.env.POSTGRES_URL!);

// Create the drizzle instance with the neon client and schema
export const db = drizzle(sql1, { schema });