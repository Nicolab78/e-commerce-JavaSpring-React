import api from "./api";
import type { Category } from "../types/Category";

export const CategoryService = {

    getAllCategories: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>("/categories/all");
        return response.data;
    },

    getCategoryById: async (id: number): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },

    createCategory: async (category: Omit<Category, "id">): Promise<Category> => {
        const response = await api.post<Category>("/categories/create", category);
        return response.data;
    },

    uppdateCategory: async (id: number, category: Category): Promise<Category> => {
        const response = await api.put(`/categories/update/${id}`, category);
        return response.data;
    },

    deleteCategory: async (id: number): Promise<void> => {
        await api.delete(`/categories/delete/${id}`);
    },
}