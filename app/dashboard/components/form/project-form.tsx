"use client";

import { uploadToCloudinary } from "@/app/utils/cloudinary";
import { useState } from "react";
import Image from "next/image";
import Input from "@/app/components/input";
import Textarea from "@/app/components/text-area";

interface Props {
  initialData?: Project;
  onSubmit: (data: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<Project>(
    initialData || {
      title: "",
      category: "Frontend",
      description: "",
      longDescription: "",
      images: [],
      tech: [],
      features: [],
      github: "",
      live: "",
      date: "",
    }
  );
  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (name: "tech" | "features", value: string) => {
    setForm({
      ...form,
      [name]: value.split(",").map((v) => v.trim()),
    });
  };

  const handleUploadImages = async (files: FileList) => {
    setUploading(true);
    try {
      const urls = await Promise.all(
        Array.from(files).map((file) => uploadToCloudinary(file))
      );

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    } catch (err) {
      alert("Upload ảnh thất bại");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? "Cập nhật dự án" : "Thêm dự án mới"}
      </h2>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      >
        <Input
          label="Tên dự án"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <div>
          <label className="text-sm text-gray-400">Danh mục</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full Stack</option>
            <option>Mobile</option>
          </select>
        </div>

        <Textarea
          label="Mô tả ngắn"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Textarea
          label="Mô tả chi tiết"
          name="longDescription"
          value={form.longDescription || ""}
          onChange={handleChange}
        />

        <div>
          <label className="text-sm text-gray-400">Ảnh dự án</label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                handleUploadImages(e.target.files);
              }
            }}
            className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          />

          {uploading && (
            <p className="text-sm text-blue-400 mt-2">Đang upload ảnh...</p>
          )}
          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative group">
                  <Image
                    alt={`Project image ${idx + 1}`}
                    width={300}
                    height={200}
                    src={img}
                    className="rounded-lg border border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        ...form,
                        images: form.images.filter((_, i) => i !== idx),
                      })
                    }
                    className="absolute top-1 right-1 bg-black/70 text-red-400 rounded px-2 text-xs opacity-0 group-hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Input
          label="Công nghệ (cách nhau bằng dấu ,)"
          value={form.tech.join(", ")}
          onChange={(e) => handleArrayChange("tech", e.target.value)}
        />

        <Input
          label="Tính năng (cách nhau bằng dấu ,)"
          value={form.features.join(", ")}
          onChange={(e) => handleArrayChange("features", e.target.value)}
        />

        <Input
          label="Github"
          name="github"
          value={form.github || ""}
          onChange={handleChange}
        />
        <Input
          label="Live Demo"
          name="live"
          value={form.live || ""}
          onChange={handleChange}
        />
        <Input
          label="Ngày thực hiện"
          name="date"
          value={form.date || ""}
          onChange={handleChange}
        />

        <div className="flex gap-3 pt-4">
          <button disabled={uploading} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg">
            {initialData ? "Cập nhật" : "Thêm mới"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-600"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
