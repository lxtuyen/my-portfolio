import axiosClient from "../configs/axios";
import { Profile } from "../types/profile";


export const profileService = {
  getProfile: async (): Promise<Profile | null> => {
    try {
      const res = await axiosClient.get("/profile");
      return res.data.data;
    } catch (error) {
      return null;
    }
  },

  saveProfile: async (data: Profile): Promise<Profile> => {
    const res = await axiosClient.post("/profile", data);
    return res.data.data;
  },
};
