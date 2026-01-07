"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import ProjectForm from "./form/project-form";
import { useProjectStore } from "@/app/store/project.store";

export default function ProjectManager() {
  const {
    projects,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    loading,
  } = useProjectStore();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSubmit = async (data: Project) => {
    if (editingProject?._id) {
      await updateProject(editingProject._id, data);
    } else {
      await addProject(data);
    }

    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Xóa dự án này?")) return;
    await deleteProject(id);
  };

  return (
    <div>
      {!showForm && (
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
      )}

      {!showForm && (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border border-gray-700 rounded-xl p-4 bg-gray-800"
            >
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-400">
                {project.category}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-gray-700 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 rounded bg-gray-700"
                >
                  Sửa
                </button>

                <button
                  onClick={() => handleDelete(project._id!)}
                  className="px-3 py-1 rounded bg-red-500/20 text-red-400"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          {projects.length === 0 && !loading && (
            <p className="text-gray-400 text-sm">
              Chưa có dự án nào
            </p>
          )}
        </div>
      )}

      {showForm && (
        <ProjectForm
          key={editingProject?._id ?? "new"}
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
