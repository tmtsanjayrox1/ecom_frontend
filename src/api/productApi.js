import api from './axiosConfig';

export const getAllProducts = () => api.get('/products');

export const getProductById = (id) => api.get(`/products/${id}`);

export const getProductsByBrand = (brand) => api.get(`/products/brand/${brand}`);
