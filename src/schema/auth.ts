import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  // other user attributes
  username: text("username", { mode: "text", length: 20 }),
});

export const profile = sqliteTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const session = sqliteTable("user_session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  activeExpires: blob("active_expires", {
    mode: "bigint",
  }).notNull(),
  idleExpires: blob("idle_expires", {
    mode: "bigint",
  }).notNull(),
});

export const key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  hashedPassword: text("hashed_password"),
});

export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile, { fields: [user.id], references: [profile.userId] }),
  keys: many(key),
  sessions: many(session),
}));
