"use client";

import { useState } from "react";

const LICENSES = {
  mit: {
    name: "MIT License",
    description: "Simple and permissive. Allows commercial use.",
    template: (author, year) => `MIT License

Copyright (c) ${year} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
`,
  },

  apache: {
    name: "Apache License 2.0",
    description: "Good for enterprise & patents protection.",
    template: (author, year) => `Apache License
Version 2.0, January ${year}
http://www.apache.org/licenses/

Copyright ${year} ${author}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License...
`,
  },

  gpl: {
    name: "GNU GPL v3",
    description: "Forces open-source sharing of modifications.",
    template: (author, year) => `GNU GENERAL PUBLIC LICENSE
Version 3, ${year}

Copyright (C) ${year} ${author}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License...
`,
  },

  bsd: {
    name: "BSD 3-Clause License",
    description: "Permissive with attribution.",
    template: (author, year) => `BSD 3-Clause License

Copyright (c) ${year}, ${author}
All rights reserved.

Redistribution and use in source and binary forms...
`,
  },

  unlicense: {
    name: "Unlicense",
    description: "Public domain. No restrictions.",
    template: () => `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell...
`,
  },
};

export default function LicenseGenerator() {
  const [licenseKey, setLicenseKey] = useState("mit");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const year = new Date().getFullYear();

  const generateLicense = () => {
    const license = LICENSES[licenseKey];
    const text = license.template(author || "Your Name", year);
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
    a.download = "LICENSE.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4 md:p-8">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">License Generator</h1>
      <p className="text-zinc-400 mb-6">
        Generate a LICENSE.md file for your project
      </p>

      {/* Controls */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* License Selector */}
        <div>
          <label className="text-sm text-zinc-400">License Type</label>
          <select
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
          >
            {Object.entries(LICENSES).map(([key, l]) => (
              <option key={key} value={key}>
                {l.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-zinc-500 mt-1">
            {LICENSES[licenseKey].description}
          </p>
        </div>

        {/* Author */}
        <div>
          <label className="text-sm text-zinc-400">Author / Organization</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name or company"
            className="w-full mt-1 p-2 bg-black border border-zinc-700 rounded"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-5">
        <button
          onClick={generateLicense}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          Generate License
        </button>

        <button
          onClick={copyText}
          disabled={!content}
          className="px-4 py-2 border border-zinc-600 rounded hover:text-white disabled:opacity-40"
        >
          Copy
        </button>

        <button
          onClick={downloadFile}
          disabled={!content}
          className="px-4 py-2 border border-zinc-600 rounded hover:text-white disabled:opacity-40"
        >
          Download
        </button>
      </div>

      {/* Output */}
      <textarea
        value={content}
        readOnly
        placeholder="Generated LICENSE.md will appear here..."
        className="w-full mt-6 h-72 p-4 bg-black text-sm font-mono border border-zinc-700 rounded resize-none"
      />

      {/* Help */}
      <div className="mt-6 text-sm text-zinc-400">
        <h3 className="font-semibold text-white mb-1">
          Not sure which license to choose?
        </h3>
        <ul className="list-disc ml-5 space-y-1">
          <li><b>MIT</b> – Best for most open-source projects</li>
          <li><b>Apache 2.0</b> – When patents matter</li>
          <li><b>GPL</b> – Force users to share changes</li>
          <li><b>BSD</b> – Minimal restrictions</li>
          <li><b>Unlicense</b> – Public domain</li>
        </ul>
      </div>
    </div>
  );
}
