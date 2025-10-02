import "./TodoItem.css";

export default function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <>
      <div className="todo-item">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        <span className={todo.completed ? "completed" : ""}>{todo.todo}</span>
        <button onClick={onDelete}>Delete</button>
      </div>
    </>
  );
}
