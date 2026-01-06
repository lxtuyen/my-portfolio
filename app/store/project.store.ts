import { create } from "zustand";
import { projectService } from "../services/project.service";

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;

  // actions
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  addProject: (data: Project) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  clearSelectedProject: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,

  /* ================= FETCH LIST ================= */
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const projects = await projectService.getProjects();
      set({ projects, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch projects",
        loading: false,
      });
    }
  },

  /* ================= FETCH DETAIL ================= */
  fetchProjectById: async (id) => {
    set({ loading: true, error: null });
    try {
      const project = await projectService.getProjectById(id);
      set({ selectedProject: project, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch project",
        loading: false,
      });
    }
  },

  /* ================= CREATE ================= */
  addProject: async (data) => {
    set({ loading: true, error: null });
    try {
      const project = await projectService.createProject(data);
      set((state) => ({
        projects: [project, ...state.projects],
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Failed to create project",
        loading: false,
      });
    }
  },

  /* ================= UPDATE ================= */
  updateProject: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await projectService.updateProject(id, data);
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === id ? updated : p
        ),
        selectedProject: updated,
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Failed to update project",
        loading: false,
      });
    }
  },

  /* ================= DELETE ================= */
  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      await projectService.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Failed to delete project",
        loading: false,
      });
    }
  },

  clearSelectedProject: () => set({ selectedProject: null }),
}));
