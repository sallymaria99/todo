"use client";
import { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos } from "../actions/todoActions";

interface Todo {
  id: number;
  title: string;
  date: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos: Todo[] = await getTodos();
      setTodos(fetchedTodos);
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    await createTodo(newTodoTitle);
    setNewTodoTitle("");
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Todo´s</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </>
  );
}
