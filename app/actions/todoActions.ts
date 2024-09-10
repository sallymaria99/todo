"use server";

import db from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function getTodos(filterDate?: string) {
  if (filterDate) {
    return await db.todo.findMany({
      where: {
        date: filterDate,
      },
    });
  } else {
    return await db.todo.findMany();
  }
}

export async function createTodo(title: string, date: string): Promise<void> {
  await db.todo.create({
    data: {
      title,
      date,
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

  revalidatePath("/");
  return updateTodo;
}

export async function updatedTodoTitle(id: number, newTitle: string) {
  await db.todo.update({
    where: { id },
    data: { title: newTitle },
  });
  revalidatePath("/");
}

/* export async function toggleTodoCompleted(id: number) {
  const todo = await db.todo.findUnique({ where: { id } });
  if (!todo) return;

  await db.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  revalidatePath("/");
} */
