import api from "./axios";

export const getTasks = () => api.get("/task");

export const createTask = (task) => api.post("/task", task);

export const updateTask = (id, task) => api.put(`/task/${id}`, task);

export const deleteTask = (id) => api.delete(`/task/${id}`);