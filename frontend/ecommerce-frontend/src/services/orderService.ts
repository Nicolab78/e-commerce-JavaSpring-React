import api from './api';
import type { Order } from '../types/Order';

export const OrderService = {

    createOrder: async (shippingAddress: string): Promise<Order> => {
        const response = await api.post('/orders' , {
            shippingAddress
        });
        return response.data;
    },


    getUserOrders: async (): Promise<Order[]> => {
        const response = await api.get('/orders');
        return response.data;
    },

    getOrderById: async (orderId: number): Promise<Order> => {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    }

}