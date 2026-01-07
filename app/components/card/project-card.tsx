"use client";

import Image from "next/image";
import { ExternalLink, Github, X } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectCard({ project, onClose }: ProjectCardProps) {
  const hasImage = project.images && project.images.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="relative h-48 w-full overflow-hidden bg-gray-900">
          {hasImage && (
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-900/80 hover:bg-gray-900 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">{project.title}</h2>
            <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full">
              {project.category}
            </span>
          </div>

          <p className="text-gray-400 mb-6">
            {project.longDescription || project.description}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Tính năng chính</h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Công nghệ sử dụng</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="bg-gray-700 px-3 py-1 rounded-lg text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.date && (
            <p className="text-gray-400 text-sm mb-6">
              Hoàn thành: {project.date}
            </p>
          )}

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <Github size={20} /> Mã nguồn
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
