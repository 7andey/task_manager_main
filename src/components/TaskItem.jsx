import React from 'react'

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  return (
    <tr className={task.completed ? 'completed' : ''}>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.priority}</td>
      <td>{task.duration}</td>
      <td>{task.dueDate}</td>
      <td>{task.completed ? 'Done' : 'Pending'}</td>
      <td>
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Undo' : 'Done'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </td>
    </tr>
  )
}

export default TaskItem