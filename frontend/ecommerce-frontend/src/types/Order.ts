import type { User } from './User';
import type { Product } from './Product';

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user: User;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  orderDate: string;
  shippingAddress: string;
}

export interface CreateOrderDto {
  shippingAddress: string;
}

export interface UpdateOrderDto {
  status: string;
}