import api from './axiosConfig';

const getUserId = () => localStorage.getItem('userId');

export const checkout = (addressId) =>
  api.post(`/checkout/${getUserId()}`, null, { params: addressId ? { addressId } : {} });

export const getOrderById = (orderId) => api.get(`/orders/${orderId}`);

export const getOrdersForUser = () => api.get(`/orders/user/${getUserId()}`);
