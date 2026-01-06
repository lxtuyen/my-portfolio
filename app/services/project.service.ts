import axiosClient from "../configs/axios";


export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const res = await axiosClient.get("/projects");
    return res.data.data;
  },

  getProjectById: async (id: string): Promise<Project> => {
    const res = await axiosClient.get(`/projects/${id}`);
    return res.data.data;
  },

  createProject: async (data: Project): Promise<Project> => {
    const res = await axiosClient.post("/projects", data);
    return res.data.data;
  },

  updateProject: async (
    id: string,
    data: Partial<Project>
  ): Promise<Project> => {
    const res = await axiosClient.put(`/projects/${id}`, data);
    return res.data.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await axiosClient.delete(`/projects/${id}`);
  },
};
