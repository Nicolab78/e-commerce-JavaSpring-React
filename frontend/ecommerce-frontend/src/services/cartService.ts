import api from './api';
import type { Cart } from '../types/Carts';


export const CartService = {

    getCart: async (): Promise<Cart>=> {
        const response = await api.get('/cart');
        return response.data;
    },

    addToCart: async (productId: number, quantity: number = 1): Promise<Cart> => {
    const response = await api.post('/cart/items', {  
      productId,
      quantity
    });
    return response.data;
  },

    updateQuantity: async (cartItemId: number, quantity: number): Promise<Cart> => {
    const response = await api.put(`/cart/items/${cartItemId}`, null, {
      params: { quantity }
    });
    return response.data;
  },

    removeItem: async (cartItemId: number): Promise<Cart> => {
        const response = await api.delete(`/cart/items/${cartItemId}`);
        return response.data;
    },

    clearCart: async (): Promise<void> => {
        await api.delete('/cart');
    }
}