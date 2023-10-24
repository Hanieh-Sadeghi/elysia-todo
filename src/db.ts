import * as schema from "./schema";
import { drizzle } from "drizzle-orm/bun-sqlite";
import Database from "bun:sqlite";

export const dbConnection = new Database("db.sqlite");
export const db = drizzle(dbConnection, { logger: true, schema });
