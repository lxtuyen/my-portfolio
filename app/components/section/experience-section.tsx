interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  if (experience.length === 0) {
    return (
      <div className="text-gray-400 italic">
        Chưa có kinh nghiệm nào.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {experience.map((exp, i) => (
        <div
          key={i}
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-blue-400 transition"
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-blue-400">
                {exp.role}
              </h3>
              <p className="text-gray-400">{exp.company}</p>
            </div>
            <span className="text-sm text-gray-500">
              {exp.period}
            </span>
          </div>
          <p className="text-gray-300">{exp.desc}</p>
        </div>
      ))}
    </div>
  );
}
