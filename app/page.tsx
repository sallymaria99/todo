"use client";
import { useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updatedTodoTitle,
} from "./actions/todoActions";

interface Todo {
  id: number;
  title: string;
  date: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDate, setNewTodoDate] = useState("");
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos: Todo[] = await getTodos();
      setTodos(fetchedTodos);
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodoTitle && newTodoDate) {
      await createTodo(newTodoTitle, newTodoDate);
      setNewTodoTitle("");
      setNewTodoDate("");
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  };

  const handleEditTodo = async (id: number) => {
    const newTitle = prompt("Enter new Title:");
    if (newTitle) {
      await updatedTodoTitle(id, newTitle);
      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
    }
  };

  const handleFilter = async () => {
    const filteredTodos = await getTodos(filterDate);
    setTodos(filteredTodos);
  };

  const handleClearFilter = async () => {
    const allTodos = await getTodos();
    setTodos(allTodos);
    setFilterDate("");
  };
  /*   const handleToggleCompleted = async (id: number) => {
    await toggleTodoCompleted(id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
  }; */

  return (
    <>
      <h1>Todo´s</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <input
        type="date"
        value={newTodoDate}
        onChange={(e) => setNewTodoDate(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <div>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filter by Date</button>
        <button onClick={handleClearFilter}>Clear filter</button>
      </div>

      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {/*    <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
            /> */}
              <span
              /*   style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }} */
              >
                {todo.date}: {todo.title}
              </span>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
