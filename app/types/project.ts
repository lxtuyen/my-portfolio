type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "Mobile";

type Project = {
  _id?: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;
  images: string[];
  tech: string[];
  features: string[];
  github?: string;
  live?: string;
  date?: string;
};
