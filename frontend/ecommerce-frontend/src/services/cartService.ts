import api from './api';
import type { Cart, AddToCartDto, UpdateCartItemDto } from '../types/Carts';

export const cartService = {
  getCart: async (userId: number): Promise<Cart> => {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  },

  addToCart: async (userId: number, data: AddToCartDto): Promise<Cart> => {
    const response = await api.post(`/cart/${userId}/add`, data);
    return response.data;
  },

  updateCartItem: async (
    userId: number,
    cartItemId: number,
    data: UpdateCartItemDto
  ): Promise<Cart> => {
    const response = await api.put(`/cart/${userId}/item/${cartItemId}`, data);
    return response.data;
  },

  removeFromCart: async (userId: number, cartItemId: number): Promise<Cart> => {
    const response = await api.delete(`/cart/${userId}/item/${cartItemId}`);
    return response.data;
  },

  clearCart: async (userId: number): Promise<void> => {
    await api.delete(`/cart/${userId}/clear`);
  },
};