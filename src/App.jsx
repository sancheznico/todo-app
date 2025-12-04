import { useState } from "react";
import TodoList from "./components/TodoList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [taskInput, setTaskInput] = useState("");

  // Add task(s)
  function handleAdd() {
  if (categoryInput.trim() === "" || taskInput.trim() === "") return;

  const taskArray = taskInput
    .split(",")
    .map(t => t.trim())
    .filter(t => t !== "");

  const newItems = taskArray.map(text => ({
    id: Date.now() + Math.random(),
    category: categoryInput,
    text,
    isEditing: false,
    completed: false,
  }));

  setTasks(prev => [...prev, ...newItems]);

  // ✅ Clear both inputs after adding
  setTaskInput("");
  setCategoryInput("");
}


  function handleDelete(id) {
    setTasks(prev => prev.filter(item => item.id !== id));
  }

  function handleEdit(id) {
    setTasks(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  }

  function handleSave(id, newText) {
    setTasks(prev =>
      prev.map(item =>
        item.id === id ? { ...item, text: newText, isEditing: false } : item
      )
    );
  }

  function handleToggle(id) {
    setTasks(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  // Group tasks by category
  const categories = [...new Set(tasks.map(t => t.category))];

  return (
    <div className="container">
      <h1 className="main-title">ToDo App</h1>

      {/* Category input */}
      <input
        type="text"
        placeholder="Enter Title "
        value={categoryInput}
        onChange={e => setCategoryInput(e.target.value)}
        className="category-input"
      />

      {/* Task input + Add button */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter tasks "
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
        />
        <button className="add-btn" onClick={handleAdd}>ADD TASK</button>
      </div>

      {/* Render tasks grouped by category */}
      {categories.map(cat => {
  const catTasks = tasks.filter(t => t.category === cat);
  const total = catTasks.length;
  const completedCount = catTasks.filter(t => t.completed).length;
  const allCompleted = total > 0 && completedCount === total;

  return (
    <div key={cat} className="category-section">
      <details>
        <summary>
          {/* Category title with strikethrough if all completed */}
          <span className={allCompleted ? "category-done" : ""}>
            {cat}
          </span>

          {/* Task counter on the right */}
          <span className="category-counter">
            {completedCount}/{total} {allCompleted && "✅"}
          </span>
        </summary>

        <TodoList
          tasks={catTasks}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onSave={handleSave}
          onToggle={handleToggle}
        />
      </details>
    </div>
  );
})}




    </div>
  );
}
