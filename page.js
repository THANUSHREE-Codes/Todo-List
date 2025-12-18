import React, { useState } from 'react';

import './styles.css';


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  function addTask() {
    if (text.trim() === '') return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
    setText('');
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  return (
    <main className="todo-container">
      <h1>🌈 My Todo List</h1>

      <div className="input-box">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add new task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-text">No tasks yet 🚀</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
