import api from './axiosConfig';

const getUserId = () => localStorage.getItem('userId');

export const getCart = () => api.get(`/cart/${getUserId()}`);

export const addToCart = (productId, quantity = 1) =>
  api.post(`/cart/${getUserId()}/items`, null, { params: { productId, quantity } });

export const updateCartItemQuantity = (productId, quantity) =>
  api.put(`/cart/${getUserId()}/items/${productId}`, null, { params: { quantity } });

export const removeFromCart = (productId) =>
  api.delete(`/cart/${getUserId()}/items/${productId}`);
