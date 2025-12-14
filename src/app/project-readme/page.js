"use client";

import { useState } from "react";

const techOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Python",
  "Django",
  "Flask",
  "Tailwind CSS",
  "Vite",
  "Docker",
  "AWS",
];

export default function ProjectReadmeGenerator() {
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [features, setFeatures] = useState("");
  const [selectedTech, setSelectedTech] = useState([]);
  const [customTech, setCustomTech] = useState("");
  const [content, setContent] = useState("");

  const toggleTech = (tech) => {
    setSelectedTech((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  const generateReadme = () => {
    const techList = [...selectedTech, ...customTech.split(",").map(t => t.trim()).filter(Boolean)];

    const featureList = features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)
      .map((f) => `- ${f}`)
      .join("\n");

    const text = `# ${projectName || "Project Name"}

${summary || "Short description of the project."}

🔗 **Live / Repo:** ${projectUrl || "https://github.com/your-username/your-repo"}

---

## 🚀 Features

${featureList || "- Feature 1\n- Feature 2\n- Feature 3"}

---

## 🛠️ Tech Stack

${techList.length ? techList.map(t => `- ${t}`).join("\n") : "- Add your tech stack here"}

---

## 📦 Installation

\`\`\`bash
git clone ${projectUrl || "https://github.com/your-username/your-repo"}
cd ${projectName || "project-folder"}
npm install
\`\`\`

---

## ▶️ Usage

\`\`\`bash
npm run dev
\`\`\`

Then open: http://localhost:3000

---

## 📁 Project Structure

\`\`\`
├── src/
├── public/
├── README.md
└── package.json
\`\`\`

---

## 🤝 Contributing

Contributions are welcome!

Please read the \`CONTRIBUTING.md\` file before submitting pull requests.

---

## 📜 License

This project is licensed under the MIT License.
See the \`LICENSE\` file for details.

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
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
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-8">

      <h1 className="text-2xl font-bold mb-2">
        Project README Generator
      </h1>
      <p className="text-zinc-400 mb-6">
        Generate a professional README.md following GitHub best practices
      </p>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="p-2 bg-black border border-zinc-700 rounded"
        />
        <input
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          placeholder="Project GitHub / Live URL"
          className="p-2 bg-black border border-zinc-700 rounded"
        />
      </div>

      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Short project summary"
        className="w-full mt-4 p-2 bg-black border border-zinc-700 rounded"
      />

      <textarea
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        placeholder="Features (one per line)"
        className="w-full mt-4 p-2 bg-black border border-zinc-700 rounded h-28"
      />

      {/* Tech Stack */}
      <div className="mt-6">
        <p className="text-sm text-zinc-400 mb-2">Select Technologies</p>
        <div className="flex flex-wrap gap-2">
          {techOptions.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={`px-3 py-1 text-sm rounded border ${
                selectedTech.includes(tech)
                  ? "bg-white text-black"
                  : "border-zinc-600 text-zinc-300"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <input
          value={customTech}
          onChange={(e) => setCustomTech(e.target.value)}
          placeholder="Other tech (comma separated)"
          className="w-full mt-3 p-2 bg-black border border-zinc-700 rounded"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button
          onClick={generateReadme}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Generate README
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
        placeholder="Generated README.md will appear here..."
        className="w-full mt-6 h-96 p-4 bg-black text-sm font-mono border border-zinc-700 rounded resize-none"
      />
    </div>
  );
}
