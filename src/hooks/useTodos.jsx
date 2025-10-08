import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://dummyjson.com/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(5);
  const [totalTodos, setTotalTodos] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const skip = (currentPage - 1) * limitPerPage;
        const result = await fetch(`${API_URL}?limit=${limitPerPage}&skip=${skip}`);
        const data = await result.json();
        setTodos(data.todos || []);
        setTotalTodos(data.total || 0);
      } catch {
        setError("Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [currentPage, limitPerPage]);

  const goToNextPage = () => {
    const totalPages = Math.ceil(totalTodos / limitPerPage);
    setTotalPages(totalPages)
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const setLimitPerPageHandler = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
      setTotalTodos((prev) => prev -1);
    } catch {
      setError("Failed to delete todo");
    }
  };

const toggleTodo = async (id) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  if (!todo.isLocal) {
    try {
      await axios.put(`${API_URL}/${id}`, { completed: !todo.completed });
    } catch {
      setError("Failed to update todo");
      return;
    }
  }

  setTodos(
    todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
  );
};


const addTodo = (title) => {
  const newTodo = {
    id: Date.now(),
    todo: title,
    completed: false,
    isLocal: true,
  };
  setTodos([newTodo, ...todos]);
  setTotalTodos((prev) => prev + 1);
};

const editTodoTitle = async (id, newTitle) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  if (!todo.isLocal) {
    try {
      await axios.put(`${API_URL}/${id}`, { todo: newTitle });
    } catch {
      setError("Failed to edit todo");
      return;
    }
  }

  setTodos(todos.map((t) => (t.id === id ? { ...t, todo: newTitle } : t)));
};

  return {
    todos: filteredTodos,
    isLoading,
    error,
    deleteTodo,
    toggleTodo,
    addTodo,
    editTodoTitle,
    searchTerm,
    setSearchTerm,
    currentPage,
    limitPerPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    setLimit: setLimitPerPageHandler,
  };
}