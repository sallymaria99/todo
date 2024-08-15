import { PrismaClient } from "@prisma/client";

export async function mockTodos(db: PrismaClient) {
  await db.todo.createMany({
    data: [
      { title: "hej", date: "2019" },
      { title: "tja", date: "2017" },
    ],
  });

  const todos = await db.todo.findMany();
  return todos;
}
