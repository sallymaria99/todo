"use server";

import db from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  const todos = await db.todo.findMany();
  return todos;
}

export async function createTodo(title: string): Promise<void> {
  await db.todo.create({
    data: {
      title,
      date: new Date().toISOString(),
    },
  });
}

export async function deleteTodo(id: number): Promise<void> {
  await db.todo.delete({
    where: {
      id,
    },
  });
}

export async function updateTodo(id: number, newTitle: string, date: string) {
  const todo = await db.todo.update({
    where: {
      id,
    },
    data: {
      title: newTitle,
    },
  });

  revalidatePath("/todos");
  return updateTodo;
}
