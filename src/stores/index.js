import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      token: null,

      // Actions
      login: (userData) =>
        set({
          user: userData,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      updateUser: (userData) =>
        set({
          user: userData,
        }),
    }),
    {
      name: "auth-storage", // unique name
    }
  )
);

export default useAuthStore;
