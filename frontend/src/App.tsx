import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import Task from './components/Task';
import './index.css';

// Define the Todo task type
interface TaskType {
  id: number;
  title: string;
  description: string;
  status: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreate = async () => {
    if (title && description) {
      const newTask: Omit<TaskType, 'id'> = { title, description, status: 'pending' };
      try {
        await createTask(newTask);
        fetchTasks();
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const handleUpdate = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const updatedTask: TaskType = { ...task, status: task.status === 'pending' ? 'completed' : 'pending' };
      try {
        await updateTask(id, updatedTask);
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
      />
      <input 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" 
      />
      <button className="add" onClick={handleCreate}>Add Task</button>
      <div>
        {tasks.map((task) => (
          <Task 
            key={task.id} 
            task={task} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;
