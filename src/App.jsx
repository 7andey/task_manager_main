import React, { useState, useEffect, useMemo } from "react";
import TaskList from "./components/TaskList";
import NewTask from "./components/NewTask";
import { getTasksFromStorage, saveTasksToStorage } from "./utils/storage";
import "./styles/main.css";

const App = () => {
  // load tasks from localStorage initail
  const [tasks, setTasks] = useState(() => getTasksFromStorage());
  const [showModal, setShowModal] = useState(false); // Controls NewTask visibility
  const [editingTask, setEditingTask] = useState(null); // task being edited will be stored
  const [filter, setFilter] = useState("All"); // filters: All | Completed | Incomplete

  // Save whenever tasks change
  useEffect(() => {
    console.log("Saving tasks:", tasks);
    saveTasksToStorage(tasks);
  }, [tasks]);

  //add new task
  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now(), completed: false },
    ]);
    setShowModal(false);
  };

  //update existing task
  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setShowModal(false);
    setEditingTask(null);
  };

  //delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  //change task to completed status
  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  //editing a task
  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // Filter + Sort tasks
  const sortedAndFilteredTasks = useMemo(() => {
    const priorityMap = { High: 1, Medium: 2, Low: 3 };
    let filtered = [...tasks];

    if (filter === "Completed") {
      filtered = filtered.filter((t) => t.completed);
    } else if (filter === "Incomplete") {
      filtered = filtered.filter((t) => !t.completed);
    }

    return filtered.sort((a, b) => {
      const prioA = priorityMap[a.priority] || 4;
      const prioB = priorityMap[b.priority] || 4;
      const durA = parseInt(a.duration || "0", 10);
      const durB = parseInt(b.duration || "0", 10);

      if (prioA !== prioB) return prioA - prioB;
      return durA - durB;
    });
  }, [tasks, filter]);

  return (
    <div className="app-wrapper">
      <div className="header">
        <h1>Andey's Task Manager</h1>
        <button
          className="add-btn"
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
        >
          + Add Task
        </button>
      </div>

      <div className="filters">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
        <button
          className={filter === "Incomplete" ? "active" : ""}
          onClick={() => setFilter("Incomplete")}
        >
          Incomplete
        </button>
      </div>

      <TaskList
        tasks={sortedAndFilteredTasks}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
        onEdit={handleEdit}
      />

      {showModal && (
        <NewTask
          onSubmit={editingTask ? updateTask : addTask}
          initialData={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
