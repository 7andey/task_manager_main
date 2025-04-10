import React from 'react'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {

  return (
    <div className="task-list-scroll">
  <table className="task-table">
    <thead>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Duration (min)</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </tbody>
  </table>
</div>

    
  )
}

export default TaskList