"use client";

export default function SkillManager() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Kỹ năng</h1>

      <div className="space-y-4">
        <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
          <h3 className="font-semibold mb-2">Frontend</h3>
          <p className="text-sm text-gray-400">
            React, Next.js, TailwindCSS
          </p>
        </div>

        <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
          <h3 className="font-semibold mb-2">Backend</h3>
          <p className="text-sm text-gray-400">
            Node.js, Express, MongoDB
          </p>
        </div>
      </div>
    </div>
  );
}
