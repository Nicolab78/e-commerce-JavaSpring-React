import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartService } from '../services/cartService';
import type { Cart } from '../types/Carts';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);
      const data = await CartService.getCart();
      setCart(data);
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      console.log('isAuthenticated:', isAuthenticated);
  console.log('Token:', localStorage.getItem('accessToken'));
    refreshCart();
  }, [isAuthenticated]);

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      const updatedCart = await CartService.addToCart(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: number, quantity: number) => {
    try {
      const updatedCart = await CartService.updateQuantity(cartItemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  };

  const removeItem = async (cartItemId: number) => {
    try {
      const updatedCart = await CartService.removeItem(cartItemId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await CartService.clearCart();
      setCart({ id: cart?.id || 0, items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Erreur lors du vidage du panier:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateQuantity, removeItem, clearCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};