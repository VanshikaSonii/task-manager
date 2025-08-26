import React from 'react';

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className={task.completed ? 'text-decoration-line-through' : ''}>{task.title}</h5>
          {task.desc && <p>{task.desc}</p>}
        </div>
        <div>
          <button className="btn btn-sm btn-success me-2" onClick={() => toggleTask(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;