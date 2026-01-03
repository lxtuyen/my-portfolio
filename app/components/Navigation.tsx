"use client";

import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const menuItems = ["Giới thiệu", "Kỹ năng", "Dự án", "Liên hệ"];
console.log(user);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Portfolio
        </div>

        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-blue-400 transition"
            >
              {item}
            </a>
          ))}

          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-400 text-blue-400 hover:bg-blue-400/10 transition"
            >
              <LogIn size={18} />
              Đăng nhập
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 hover:border-blue-400 hover:text-blue-400 transition"
              >
                <User size={18} />
                User Center
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-400 text-red-400 hover:bg-red-400/10 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
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
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-4 py-3 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}

          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-3 text-blue-400 hover:bg-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn size={18} />
              Đăng nhập
            </Link>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                User Center
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-gray-700"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
