import api from './api';
import type { Product, CreateProductDto, UpdateProductDto } from '../types/Product';

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/all');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  createProduct: async (data: CreateProductDto): Promise<Product> => {
    const response = await api.post('/products/create', data);
    return response.data;
  },

  updateProduct: async (id: number, data: UpdateProductDto): Promise<Product> => {
    const response = await api.put(`/products/update/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/delete/${id}`);
  },

  getBestSellers: async (limit: number = 8): Promise<Product[]> => {
    const response = await api.get(`/products/bestsellers?limit=${limit}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },
};