import api from './api';
import type { Comment, CreateCommentDto, UpdateCommentDto } from '../types/Comment';

export const commentService = {
  createComment: async (
    productId: number,
    userId: number,
    data: CreateCommentDto
  ): Promise<Comment> => {
    const response = await api.post(`/comments/product/${productId}/user/${userId}`, data);
    return response.data;
  },

  getCommentsByProduct: async (productId: number): Promise<Comment[]> => {
    const response = await api.get(`/comments/product/${productId}`);
    return response.data;
  },

  getCommentsByUser: async (userId: number): Promise<Comment[]> => {
    const response = await api.get(`/comments/user/${userId}`);
    return response.data;
  },

  getAllComments: async (): Promise<Comment[]> => {
    const response = await api.get('/comments/all');
    return response.data;
  },

  getCommentById: async (id: number): Promise<Comment> => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  updateComment: async (
    commentId: number,
    userId: number,
    data: UpdateCommentDto
  ): Promise<Comment> => {
    const response = await api.put(`/comments/${commentId}/user/${userId}`, data);
    return response.data;
  },

  deleteComment: async (commentId: number, userId: number): Promise<void> => {
    await api.delete(`/comments/${commentId}/user/${userId}`);
  },

  getAverageRating: async (productId: number): Promise<number> => {
    const response = await api.get(`/comments/product/${productId}/average`);
    return response.data;
  },

  getCommentCount: async (productId: number): Promise<number> => {
    const response = await api.get(`/comments/product/${productId}/count`);
    return response.data;
  },
};