import { getMe } from "@/api/auth/auth.api";
import { hydrateAuthStore } from "@/store/use-auth-store";

const isBrowser = typeof window !== "undefined";
const tokenKey = "token";

export const setAuthToken = (token: string) => {
  if (isBrowser) {
    localStorage.setItem(tokenKey, token);
  }
};

export const removeAuthToken = () => {
  if (isBrowser) {
    localStorage.removeItem(tokenKey);
  }
};

export const getAuthToken = () => {
  if (isBrowser) {
    return localStorage.getItem(tokenKey);
  }
  return null;
};

export const generateAuthHeaders = () => {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUser = async () => {
  const user = await getMe();
  hydrateAuthStore(user);
};

export const logoutUser = () => {
  hydrateAuthStore(null);
};
