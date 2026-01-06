"use client";

import Input from "@/app/components/input";
import { useProfileStore } from "@/app/store/profile.store";
import { Profile } from "@/app/types/profile";
import { useEffect, useState } from "react";

export default function ProfileForm() {
  const { profile, fetchProfile } =
    useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return <ProfileFormInner key="new" />;
  }

  return <ProfileFormInner key={profile._id} initialData={profile} />;
}

function ProfileFormInner({
  initialData,
}: {
  initialData?: Profile;
}) {
  const { saveProfile, loading } = useProfileStore();

  const [form, setForm] = useState<Profile>({
    fullName: initialData?.fullName ?? "",
    email: initialData?.email ?? "",
    github: initialData?.github ?? "",
    linkedin: initialData?.linkedin ?? "",
    cvUrl: initialData?.cvUrl ?? "",
    description: initialData?.description ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile(form);
    alert("Lưu thông tin thành công!");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">
        Thông tin cá nhân
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Họ và tên"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Github"
          name="github"
          value={form.github}
          onChange={handleChange}
        />

        <Input
          label="LinkedIn"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
        />

        <Input
          label="Link CV"
          name="cvUrl"
          value={form.cvUrl}
          onChange={handleChange}
        />

        <div>
          <label className="block mb-1 text-sm text-gray-400">
            Mô tả bản thân
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 min-h-32"
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}
