"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useSkillStore } from "@/app/store/skill.store";

interface SkillFormProps {
  editingSkill?: Skill | null;
  onCancel?: () => void;
}

export default function SkillForm({ editingSkill, onCancel }: SkillFormProps) {
  const { addSkill, updateSkill, loading } = useSkillStore();

  const [category, setCategory] = useState(editingSkill?.category || "");
  const [skills, setSkills] = useState<string[]>(editingSkill?.skills || []);
  const [input, setInput] = useState("");

  /* ================= ADD TAG ================= */
  const handleAddSkill = () => {
    if (!input.trim()) return;
    if (skills.includes(input.trim())) return;

    setSkills([...skills, input.trim()]);
    setInput("");
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category.trim() || skills.length === 0) return;

    if (editingSkill?._id) {
      await updateSkill(editingSkill._id, { category, skills });
      onCancel?.();
    } else {
      await addSkill({ category, skills });
      setCategory("");
      setSkills([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-700 rounded-xl p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold">
        {editingSkill ? "✏️ Cập nhật kỹ năng" : "➕ Thêm kỹ năng"}
      </h2>

      <div>
        <label className="text-sm text-gray-400">Danh mục</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
        >
          <option value="">-- Chọn danh mục --</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
          <option value="Mobile">Mobile</option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      <div>
        <label className="text-sm text-gray-400">Kỹ năng</label>

        <div className="flex gap-2 mt-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="React, NodeJS..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-3 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-full text-sm"
            >
              {skill}
              <button type="button" onClick={() => handleRemoveSkill(skill)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {editingSkill ? "Cập nhật" : "Thêm"}
        </button>

        {editingSkill && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
          >
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
