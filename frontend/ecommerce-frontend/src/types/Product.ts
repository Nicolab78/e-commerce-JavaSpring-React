import type { Category } from './Category';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  category: Category;
  createdAt?: string;
  updatedAt?: string;
}