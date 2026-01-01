"use client";
import SkillSection from "./components/section/SkillSection";
import ProjectSection from "./components/section/ProjectSection";
import ContactSection from "./components/section/ContactSection";
import HeroSection from "./components/section/HeroSection";
import Navigation from "./components/Navigation";

export default function Portfolio() {

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

  const skills: Skill[] = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "PostgreSQL", "MongoDB", "REST API"],
    },
    { category: "Tools", items: ["Git", "Figma", "Postman"] },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navigation />

      <section className="pt-32 px-4 text-center">
        <HeroSection />
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
        <ContactSection />
      </section>

      <footer className="border-t border-gray-700 py-8 px-4 text-center text-gray-500">
        <p>© 2025 Portfolio. Được xây dựng bởi Lê Xuân Tuyển.</p>
      </footer>
    </div>
  );
}
