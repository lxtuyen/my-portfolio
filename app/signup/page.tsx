"use client";
import { Mail, Lock, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "../services/authService";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      setLoading(true);
      await register({
        email: form.email,
        password: form.password,
      });
      router.push("/login");
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
          Đăng ký
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
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent py-2 outline-none text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300">Xác nhận mật khẩu</label>
            <div className="mt-1 flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent py-2 outline-none text-gray-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold"
          >
            <UserPlus size={18} />
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
