import {
  integer,
  pgTable,
  text,
  timestamp,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  completedAt: timestamp("completed_at"),
  deletedAt: timestamp("deleted_at"),
});

export const tenants = pgTable("tenants", {
  id: varchar("id", {
    length: 26,
  })
    .primaryKey()
    .$default(() => ulid()),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});
