"use client";

export default function ProfileReadmeGenerator() {
  return (
    <div className="min-h-screen p-6 bg-[#0d1117] text-white">
      <h1 className="text-2xl font-bold mb-4">Profile README Generator</h1>
      <p className="text-zinc-400 mb-4">
        Generate a personalized GitHub profile README.
      </p>

      <textarea
        className="w-full h-64 p-4 bg-black text-white font-mono rounded resize-none"
        placeholder="Profile README content will appear here..."
      />
    </div>
  );
}
