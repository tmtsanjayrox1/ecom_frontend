import api from './axiosConfig';

export const registerUser = (name, email, password, phone) =>
  api.post('/auth/register', { name, email, password, phone });

export const loginUser = (email, password) =>
  api.post('/auth/login', { email, password });
