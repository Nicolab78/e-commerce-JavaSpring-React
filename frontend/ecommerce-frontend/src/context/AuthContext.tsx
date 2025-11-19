import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("[AuthContext] init -> lecture localStorage");
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const parsed: User = JSON.parse(raw);
        console.log("[AuthContext] user restauré:", parsed);
        setUser(parsed);
      } catch (e) {
        console.error("[AuthContext] erreur parse user:", e);
        localStorage.removeItem("user");
      }
    } else {
      console.log("[AuthContext] aucun user en localStorage");
    }
  }, []);

  const login = (u: User) => {
    console.log("[AuthContext] login:", u);
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    console.log("[AuthContext] logout");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};