
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9878/tasks',
});

export const getTasks = () => api.get('/');
export const createTask = (task: { title: string, description: string, status: string }) => api.post('/', task);
export const updateTask = (id: number, task: { title: string, description: string, status: string }) => api.put(`/${id}`, task);
export const deleteTask = (id: number) => api.delete(`/${id}`);
