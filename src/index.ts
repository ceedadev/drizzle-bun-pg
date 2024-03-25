import { Elysia } from "elysia";

import { db } from "./db";
import { todos } from "./db/schema";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/todos", () => {
    const todos = db.query.todos.findMany();
    return todos;
  })
  .post("/todos", (req) => {
    const { title, description } = req.body as {
      title: string;
      description: string;
    };
    const insertTodo = db.insert(todos).values({
      title: title,
      description: description,
    });
    return insertTodo.returning();
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
