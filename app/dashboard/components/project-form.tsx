"use client";

import { useState } from "react";

export type ProjectFormData = {
  title: string;
  category: "Frontend" | "Backend" | "Full Stack" | "Mobile";
  description: string;
  longDescription?: string;
  image?: string;
  tech: string[];
  features: string[];
  github?: string;
  live?: string;
  date?: string;
};

interface Props {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<ProjectFormData>(
    initialData || {
      title: "",
      category: "Frontend",
      description: "",
      longDescription: "",
      image: "",
      tech: [],
      features: [],
      github: "",
      live: "",
      date: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (name: "tech" | "features", value: string) => {
    setForm({
      ...form,
      [name]: value.split(",").map((v) => v.trim()),
    });
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Cập nhật dự án" : "Thêm dự án mới"}
      </h2>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <Input label="Tên dự án" name="title" value={form.title} onChange={handleChange} />

        <div>
          <label className="text-sm text-gray-400">Danh mục</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
            <option>Mobile</option>
          </select>
        </div>

        <Textarea
          label="Mô tả ngắn"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Textarea
          label="Mô tả chi tiết"
          name="longDescription"
          value={form.longDescription || ""}
          onChange={handleChange}
        />

        <Input
          label="Ảnh (URL)"
          name="image"
          value={form.image || ""}
          onChange={handleChange}
        />

        <Input
          label="Công nghệ (cách nhau bằng dấu ,)"
          value={form.tech.join(", ")}
          onChange={(e) => handleArrayChange("tech", e.target.value)}
        />

        <Input
          label="Tính năng (cách nhau bằng dấu ,)"
          value={form.features.join(", ")}
          onChange={(e) => handleArrayChange("features", e.target.value)}
        />

        <Input label="Github" name="github" value={form.github || ""} onChange={handleChange} />
        <Input label="Live Demo" name="live" value={form.live || ""} onChange={handleChange} />
        <Input label="Ngày thực hiện" name="date" value={form.date || ""} onChange={handleChange} />

        <div className="flex gap-3 pt-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg">
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-600"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <textarea
        {...props}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 min-h-25"
      />
    </div>
  );
}
