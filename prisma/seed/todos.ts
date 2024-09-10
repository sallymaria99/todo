import { PrismaClient } from "@prisma/client";

export async function mockTodos(db: PrismaClient) {
  console.log("Starting mockTodos...");
  const todos = await db.todo.createMany({
    data: [
      { title: "hej", date: "2019" },
      { title: "tja", date: "2019" },
    ],
  });

  console.log("Todos created with createMany:", todos);

  const allTodos = await db.todo.findMany();
  console.log("Todos in database after creation:", allTodos);

  return allTodos;
}
