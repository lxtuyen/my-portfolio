// src/stores/profile.store.ts
import { create } from "zustand";
import { Profile } from "../types/profile";
import { profileService } from "../services/profile.service";

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;

  fetchProfile: () => Promise<void>;
  saveProfile: (data: Profile) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  loading: false,
  error: null,

  // GET /profile
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await profileService.getProfile();
      set({ profile, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch profile",
        loading: false,
      });
    }
  },

  // POST /profile (create or update)
  saveProfile: async (data: Profile) => {
    set({ loading: true, error: null });
    try {
      const profile = await profileService.saveProfile(data);
      set({ profile, loading: false });
    } catch (err) {
      set({
        error: "Failed to save profile",
        loading: false,
      });
    }
  },
}));
