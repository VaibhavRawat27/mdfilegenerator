"use client";

import { useState } from "react";

export default function ContributingGenerator() {
  const [projectName, setProjectName] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [projectType, setProjectType] = useState("Web Application");
  const [areas, setAreas] = useState({
    code: true,
    docs: true,
    bugs: true,
    features: true,
    tests: false,
  });
  const [content, setContent] = useState("");

  const toggleArea = (key) => {
    setAreas({ ...areas, [key]: !areas[key] });
  };

  const generateContent = () => {
    const enabledAreas = Object.keys(areas)
      .filter((k) => areas[k])
      .map((k) => `- ${k.charAt(0).toUpperCase() + k.slice(1)}`)
      .join("\n");

    const text = `# Contributing to ${projectName || "this project"}

Thank you for taking the time to contribute! 🎉  
We welcome contributions from everyone.

---

## 📌 Project Info
- **Project Name:** ${projectName || "Your Project"}
- **Project Type:** ${projectType}
- **Repository:** ${repoUrl || "https://github.com/your-username/repo"}

---

## 🤝 How You Can Contribute

You can help us by contributing in the following areas:

${enabledAreas || "- Code\n- Documentation"}

---

## 🛠️ Getting Started

1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone ${repoUrl || "https://github.com/your-username/repo"}
   \`\`\`
3. Create a new branch:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

---

## ✅ Contribution Guidelines

- Follow existing code style
- Write clear commit messages
- Keep pull requests focused and small
- Add tests when applicable

---

## 🐞 Reporting Issues

If you find a bug, please open an issue with:
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

---

## 📄 Code of Conduct

By contributing, you agree to follow our Code of Conduct.

---

Happy contributing! 🚀
`;

    setContent(text);
  };

  // Mobile-safe copy
  const copyText = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(content);
      alert("Copied!");
    } else {
      const t = document.createElement("textarea");
      t.value = content;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
      alert("Copied!");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CONTRIBUTING.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-8">

      <h1 className="text-2xl font-bold mb-2">CONTRIBUTING.md Generator</h1>
      <p className="text-zinc-400 mb-6">
        Generate contribution guidelines for your project
      </p>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-zinc-400">Project Name</label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
            placeholder="My Awesome Project"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">GitHub Repository URL</label>
          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
            placeholder="https://github.com/user/repo"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Project Type</label>
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
          >
            <option>Web Application</option>
            <option>Library / Package</option>
            <option>CLI Tool</option>
            <option>API / Backend</option>
            <option>Mobile App</option>
          </select>
        </div>
      </div>

      {/* Contribution Areas */}
      <div className="mt-5">
        <label className="text-sm text-zinc-400">Contribution Areas</label>
        <div className="flex flex-wrap gap-3 mt-2">
          {Object.keys(areas).map((key) => (
            <label
              key={key}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={areas[key]}
                onChange={() => toggleArea(key)}
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={generateContent}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Generate
        </button>
        <button
          onClick={copyText}
          disabled={!content}
          className="px-4 py-2 border border-zinc-600 rounded disabled:opacity-40"
        >
          Copy
        </button>
        <button
          onClick={downloadFile}
          disabled={!content}
          className="px-4 py-2 border border-zinc-600 rounded disabled:opacity-40"
        >
          Download
        </button>
      </div>

      {/* Output */}
      <textarea
        value={content}
        readOnly
        placeholder="Generated CONTRIBUTING.md will appear here..."
        className="w-full mt-6 h-80 p-4 bg-black text-sm font-mono border border-zinc-700 rounded resize-none"
      />
    </div>
  );
}
