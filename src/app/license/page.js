"use client";

export default function LicenseGenerator() {
  return (
    <div className="min-h-screen p-6 bg-[#0d1117] text-white">
      <h1 className="text-2xl font-bold mb-4">License Generator</h1>
      <p className="text-zinc-400 mb-4">
        Generate a LICENSE file for your project.
      </p>

      {/* TODO: Add form or options to select license type */}
      <textarea
        className="w-full h-64 p-4 bg-black text-white font-mono rounded resize-none"
        placeholder="License content will appear here..."
      />
    </div>
  );
}
