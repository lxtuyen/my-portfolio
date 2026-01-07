import { Profile } from "@/app/types/profile";
import { Github, Linkedin, Mail } from "lucide-react";

interface Props {
  profile: Profile | null;
}


export default function ContactSection({ profile }: Props) {
    return (
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Hãy liên hệ với tôi</h2>
          <p className="text-gray-400 mb-12">
            Tôi luôn sẵn sàng thảo luận về cơ hội việc làm mới. Gửi email hoặc
            kết nối với tôi trên mạng xã hội.
          </p>
          <div className="flex justify-center gap-6 mb-12">
            <a
              href={`mailto:${profile?.email || "tuyenlx.22itb@vku.udn.vn"}`}
              aria-label="Send email"
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition"
            >
              <Mail size={24} />
            </a>
            <a
              href={profile?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition"
            >
              <Github size={24} />
            </a>

            <a
              href={profile?.linkedin || "https://www.linkedin.com/in/xu%C3%A2n-tuy%E1%BB%83n-0980b8287/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <a
            href={`mailto:${profile?.email || "tuyenlx.22itb@vku.udn.vn"}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition"
          >
            Gửi email
          </a>
        </div>
    )
}