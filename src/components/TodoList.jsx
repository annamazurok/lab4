import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList({todos, deleteTodo, toggleTodo, editTodoTitle}) {
  return (
    <>
      {todos.length === 0 ? (
        <p>No todos found.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onToggle={() => toggleTodo(todo.id)}
            editTodoTitle={editTodoTitle}
          />
        ))
      )}
    </>
  );
}
