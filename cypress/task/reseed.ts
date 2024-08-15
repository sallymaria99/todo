import { mockTodos } from "../../prisma/seed/todos";

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function reseed() {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("Cannot reseed outside of test environment");
  }

  //rensa db
  await db.todo.deleteMany({});

  //seed db
  const todos = await mockTodos(db);
  console.log("Todos seeded:", todos);

  return null;
}
