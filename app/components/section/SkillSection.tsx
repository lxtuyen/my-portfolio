interface SkillSectionProps {
  skills: Skill[];
}

export default function SkillSection({
  skills,
}: SkillSectionProps) {
  if (skills.length === 0) {
    return (
      <div className="text-gray-400 italic">
        Chưa có kỹ năng nào
      </div>
    );
  }

  return (
 <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span key={j} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
  );
}
