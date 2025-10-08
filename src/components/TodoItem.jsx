import { useState } from "react";
import "./TodoItem.css";

export default function TodoItem({ todo, onDelete, onToggle, editTodoTitle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todo);

  const handleEditClick = () => {
    if (isEditing) {
      editTodoTitle(todo.id, newTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />

      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span className={todo.completed ? "completed" : ""}>
          {todo.todo}
        </span>
      )}

      <button onClick={handleEditClick}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={onDelete}>Delete</button>
    </div>
    </>
  );
}
