/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.tsx
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api_login";

interface AuthorProfile {
  id: number;
  bio: string;
}

interface UserProfile {
  username: string;
  email: string;
  role: "user" | "author" | "admin";
  author_profile?: AuthorProfile | null;
}

interface AuthResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (username: string, password: string) => Promise<AuthResult>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) => Promise<AuthResult>;
  fetchProfile: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number; // expiration timestamp
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      scheduleTokenRefresh(token);
      fetchProfile();
    }
    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
    };
  }, []);

  // 🔹 Updated login
  const login = async (username: string, password: string): Promise<AuthResult> => {
    try {
      const res = await api.post<{ access: string; refresh: string }>(
        "auth/login/",
        { username, password }
      );

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      scheduleTokenRefresh(res.data.access);
      await fetchProfile();

      return { success: true, message: "Login successful" };
    } catch (error: any) {
      const msg =
        error.response?.data?.detail ||
        "Login failed. Please check your credentials.";
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    if (refreshTimer) clearTimeout(refreshTimer);
    setUser(null);
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ): Promise<AuthResult> => {
    try {
      await api.post("auth/register/", {
        username,
        email,
        password,
        first_name,
        last_name,
      });
      await login(username, password);
      return { success: true, message: "Registration successful" };
    } catch (error: any) {
      const msg =
        error.response?.data?.detail ||
        "Registration failed. Please try again.";
      return { success: false, message: msg };
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get<UserProfile>("users/profile/");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setUser(null);
    }
  };

  const scheduleTokenRefresh = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const expiry = decoded.exp * 1000;
      const now = Date.now();

      const timeout = expiry - now - 60 * 1000; // refresh 1 min before expiry

      if (timeout > 0) {
        if (refreshTimer) clearTimeout(refreshTimer);
        const timer = setTimeout(refreshAccessToken, timeout);
        setRefreshTimer(timer);
      }
    } catch (err) {
      console.error("Failed to decode token", err);
      logout();
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) return logout();

      const res = await api.post<{ access: string }>(
        "auth/token/refresh/",
        { refresh }
      );

      localStorage.setItem("access_token", res.data.access);
      scheduleTokenRefresh(res.data.access);
    } catch (err) {
      console.error("Refresh token failed", err);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
