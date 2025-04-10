import React from "react";

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    // add 'completed' class if the task is marked done
    <tr className={task.completed ? "completed" : ""}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.priority}</td>
      <td>{task.duration}</td>
      <td>{task.dueDate}</td>
      <td>{task.completed ? "Done" : "Pending"}</td>
      <td>
        {/* Toggle completion */}
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? "Undo" : "Done"}
        </button>
        {/* Edit task */}
        <button onClick={() => onEdit(task)}>Edit</button>
        {/* Delete task */}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskItem;
