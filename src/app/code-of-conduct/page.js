"use client";

export default function CodeOfConductGenerator() {
  return (
    <div className="min-h-screen p-6 bg-[#0d1117] text-white">
      <h1 className="text-2xl font-bold mb-4">CODE_OF_CONDUCT.md Generator</h1>
      <p className="text-zinc-400 mb-4">
        Generate a CODE_OF_CONDUCT.md file for your project community.
      </p>

      <textarea
        className="w-full h-64 p-4 bg-black text-white font-mono rounded resize-none"
        placeholder="Code of Conduct content will appear here..."
      />
    </div>
  );
}
