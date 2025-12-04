import { useState } from "react";

export default function TodoItem({ task, onDelete, onEdit, onSave, onToggle }) {
  const [editText, setEditText] = useState(task.text);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`todo-item ${task.completed ? "done" : ""}`}>

      {/* Checkbox */}
      <input
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {task.isEditing ? (
        <>
          <input
            className="edit-input"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <button className="save-btn" onClick={() => onSave(task.id, editText)}>Save</button>
        </>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <div className="actions">
            <button className="read-btn" onClick={() => setShowModal(true)}>Read</button>
            <button className="edit-btn" onClick={() => onEdit(task.id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h2 className="modal-title">📌 Task Details</h2>
            <p className="modal-text">{task.text}</p>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
