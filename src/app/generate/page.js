"use client";

import Link from "next/link";
import {
  FileText,
  User,
  BookOpen,
  Users,
  Shield,
  Pencil,
} from "lucide-react";

const generateOptions = [
  {
    title: "Generate License",
    description: "Create a LICENSE file for your project.",
    icon: <FileText className="w-6 h-6 text-blue-400" />,
    href: "/license",
  },
  {
    title: "Generate Profile README",
    description: "Create a personalized GitHub profile README.",
    icon: <User className="w-6 h-6 text-green-400" />,
    href: "/profile-readme",
  },
  {
    title: "Generate Project README",
    description: "Create a README.md for your project with features, usage, and more.",
    icon: <BookOpen className="w-6 h-6 text-yellow-400" />,
    href: "/project-readme",
  },
  {
    title: "Generate CONTRIBUTING.md",
    description: "Guide contributors with a CONTRIBUTING.md file.",
    icon: <Users className="w-6 h-6 text-purple-400" />,
    href: "/contributing",
  },
  {
    title: "Generate CODE_OF_CONDUCT.md",
    description: "Establish community guidelines with a CODE_OF_CONDUCT.md file.",
    icon: <Shield className="w-6 h-6 text-red-400" />,
    href: "/code-of-conduct",
  },
  {
    title: "MD Files Editor & Previewer",
    description: "Editor to write md files and preview them.",
    icon: <Pencil className="w-6 h-6 text-red-400" />,
    href: "/md-preview",
  },
];

export default function GeneratePage() {
  return (
    <div className="min-h-screen p-6 bg-[#0d1117] text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        What do you want to generate?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generateOptions.map((option) => (
          <Link
            key={option.title}
            href={option.href}
            className="p-6 bg-[#161b22] rounded-xl shadow hover:shadow-lg transition hover:bg-[#21262d] flex flex-col justify-between transform hover:-translate-y-1 hover:scale-105 duration-200"
          >
            <div className="flex items-center gap-4 mb-4">
              {option.icon}
              <h2 className="text-lg md:text-xl font-semibold">{option.title}</h2>
            </div>
            <p className="text-zinc-400 text-sm md:text-base mb-4">{option.description}</p>
            <div className="mt-auto text-blue-500 font-medium hover:underline flex items-center gap-1">
              Next <span>&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
