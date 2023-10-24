import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const list = sqliteTable("list", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title", { length: 255 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  modifiedAt: integer("modified_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const todo = sqliteTable("todo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  listId: text("list_id")
    .notNull()
    .references(() => list.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  completed: integer("completed", { mode: "boolean" })
    .notNull()
    .$default(() => false),
  bookmarked: integer("bookmarked", { mode: "boolean" })
    .notNull()
    .$default(() => false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  modifiedAt: integer("modified_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const todoRelations = relations(todo, ({ one }) => ({
  user: one(user, { fields: [todo.userId], references: [user.id] }),
  list: one(list, { fields: [todo.listId], references: [list.id] }),
}));

export const listRelations = relations(list, ({ one, many }) => ({
  user: one(user, { fields: [list.userId], references: [user.id] }),
  todos: many(todo),
}));
