"use client";

export default function ContributingGenerator() {
  return (
    <div className="min-h-screen p-6 bg-[#0d1117] text-white">
      <h1 className="text-2xl font-bold mb-4">CONTRIBUTING.md Generator</h1>
      <p className="text-zinc-400 mb-4">
        Generate a CONTRIBUTING.md file to guide contributors.
      </p>

      <textarea
        className="w-full h-64 p-4 bg-black text-white font-mono rounded resize-none"
        placeholder="Contributing content will appear here..."
      />
    </div>
  );
}
