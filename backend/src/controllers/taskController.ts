import { Request, Response } from 'express';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

let tasks: Task[] = [];
let idCounter = 0;

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json(tasks);
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, status } = req.body as Omit<Task, 'id'>;
  const newTask: Task = { id: idCounter++, title, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, status } = req.body as Omit<Task, 'id'>;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex !== -1) {
    tasks[taskIndex] = { id: parseInt(id), title, description, status };
    res.status(200).json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(200).json({ message: 'Task deleted' });
};
