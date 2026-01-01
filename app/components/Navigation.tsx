import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Portfolio
          </div>

          <div className="hidden md:flex gap-8">
            {["Giới thiệu", "Kỹ năng", "Dự án", "Liên hệ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 transition"
              >
                {item}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            {["Giới thiệu", "Kỹ năng", "Dự án", "Liên hệ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 hover:bg-gray-700"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>
    )
}