import api from './api';
import type { Order, CreateOrderDto, UpdateOrderDto } from '../types/Order';

export const orderService = {
  createOrder: async (userId: number, data: CreateOrderDto): Promise<Order> => {
    const response = await api.post(`/orders/${userId}/create`, data);
    return response.data;
  },

  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/all');
    return response.data;
  },

  getOrdersByUserId: async (userId: number): Promise<Order[]> => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: number, data: UpdateOrderDto): Promise<Order> => {
    const response = await api.put(`/orders/${id}/status`, data);
    return response.data;
  },

  deleteOrder: async (id: number): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },
};