import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  breakpoints: true,
  driver: "better-sqlite",
  dbCredentials: { url: "db.sqlite" },
} satisfies Config;
