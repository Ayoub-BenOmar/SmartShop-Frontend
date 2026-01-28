import api from './axiosConfig';

export const getProducts = () => api.get('/client/products').then(res => res.data);

// Admin Endpoints
export const getAdminProducts = (page = 0, size = 10) => api.get(`/admin/products?page=${page}&size=${size}`).then(res => res.data);
export const getProductById = (id) => api.get(`/admin/products/${id}`).then(res => res.data);
export const createProduct = (productData) => api.post('/admin/create-product', productData);
export const updateProduct = (id, productData) => api.put(`/admin/update-product/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/admin/delete-product/${id}`);