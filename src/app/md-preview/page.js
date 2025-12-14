"use client";

import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MdWorkspace() {
  const [files, setFiles] = useState({
    "README.md": `# README.md

## About
This is a real **Markdown editor** with live preview.

## Features
- Multiple markdown files
- GitHub-style preview
- Copy & download

\`\`\`js
console.log("Hello Markdown");
\`\`\`
`,
  });

  const [activeFile, setActiveFile] = useState("README.md");
  const [mobileTab, setMobileTab] = useState("editor");
  const [showNewFileDialog, setShowNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [deleteFileDialog, setDeleteFileDialog] = useState({ show: false, file: "" });

  // Update file content
  const updateContent = (value) => {
    setFiles({ ...files, [activeFile]: value });
  };

  // Create new file
  const handleCreateFile = () => {
    if (!newFileName.trim()) return;
    let name = newFileName.trim();
    if (!name.endsWith(".md")) name += ".md";

    if (files[name]) {
      alert("File name already exists!");
      return;
    }

    setFiles({ ...files, [name]: `# ${name}\n` });
    setActiveFile(name);
    setNewFileName("");
    setShowNewFileDialog(false);
  };

  // Delete file
  const confirmDeleteFile = (file) => {
    setDeleteFileDialog({ show: true, file });
  };

  const handleDeleteFile = () => {
    const file = deleteFileDialog.file;
    const newFiles = { ...files };
    delete newFiles[file];
    setFiles(newFiles);

    if (activeFile === file) {
      setActiveFile(Object.keys(newFiles)[0]);
    }

    setDeleteFileDialog({ show: false, file: "" });
  };

  // Copy content
  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(files[activeFile]);
    alert("Copied to clipboard");
  };

  // Download content
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
    <div className="flex flex-col h-screen bg-[#0d1117] text-white relative">

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <h1 className="font-semibold text-lg">Markdown IDE</h1>
        <div className="flex gap-4 text-sm md:text-base">
          <Link
  href="/generate"
  className="hover:text-white text-zinc-400 px-3 py-1 border border-zinc-600 rounded inline-block"
>
  Generate
</Link>
          <button
            onClick={copyMarkdown}
            className="hover:text-white text-zinc-400 px-3 py-1 border border-zinc-600 rounded cursor-pointer"
          >
            Copy
          </button>
          <button
            onClick={downloadMarkdown}
            className="hover:text-white text-zinc-400 px-3 py-1 border border-zinc-600 rounded cursor-pointer"
          >
            Download
          </button>
        </div>
      </header>

      {/* File Tabs */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800 overflow-x-auto">
        {Object.keys(files).map((file) => (
          <div key={file} className="relative flex items-center gap-1">
            <button
              onClick={() => setActiveFile(file)}
              className={`px-3 py-1 rounded text-sm md:text-base ${
                activeFile === file
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {file}
            </button>
            <button
              onClick={() => confirmDeleteFile(file)}
              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-xs hover:bg-red-400"
              title="Delete file"
            >
              ×
            </button>
          </div>
        ))}
        <button
          onClick={() => setShowNewFileDialog(true)}
          className="text-zinc-400 hover:text-white px-3 py-1 border border-zinc-600 rounded text-sm md:text-base"
        >
          + New
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="flex md:hidden border-b border-zinc-800">
        {["editor", "preview"].map((tab) => (
          <button
            key={tab}
            onClick={() => setMobileTab(tab)}
            className={`flex-1 py-2 text-sm ${
              mobileTab === tab ? "border-b-2 border-white" : "text-zinc-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Editor + Preview */}
      <div className="flex flex-1 overflow-hidden">

        {/* Editor */}
        <div
          className={`w-full md:w-1/2 h-full ${
            mobileTab !== "editor" ? "hidden md:block" : ""
          }`}
        >
          <textarea
            value={files[activeFile]}
            onChange={(e) => updateContent(e.target.value)}
            className="w-full h-full resize-none bg-black p-6 text-lg font-mono outline-none border-r border-zinc-800"
          />
        </div>

        {/* Preview */}
        <div
          className={`w-full md:w-1/2 h-full overflow-y-auto ${
            mobileTab !== "preview" ? "hidden md:block" : ""
          }`}
        >
          <article className="markdown-body p-6 text-lg h-full overflow-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {files[activeFile]}
            </ReactMarkdown>
          </article>
        </div>
      </div>

      {/* New File Dialog */}
      {showNewFileDialog && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161b22] p-6 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-white font-semibold text-lg">Create New File</h2>
            <input
              type="text"
              placeholder="File name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-zinc-600 outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNewFileDialog(false)}
                className="px-4 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateFile}
                className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete File Dialog */}
      {deleteFileDialog.show && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#161b22] p-6 rounded shadow-md w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-white font-semibold text-lg">Delete File</h2>
            <p className="text-zinc-300">
              Are you sure you want to delete <span className="font-bold">{deleteFileDialog.file}</span>?<br />
              All content will be <span className="text-red-400 font-bold">permanently deleted</span>.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteFileDialog({ show: false, file: "" })}
                className="px-4 py-1 bg-zinc-700 rounded hover:bg-zinc-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFile}
                className="px-4 py-1 bg-red-600 rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
