"use client";

import { Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loginStore = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({ email, password });

      loginStore.login({
        user: res.data.user,
        token: res.data.accessToken,
      });
      
      router.push("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Đăng nhập
        </h1>
        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <div className="mt-1 flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-2 outline-none text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Mật khẩu</label>
            <div className="mt-1 flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-2 outline-none text-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            <LogIn size={18} />
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/*<p className="text-center text-gray-400 mt-6">
          Chưa có tài khoản?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Đăng ký
          </Link>
        </p>*/}
      </div>
    </div>
  );
}
