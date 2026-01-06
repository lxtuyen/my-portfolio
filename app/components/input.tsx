export default function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
      />
    </div>
  );
}
