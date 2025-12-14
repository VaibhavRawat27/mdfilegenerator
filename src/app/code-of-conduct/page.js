"use client";

import { useState } from "react";

export default function CodeOfConductGenerator() {
  const [projectName, setProjectName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [enforcement, setEnforcement] = useState("community");
  const [content, setContent] = useState("");

  const generateContent = () => {
    const text = `# Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in **${projectName || "this project"}** a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

---

## Our Standards

Examples of behavior that contributes to a positive environment include:

- Using welcoming and inclusive language
- Being respectful of differing opinions and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

Examples of unacceptable behavior include:

- Harassment of any kind
- Trolling, insulting or derogatory comments
- Personal or political attacks
- Publishing others' private information without permission

---

## Enforcement Responsibilities

Project maintainers are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate.

---

## Scope

This Code of Conduct applies within all community spaces and also applies when an individual is officially representing the project in public spaces.

---

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project team at:

📧 **${contactEmail || "maintainers@example.com"}**

All complaints will be reviewed and investigated promptly and fairly.

Depending on the severity, maintainers may take any action they deem appropriate, including:

- Warning the offender
- Temporary ban
- Permanent removal from the community

---

## Enforcement Guidelines

Community leaders will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct.

### 1. Correction
Private, written warning providing clarity around the nature of the violation.

### 2. Warning
A warning with consequences for continued behavior.

### 3. Temporary Ban
A temporary ban from community participation.

### 4. Permanent Ban
A permanent ban from the community.

---

## Attribution

This Code of Conduct is adapted from the **Contributor Covenant**, version 2.1  
https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
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
    a.download = "CODE_OF_CONDUCT.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-8">

      <h1 className="text-2xl font-bold mb-2">
        CODE_OF_CONDUCT.md Generator
      </h1>
      <p className="text-zinc-400 mb-6">
        Generate an industry-standard Code of Conduct for your project
      </p>

      {/* Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-zinc-400">Project Name</label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Open Source Project"
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">Contact Email</label>
          <input
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="maintainers@example.com"
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
          />
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
        placeholder="Generated CODE_OF_CONDUCT.md will appear here..."
        className="w-full mt-6 h-96 p-4 bg-black text-sm font-mono border border-zinc-700 rounded resize-none"
      />

      {/* Info */}
      <div className="mt-6 text-sm text-zinc-400">
        This template follows the <b>Contributor Covenant v2.1</b>, the most
        widely adopted standard across GitHub open-source projects.
      </div>
    </div>
  );
}
