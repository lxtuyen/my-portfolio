"use client";

import { useState } from "react";
import ProjectForm, { ProjectFormData } from "./project-form";
import { Plus } from "lucide-react";

export default function ProjectManager() {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectFormData | null>(null);

  const handleSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      console.log("UPDATE PROJECT", data);
    } else {
      console.log("ADD PROJECT", data);
    }

    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div>
      {!showForm && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dự án</h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Plus size={18} />
              Thêm dự án
            </button>
          </div>

          <div className="border border-gray-700 rounded-xl p-4 bg-gray-800">
            <h3 className="font-semibold">Portfolio Website</h3>
            <p className="text-sm text-gray-400">Full Stack</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  setEditingProject({
                    title: "Portfolio Website",
                    category: "Full Stack",
                    description: "Website giới thiệu bản thân",
                    tech: ["Next.js", "Node.js"],
                    features: ["Auth", "Dashboard"],
                  });
                  setShowForm(true);
                }}
                className="px-3 py-1 rounded bg-gray-700"
              >
                Sửa
              </button>

              <button className="px-3 py-1 rounded bg-red-500/20 text-red-400">
                Xóa
              </button>
            </div>
          </div>
        </>
      )}

      {showForm && (
        <ProjectForm
          initialData={editingProject || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}
