type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "Mobile";

type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription?: string;
  image?: string;
  tech: string[];
  features: string[];
  github?: string;
  live?: string;
  date?: string;
};
