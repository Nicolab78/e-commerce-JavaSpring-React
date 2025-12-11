export interface Comment {
  id: number;
  userId: number;
  username: string;
  productId: number;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateCommentDto {
  rating: number;
  comment: string;
}

export interface UpdateCommentDto {
  rating: number;
  comment: string;
}