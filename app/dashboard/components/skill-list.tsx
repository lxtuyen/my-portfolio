"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useSkillStore } from "@/app/store/skill.store";
import SkillForm from "./form/skill-form";

export default function SkillList() {
  const { skills, fetchSkills, deleteSkill } = useSkillStore();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <div className="space-y-6">
      <SkillForm
        editingSkill={editingSkill}
        onCancel={() => setEditingSkill(null)}
      />

      <div className="space-y-4">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-gray-900 border border-gray-700 rounded-xl p-4 flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{skill.category}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skill.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingSkill(skill)}
                className="p-2 hover:bg-gray-800 rounded-lg"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => deleteSkill(skill._id!)}
                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
