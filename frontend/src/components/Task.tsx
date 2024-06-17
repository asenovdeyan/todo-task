import React from 'react';

interface TaskProps {
  task: {
    id: number;
    title: string;
    description: string;
    status: string;
  };
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="task">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
      </div>
      <div>
        <button className="update" onClick={() => onUpdate(task.id)}>Update</button>
        <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default Task;
