import type { User } from './User';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface AuthResponseDto {
  token: string;
  type: string;
  user: User;
}