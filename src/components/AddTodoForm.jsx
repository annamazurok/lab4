import { useState } from "react";
import "./AddTodoForm.css";

export default function AddTodoForm({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <>
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="New task..."
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
