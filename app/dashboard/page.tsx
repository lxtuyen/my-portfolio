"use client";

import { useState } from "react";
import { User, FolderGit2, Wrench } from "lucide-react";
import ProfileForm from "./components/form/profile-form";
import ProjectManager from "./components/project-manager";
import SkillManager from "./components/skill-manager";

type Tab = "profile" | "projects" | "skills";

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-700 p-6 space-y-4">
        <h2 className="text-xl font-bold text-blue-400 mb-6">
          User Center
        </h2>

        <SidebarItem
          icon={<User size={18} />}
          label="Thông tin cá nhân"
          active={tab === "profile"}
          onClick={() => setTab("profile")}
        />

        <SidebarItem
          icon={<FolderGit2 size={18} />}
          label="Dự án"
          active={tab === "projects"}
          onClick={() => setTab("projects")}
        />

        <SidebarItem
          icon={<Wrench size={18} />}
          label="Kỹ năng"
          active={tab === "skills"}
          onClick={() => setTab("skills")}
        />
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {tab === "profile" && <ProfileForm />}
        {tab === "projects" && <ProjectManager />}
        {tab === "skills" && <SkillManager />}
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          active
            ? "bg-blue-500/20 text-blue-400"
            : "hover:bg-gray-800"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}
