import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Xin chào, Tôi là{" "}
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Lê Xuân Tuyển
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Sinh viên năm cuối ngành CNTT tại VKU, đam mê phát triển phần mềm và
            học hỏi công nghệ mới. Đang tìm kiếm cơ hội Thực tập
            để nâng cao kỹ năng và tham gia vào các dự án thực tế.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/projects" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
              Xem dự án
            </Link>
            <a
              href="/cv/LeXuanTuyen.pdf"
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