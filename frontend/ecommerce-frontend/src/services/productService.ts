import api from "./api";
import type { Product } from "../types/Product";

export const ProductService = {

    getAllProducts: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>("/products/all");
        return response.data;
    },

    getProductById: async (id: number): Promise<Product> => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    createProduct: async (product: Omit<Product,"id">): Promise<Product> => {
        const response = await api.post<Product>("/products/create", product);
        return response.data;
    },

    updateProduct: async (id: number, product: Product): Promise<Product> => {
        const response = await api.put(`/products/update/${id}`, product);
        return response.data;
    },

  
    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/delete/${id}`);
    },

    getFeaturedProducts: async (limit: number = 8): Promise<Product[]> => {
        const allProducts = await ProductService.getAllProducts();
        return allProducts.slice(0, limit);
    },

}