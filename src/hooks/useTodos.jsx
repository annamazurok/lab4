import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(API_URL);
        const data = await result.json();
        setTodos(data.todos || []);
      } catch {
        setError("Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch {
      setError("Failed to delete todo");
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed,
      });

      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      todo: title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  return { todos, isLoading, error, deleteTodo, toggleTodo, addTodo };
}
