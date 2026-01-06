"use client";

import SkillList from "./skill-list";

export default function SkillManager() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Kỹ năng</h1>

      <SkillList />
    </div>
  );
}
