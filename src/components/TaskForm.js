import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addTask({ id: Date.now(), title, desc, completed: false });
    setTitle('');
    setDesc('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group mb-2">
        <input type="text" className="form-control" placeholder="Task title"
          value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="input-group mb-2">
        <input type="text" className="form-control" placeholder="Description (optional)"
          value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
}

export default TaskForm;