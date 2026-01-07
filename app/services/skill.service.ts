import axiosClient from "../configs/axios";

export const skillService = {
  getSkills: async (): Promise<Skill[]> => {
    const res = await axiosClient.get("/skills");
    return res.data.data;
  },

  createSkill: async (data: Skill): Promise<Skill> => {
    const res = await axiosClient.post("/skills", data);
    return res.data.data;
  },

  updateSkill: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    const res = await axiosClient.put(`/skills/${id}`, data);
    return res.data.data;
  },

  deleteSkill: async (id: string): Promise<void> => {
    await axiosClient.delete(`/skills/${id}`);
  },
};
