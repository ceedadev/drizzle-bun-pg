import { Elysia } from "elysia";
import { desc, eq, sql } from "drizzle-orm";

import { db } from "./db";
import { tenants, todos } from "./db/schema";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/todos", () => {
    const todos = db.query.todos.findMany({
      orderBy: (t, { desc }) => [desc(t.createdAt)],
    });
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
  .put("/todos/:id", ({ params: { id }, body }) => {
    const { title, description } = body as {
      title: string;
      description: string;
    };
    const updateTodo = db
      .update(todos)
      .set({
        title: title,
        description: description,
        updatedAt: sql`now()`,
      })
      .where(eq(todos.id, Number(id)));
    return updateTodo.returning();
  })
  .get("/tenants", () => {
    const tenants = db.query.tenants.findMany();
    return tenants;
  })
  .post("/tenants", (req) => {
    const { name } = req.body as {
      name: string;
    };
    const insertTenant = db.insert(tenants).values({
      name: name,
    });
    return insertTenant.returning();
  })
  .get("/tenants/:id", ({ params: { id } }) => {
    const tenant = db.query.tenants.findFirst({
      where: (t) => eq(t.id, id),
    });
    return tenant;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
