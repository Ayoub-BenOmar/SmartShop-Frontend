import api from './axiosConfig';

export const getClients = async () => {
    const response = await api.get(`/admin/users`);
    return response.data;
};

export const getClientProfile = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
};

export const addClient = (clientData) => api.post(`/admin/create-client`, clientData);

export const updateClient = (id, clientData) => api.put(`/admin/users/${id}`, clientData);

export const deleteClient = (id) => api.delete(`/admin/users/${id}`);

// Client Side Endpoints
export const getMyProfile = async () => {
    const response = await api.get('/client/profile');
    return response.data;
};

export const getMyOrders = async () => {
    const response = await api.get('/client/orders');
    return response.data;
};

export const getMyStats = async () => {
    const response = await api.get('/client/stats');
    return response.data;
};