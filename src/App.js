import React, { useState, useEffect, useContext } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import { ThemeContext, ThemeProvider } from './components/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const toggleTask = (id) =>
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed' && !task.completed) return false;
    if (filter === 'Pending' && task.completed) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Router>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>Task Manager</h1>
            <button className="btn btn-secondary" onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <TaskForm addTask={addTask} />
          <SearchBar search={search} setSearch={setSearch} />
          <FilterBar filter={filter} setFilter={setFilter} />

          <nav className="mb-3">
            <Link className="btn btn-outline-primary me-2" to="/">All Tasks</Link>
            <Link className="btn btn-outline-success" to="/completed">Completed Tasks</Link>
          </nav>

          <Routes>
            <Route path="/" element={<TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />} />
            <Route path="/completed" element={<TaskList tasks={tasks.filter(t => t.completed)} toggleTask={toggleTask} deleteTask={deleteTask} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default AppWrapper;