import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User } from '../types/User';
import type { LoginDto, RegisterDto, AuthResponseDto } from '../types/Auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
      setToken(currentUser.token);
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginDto) => {
  try {
    const response: AuthResponseDto = await authService.login(credentials);
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('tokenType', response.type);  
    localStorage.setItem('user', JSON.stringify(response.user));
    
    setUser(response.user);
    setToken(response.token);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const register = async (data: RegisterDto) => {
  try {
    const response: AuthResponseDto = await authService.register(data);
    
    localStorage.setItem('token', response.token);
    localStorage.setItem('tokenType', response.type);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    setUser(response.user);
    setToken(response.token);
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};