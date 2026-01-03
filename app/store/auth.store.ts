import { create } from "zustand";
import { User } from "../types/user";
import { safeJSONParse } from "../utils/storage";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user:
    typeof window !== "undefined"
      ? safeJSONParse<User>(localStorage.getItem("user"))
      : null,

  token:
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null,

  login: ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);

    Cookies.set("accessToken", token, {
    expires: 1,
    sameSite: "strict",
    });

    set({ user, token });
  },

  logout: () => {
    localStorage.clear();
    Cookies.remove("accessToken");
    set({ user: null, token: null });
  },
}));
