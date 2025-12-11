import api from './api';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '../types/Category';

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories/all');
    return response.data;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await api.post('/categories/create', data);
    return response.data;
  },

  updateCategory: async (id: number, data: UpdateCategoryDto): Promise<Category> => {
    const response = await api.put(`/categories/update/${id}`, data);
    return response.data;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/categories/delete/${id}`);
  },
};