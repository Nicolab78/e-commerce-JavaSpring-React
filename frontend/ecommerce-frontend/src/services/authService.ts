import api from "./api";
import type { User } from "../types/User";

export const AuthService = {

    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>("/auth/users");
        return response.data;
    },

    getUserById: async (id: number): Promise<User> => {
        const response = await api.get<User>(`/auth/users/${id}`);
        return response.data;
    },

    register : async (user: Omit<User, "id">): Promise<User> => {
        const response = await api.post<User>("/auth/register", user);
        return response.data;
    },

    updateUser: async (id: number, user: User): Promise<User> => {
        const response = await api.put(`/auth/users/update/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: number): Promise<void> => {
        await api.delete(`/auth/users/delete/${id}`);
    },

}