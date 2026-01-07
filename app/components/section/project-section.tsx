import { ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ProjectCard from "../card/project-card";

interface ProjectSectionProps {
  projects: Project[];
}

export default function ProjectSection({ projects }: ProjectSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  if (projects.length === 0) {
    return <div className="text-gray-400 italic">Chưa có dự án nào</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <div
          key={i}
          className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-400 transition group"
        >
          <div className="relative h-48 overflow-hidden bg-gray-800">
            {project.images?.length > 0 ? (
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                No image
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, j) => (
                <span key={j} className="text-xs bg-gray-700 px-2 py-1 rounded">
                  {t}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedProject(project)}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-cyan-400 transition"
            >
              Xem chi tiết <ExternalLink size={16} />
            </button>
          </div>
        </div>
      ))}
      {selectedProject && (
        <ProjectCard
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
