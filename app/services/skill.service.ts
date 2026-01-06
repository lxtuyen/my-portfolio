import axiosClient from "../configs/axios";

export const skillService = {
  /**
   * GET /api/skills
   */
  getSkills: async (): Promise<Skill[]> => {
    const res = await axiosClient.get("/skills");
    return res.data.data;
  },

  /**
   * POST /api/skills
   */
  createSkill: async (data: Skill): Promise<Skill> => {
    const res = await axiosClient.post("/skills", data);
    return res.data.data;
  },

  /**
   * PUT /api/skills/:id
   */
  updateSkill: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    const res = await axiosClient.put(`/skills/${id}`, data);
    return res.data.data;
  },

  /**
   * DELETE /api/skills/:id
   */
  deleteSkill: async (id: string): Promise<void> => {
    await axiosClient.delete(`/skills/${id}`);
  },
};
