import { apiFetch } from "./client";

export const AuthApi = {
  async register(email: string, password: string) {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  async login(email: string, password: string) {
    return apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};
