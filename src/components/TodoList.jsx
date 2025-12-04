import TodoItem from "./TodoItem";

export default function TodoList({ tasks, onDelete, onEdit, onSave, onToggle }) {
  return (
    <div className="todo-list-section">
      {tasks.length === 0 && <p>No tasks yet...</p>}
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onSave={onSave}
          onToggle={onToggle} // ✅ pass toggle down
        />
      ))}
    </div>
  );
}
