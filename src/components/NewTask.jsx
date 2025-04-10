import React, { useState, useEffect } from "react";
import "../styles/main.css";

const NewTask = ({ onSubmit, initialData = {}, onClose }) => {
  //form initailised
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [duration, setDuration] = useState("");
  const [dueDate, setDueDate] = useState("");

  //fields required to pop when editing the existing task
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setPriority(initialData.priority || "Low");
      setDuration(initialData.duration || "");
      setDueDate(initialData.dueDate || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //validation for title
    if (!title.trim()) return alert("Title is required!");
    //validation duration - positive value
    if (duration && parseInt(duration) < 0)
      return alert("Duration must be a positive number");

    //Task object created
    const task = {
      id: initialData?.id || null,
      title,
      description,
      priority,
      duration,
      dueDate,
      completed: initialData?.completed || false,
    };

    onSubmit(task);
  };

  // Today's date in YYYY-MM-DD and cant pick past dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initialData && initialData.id ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Title*</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {/* Optional description */}
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Priority selection */}
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          {/* Estimated Duration */}
          <label>Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            placeholder="E.g. 30"
          />
          {/* Due date selection */}
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
          />

          {/* Form action buttons */}
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTask;
