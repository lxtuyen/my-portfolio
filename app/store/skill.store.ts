import { create } from "zustand";
import { skillService } from "../services/skill.service";

interface SkillState {
  skills: Skill[];
  loading: boolean;
  error: string | null;

  fetchSkills: () => Promise<void>;
  addSkill: (data: Skill) => Promise<void>;
  updateSkill: (id: string, data: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
}

export const useSkillStore = create<SkillState>((set) => ({
  skills: [],
  loading: false,
  error: null,

  /* ================= FETCH ================= */
  fetchSkills: async () => {
    set({ loading: true, error: null });
    try {
      const skills = await skillService.getSkills();
      set({ skills, loading: false });
    } catch (err) {
      set({
        error: "Failed to fetch skills",
        loading: false,
      });
    }
  },

  /* ================= CREATE ================= */
  addSkill: async (data) => {
    set({ loading: true, error: null });
    try {
      const skill = await skillService.createSkill(data);
      set((state) => ({
        skills: [skill, ...state.skills],
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Failed to create skill",
        loading: false,
      });
    }
  },

  /* ================= UPDATE ================= */
  updateSkill: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const updated = await skillService.updateSkill(id, data);
      set((state) => ({
        skills: state.skills.map((s) =>
          s._id === id ? updated : s
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Failed to update skill",
        loading: false,
      });
    }
  },

  /* ================= DELETE ================= */
  deleteSkill: async (id) => {
    set({ loading: true, error: null });
    try {
      await skillService.deleteSkill(id);
      set((state) => ({
        skills: state.skills.filter((s) => s._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({
        error: "Failed to delete skill",
        loading: false,
      });
    }
  },
}));
