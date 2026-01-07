"use client";

import { useEffect, useState } from "react";
import Navigation from "./components/navigation";
import HeroSection from "./components/section/hero-section";
import SkillSection from "./components/section/skill-section";
import ProjectSection from "./components/section/project-section";
import ContactSection from "./components/section/contact-section";

import { projectService } from "@/app/services/project.service";
import { skillService } from "@/app/services/skill.service";
import { profileService } from "@/app/services/profile.service";
import { Profile } from "@/app/types/profile";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectData, skillData, profileData] = await Promise.all([
          projectService.getProjects(),
          skillService.getSkills(),
          profileService.getProfile(),
        ]);

        setProjects(projectData);
        setSkills(skillData);
        setProfile(profileData);
      } catch (err) {
        console.error("Failed to load portfolio data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      <section className="pt-32 px-4 text-center">
        <HeroSection profile={profile} />
      </section>

      <section id="kỹ năng" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Kỹ năng</h2>
          <SkillSection skills={skills} />
        </div>
      </section>

      <section id="dự án" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Dự án tiêu biểu
          </h2>
          <ProjectSection projects={projects} />
        </div>
      </section>

      <section id="liên hệ" className="py-20 px-4">
        <ContactSection profile={profile} />
      </section>

      <footer className="border-t border-gray-700 py-8 px-4 text-center text-gray-500">
        <p>© 2025 Portfolio. Được xây dựng bởi {profile?.fullName}.</p>
      </footer>
    </div>
  );
}
