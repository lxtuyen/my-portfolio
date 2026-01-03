"use client";

export default function ProfileForm() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Thông tin cá nhân</h1>

      <form className="space-y-4">
        <Input label="Họ và tên" />
        <Input label="Email" type="email" />
        <Input label="Github" />
        <Input label="LinkedIn" />
        <Input label="Link CV" />

        <div>
          <label className="block mb-1 text-sm text-gray-400">
            Mô tả bản thân
          </label>
          <textarea className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 min-h-30" />
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold">
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}

function Input({
  label,
  type = "text",
}: {
  label: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-400">
        {label}
      </label>
      <input
        type={type}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
      />
    </div>
  );
}
