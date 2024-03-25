import { integer, pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  completedAt: timestamp("completed_at"),
  deletedAt: timestamp("deleted_at"),
});
