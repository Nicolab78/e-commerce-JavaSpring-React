import api from './api';
import type { Comment } from '../types/Comment';

export class CommentService {
  static async getCommentsByProductId(productId: number): Promise<Comment[]> {
    const response = await api.get(`/comments/products/${productId}`);
    return response.data;
  }

  static async addComment(productId: number, userId: number, rating: number, comment: string): Promise<Comment> {
    const response = await api.post(`/comments/products/${productId}/users/${userId}`, {
      rating,
      comment
    });
    return response.data;
  }

  static async updateComment(commentId: number, userId: number, rating: number, comment: string): Promise<Comment> {
    const response = await api.put(`/comments/${commentId}/users/${userId}`, {
      rating,
      comment
    });
    return response.data;
  }

  static async deleteComment(commentId: number, userId: number): Promise<void> {
    await api.delete(`/comments/${commentId}/users/${userId}`);
  }

  static async getAverageRating(productId: number): Promise<number> {
    const response = await api.get(`/comments/products/${productId}/rating`);
    return response.data;
  }

  static async getCommentCount(productId: number): Promise<number> {
    const response = await api.get(`/comments/products/${productId}/count`);
    return response.data;
  }
}