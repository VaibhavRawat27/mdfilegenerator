"use client";

export default function ProjectReadmeGenerator() {
  return (
    <div className="min-h-screen p-6 bg-[#0d1117] text-white">
      <h1 className="text-2xl font-bold mb-4">Project README Generator</h1>
      <p className="text-zinc-400 mb-4">
        Generate a README.md for your project with features, usage, and more.
      </p>

      <textarea
        className="w-full h-64 p-4 bg-black text-white font-mono rounded resize-none"
        placeholder="Project README content will appear here..."
      />
    </div>
  );
}
