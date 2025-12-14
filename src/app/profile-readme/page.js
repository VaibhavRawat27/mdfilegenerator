"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const skillsList = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "Django", "Flask", "MongoDB", "PostgreSQL",
  "Docker", "AWS", "Git", "Linux", "Tailwind CSS",
];

export default function ProfileReadmeGenerator() {
  const [step, setStep] = useState(1);

  const [basic, setBasic] = useState({
    name: "",
    username: "",
    role: "",
    location: "",
  });

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [socials, setSocials] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    email: "",
    instagram: "",
  });

  const [extras, setExtras] = useState({
    stats: true,
    streak: false,
  });

  const [output, setOutput] = useState("");

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const generateReadme = () => {
    const text = `# Hi 👋, I'm ${basic.name || "Your Name"}

### ${basic.role || "Developer"} from ${basic.location || "Earth 🌍"}

${about || "Write something about yourself here..."}

---

## 🛠️ Skills & Tools

${skills.length ? skills.map(s => `- ${s}`).join("\n") : "- Add your skills"}

---

## 🌐 Connect with me

${socials.github ? `- GitHub: https://github.com/${socials.github}` : ""}
${socials.linkedin ? `- LinkedIn: ${socials.linkedin}` : ""}
${socials.twitter ? `- X (Twitter): ${socials.twitter}` : ""}
${socials.instagram ? `- Instagram: ${socials.instagram}` : ""}
${socials.email ? `- Email: ${socials.email}` : ""}

---

${extras.stats ? `## 📊 GitHub Stats

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${basic.username || "username"}&show_icons=true&theme=dark)
` : ""}

${extras.streak ? `
## 🔥 GitHub Streak

![GitHub Streak](https://streak-stats.demolab.com?user=${basic.username || "username"}&theme=dark)
` : ""}
`;

    setOutput(text);
    setStep(5);
  };

  const copyText = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(output);
    } else {
      const t = document.createElement("textarea");
      t.value = output;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    alert("Copied!");
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen bg-[#0d1117] text-white flex flex-col md:flex-row">

      {/* LEFT – LIVE PREVIEW */}
      <div className="md:w-1/2 w-full border-b md:border-b-0 md:border-r border-zinc-800 p-4 md:p-6 overflow-auto">
        <h2 className="text-lg font-semibold mb-3 text-zinc-300">
          Live Preview
        </h2>

        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {output || "_Preview will appear here as you generate_"}
          </ReactMarkdown>
        </div>
      </div>

      {/* RIGHT – FORM */}
      <div className="md:w-1/2 w-full overflow-auto p-4 md:p-8">

        {/* STEP BUBBLES */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStep(n)}
              className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${
                step === n
                  ? "bg-white text-black"
                  : "border border-zinc-600 text-zinc-400"
              }`}
            >
              Step {n}
            </button>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="max-w-lg mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <input className="input" placeholder="Your Name" onChange={e=>setBasic({...basic,name:e.target.value})}/>
            <input className="input" placeholder="GitHub Username" onChange={e=>setBasic({...basic,username:e.target.value})}/>
            <input className="input" placeholder="Role (e.g. Full Stack Dev)" onChange={e=>setBasic({...basic,role:e.target.value})}/>
            <input className="input" placeholder="Location" onChange={e=>setBasic({...basic,location:e.target.value})}/>
            <button className="btn-primary" onClick={()=>setStep(2)}>Next</button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="max-w-lg mx-auto space-y-4">
            <h2 className="text-xl font-semibold">About You</h2>
            <textarea className="textarea" placeholder="Tell something about yourself" onChange={e=>setAbout(e.target.value)}/>
            <button className="btn-primary" onClick={()=>setStep(3)}>Next</button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-3">Skills & Tools</h2>
            <div className="flex flex-wrap gap-2">
              {skillsList.map(skill => (
                <button
                  key={skill}
                  onClick={()=>toggleSkill(skill)}
                  className={`px-3 py-1 rounded border text-sm ${
                    skills.includes(skill)
                      ? "bg-white text-black"
                      : "border-zinc-600 text-zinc-300"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <button className="btn-primary mt-4" onClick={()=>setStep(4)}>Next</button>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="max-w-lg mx-auto space-y-3">
            <h2 className="text-xl font-semibold">Social Links</h2>
            {Object.keys(socials).map(k => (
              <input
                key={k}
                className="input"
                placeholder={k}
                onChange={e=>setSocials({...socials,[k]:e.target.value})}
              />
            ))}

            <label className="flex gap-2 text-sm">
              <input type="checkbox" checked={extras.stats} onChange={()=>setExtras({...extras,stats:!extras.stats})}/>
              Show GitHub Stats
            </label>

            <label className="flex gap-2 text-sm">
              <input type="checkbox" checked={extras.streak} onChange={()=>setExtras({...extras,streak:!extras.streak})}/>
              Show GitHub Streak
            </label>

            <button className="btn-primary" onClick={generateReadme}>
              Generate README
            </button>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div className="max-w-lg mx-auto space-y-4">
            <h2 className="text-xl font-semibold">Export</h2>
            <button className="btn-outline" onClick={copyText}>Copy</button>
            <button className="btn-outline" onClick={downloadFile}>Download</button>
            <button className="btn-outline" onClick={()=>setStep(1)}>Edit Again</button>
          </div>
        )}
      </div>

      {/* STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          background: black;
          border: 1px solid #3f3f46;
          border-radius: 6px;
        }
        .textarea {
          width: 100%;
          height: 180px;
          padding: 12px;
          background: black;
          border: 1px solid #3f3f46;
          border-radius: 6px;
          resize: none;
        }
        .btn-primary {
          padding: 10px 16px;
          background: #2563eb;
          border-radius: 6px;
        }
        .btn-outline {
          padding: 10px 16px;
          border: 1px solid #3f3f46;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
