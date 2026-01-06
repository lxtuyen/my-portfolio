export default function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <textarea
        {...props}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 min-h-25"
      />
    </div>
  );
}