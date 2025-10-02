import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import "./TodoList.css";

export default function TodoList() {
  const { todos, isLoading, error, deleteTodo, toggleTodo, addTodo } =
    useTodos();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="todo-list-container">
        <h1>Todo List</h1>
        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        <AddTodoForm onAdd={addTodo} />
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
      </div>
    </>
  );
}
