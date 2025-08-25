import { useAuth } from "./useAuth";

export function useRole() {
  const { user } = useAuth();

  const isAuthenticated = !!user;
  const role = user?.role || null;

  return {
    role,
    isAuthenticated,
    isUser: role === "user",
    isAuthor: role === "author",
    isAdmin: role === "admin",
  };
}
