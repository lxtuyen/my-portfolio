"use client";
import { useState } from 'react';
import { Search, Filter, Star, Github, ExternalLink, ArrowRight } from 'lucide-react';
import ProjectCard from '../components/card/project-card';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['all', 'Frontend', 'Full Stack', 'Backend', 'Mobile'];

  const projects: Project[] = [
    {
      id: "p1",
      title: "E-commerce Website",
      category: "Backend",
      description: "Website bán bánh",
      longDescription:
        "Website bán bánh với đầy đủ chức năng admin, user, order",
      image: "/images/ecommerce.png",
      tech: ["Express", "MongoDB", "React"],
      features: [
        "Đăng nhập / đăng ký",
        "Quản lý sản phẩm",
        "Đặt hàng và thanh toán",
        "Trang admin",
      ],
      github: "https://github.com/you/ecommerce",
      live: "https://ecommerce.onrender.com",
      date: "2024-12",
    },
  ];

  const filtered = projects.filter(p => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-2">Dự Án</h1>
          <p className="text-gray-400">Khám phá các dự án đã xây dựng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/50 border-b border-gray-700 py-6">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter size={20} className="text-gray-400 shrink-0" />
            <div className="flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {/* Image */}
              <div className={`h-48 ${project.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <ArrowRight size={32} className="text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                  <Star size={18} className="text-yellow-400" />
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <a
                    href={project.github}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition text-sm"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a
                    href={project.live}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition text-sm"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Không tìm thấy dự án phù hợp</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectCard project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}