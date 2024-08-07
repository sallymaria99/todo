import { PrismaClient } from "@prisma/client";

export async function mockTodos(db: PrismaClient) {
  await db.todo.createMany({
    data: [
      { id: 1, title: "hej", date: "2019" },
      { id: 2, title: "hej", date: "2019" },
    ],
  });
}
