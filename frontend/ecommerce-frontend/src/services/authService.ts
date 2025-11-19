import api from "./api";
import type { User } from "../types/User";

export const AuthService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/users");
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  register: async (userData: Omit<User, "id" | "role" | "enabled"> & { password: string }): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    const response = await api.post("/auth/register", userData);
    const data = response.data;

    const user: User = {
        id: data.id, 
        username: data.username,
        email: data.email,
        role: data.role,
        enabled: true,
        phoneNumber: data.phoneNumber,
    };

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return { user, accessToken: data.accessToken, refreshToken: data.refreshToken };
  },

  login: async (email: string, password: string): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    const response = await api.post("/auth/login", { email, password });
    const data = response.data;

    const user: User = {
    id: data.id, 
    username: data.username,
    email: data.email,
    role: data.role,
    enabled: true,
    phoneNumber: data.phoneNumber, 
  };

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return { user, accessToken: data.accessToken, refreshToken: data.refreshToken };
  },

  updateUser: async (id: number, user: Partial<User>): Promise<User> => {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};