"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MdWorkspace() {
  const [files, setFiles] = useState({
    "main.md": `# main.md

## Heading Level 2
### Heading Level 3

This is **bold**, this is *italic*.

- List item one
- List item two

> Blockquote example

\`\`\`js
console.log("Markdown IDE");
\`\`\`
`,
  });

  const [activeFile, setActiveFile] = useState("main.md");
  const [activeTab, setActiveTab] = useState("editor");

  const updateContent = (value) => {
    setFiles({ ...files, [activeFile]: value });
  };

  const insertMarkdown = (syntax) => {
    setFiles({
      ...files,
      [activeFile]: files[activeFile] + syntax,
    });
  };

  const createNewFile = () => {
    const name = prompt("Enter file name (example.md)");
    if (!name || files[name]) return;
    setFiles({ ...files, [name]: `# ${name}\n` });
    setActiveFile(name);
  };

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(files[activeFile]);
    alert("Markdown copied");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([files[activeFile]], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <h1 className="text-sm font-semibold text-black dark:text-white">
          Markdown IDE
        </h1>
        <div className="flex gap-3 text-sm">
          <button onClick={copyMarkdown} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Copy
          </button>
          <button onClick={downloadMarkdown} className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
            Download
          </button>
        </div>
      </header>

      {/* File Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 px-3 py-2">
        {Object.keys(files).map((file) => (
          <button
            key={file}
            onClick={() => setActiveFile(file)}
            className={`px-3 py-1 rounded text-sm ${
              activeFile === file
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {file}
          </button>
        ))}
        <button onClick={createNewFile} className="px-2 text-zinc-500 hover:text-black dark:hover:text-white">
          + New
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm">
        <button onClick={() => insertMarkdown("\n# Heading\n")}>H1</button>
        <button onClick={() => insertMarkdown("\n## Heading\n")}>H2</button>
        <button onClick={() => insertMarkdown("\n### Heading\n")}>H3</button>
        <button onClick={() => insertMarkdown("**bold**")}>Bold</button>
        <button onClick={() => insertMarkdown("*italic*")}>Italic</button>
        <button onClick={() => insertMarkdown("\n- List item\n")}>List</button>
        <button onClick={() => insertMarkdown("\n> Quote\n")}>Quote</button>
        <button onClick={() => insertMarkdown("\n```js\ncode\n```\n")}>Code</button>
        <button onClick={() => insertMarkdown("\n[link](https://)\n")}>Link</button>
      </div>

      {/* Mobile Tabs */}
      <div className="flex md:hidden border-b border-zinc-200 dark:border-zinc-800">
        {["editor", "preview"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm ${
              activeTab === tab
                ? "border-b-2 border-black dark:border-white text-black dark:text-white"
                : "text-zinc-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Area */}
      <div className="flex flex-1">

        {/* Editor */}
        <div
          className={`w-full md:w-1/2 border-r border-zinc-200 dark:border-zinc-800 ${
            activeTab !== "editor" ? "hidden md:block" : ""
          }`}
        >
          <textarea
            value={files[activeFile]}
            onChange={(e) => updateContent(e.target.value)}
            className="h-full w-full resize-none bg-white dark:bg-black p-4 font-mono text-sm text-black dark:text-white outline-none"
          />
        </div>

        {/* Preview */}
        <div
          className={`w-full md:w-1/2 overflow-y-auto p-6 ${
            activeTab !== "preview" ? "hidden md:block" : ""
          }`}
        >
          <article className="prose prose-zinc dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {files[activeFile]}
            </ReactMarkdown>
          </article>
        </div>

      </div>
    </div>
  );
}
