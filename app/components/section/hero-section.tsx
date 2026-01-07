import { Profile } from "@/app/types/profile";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface Props {
  profile: Profile | null;
}


export default function HeroSection({ profile }: Props) {
    return (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Xin chào, Tôi là{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {profile?.fullName}
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            {profile?.description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
              Xem dự án
            </Link>
            <a
              href={profile?.cvUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg font-semibold transition"
            >
              Tải CV
            </a>
          </div>
          <div className="mt-12 animate-bounce">
            <ChevronDown className="mx-auto text-blue-400" size={32} />
          </div>
        </div>
    )
}