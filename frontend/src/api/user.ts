import { apiFetch } from "./client";

export const UserApi = {
  async getMe() {
    return apiFetch("/users/me", {
      method: "GET",
    });
  },

  async updateMe(profileData: any) {
    return apiFetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(profileData),
    });
  },
};
