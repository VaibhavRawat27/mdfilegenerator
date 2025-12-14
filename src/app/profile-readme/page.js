"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const skillsList = [
  "JavaScript","TypeScript","React","Next.js","Node.js",
  "Python","Django","Flask","MongoDB","PostgreSQL",
  "Docker","AWS","Git","Linux","Tailwind CSS",
];

export default function ProfileReadmeGenerator() {

  const [mobileTab, setMobileTab] = useState("editor");
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
${socials.twitter ? `- X: ${socials.twitter}` : ""}
${socials.instagram ? `- Instagram: ${socials.instagram}` : ""}
${socials.email ? `- Email: ${socials.email}` : ""}

---

${extras.stats ? `## 📊 GitHub Stats
![Stats](https://github-readme-stats.vercel.app/api?username=${basic.username}&show_icons=true&theme=dark)
` : ""}

${extras.streak ? `## 🔥 GitHub Streak
![Streak](https://streak-stats.demolab.com?user=${basic.username}&theme=dark)
` : ""}
`;
    setOutput(text);
    setStep(5);
  };

  const copyText = () => {
    navigator.clipboard?.writeText(output);
    alert("Copied!");
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "README.md";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-4">

      <p className="text-center text-2xl md:text-2xl font-bold text-white my-6">
        Profile README Generator
      </p>

      {/* STEP BUBBLES */}
      <div className="flex gap-2 mb-6 overflow-x-auto justify-center">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={()=>setStep(n)}
            className={`px-4 py-1 rounded-full text-sm ${
              step === n
                ? "bg-white text-black"
                : "border border-zinc-600 text-zinc-400"
            }`}
          >
            Step {n}
          </button>
        ))}
      </div>

      {/* STEPS 1–4 */}
      {step !== 5 && (
        <div className="max-w-lg mx-auto space-y-5">
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold">Basic Info</h2>
              <input className="input" placeholder="Name" onChange={e=>setBasic({...basic,name:e.target.value})}/>
              <input className="input" placeholder="GitHub Username" onChange={e=>setBasic({...basic,username:e.target.value})}/>
              <input className="input" placeholder="Role" onChange={e=>setBasic({...basic,role:e.target.value})}/>
              <input className="input" placeholder="Location" onChange={e=>setBasic({...basic,location:e.target.value})}/>
              <button className="btn-primary" onClick={()=>setStep(2)}>Next</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold">About You</h2>
              <textarea className="textarea" onChange={e=>setAbout(e.target.value)} />
              <button className="btn-primary" onClick={()=>setStep(3)}>Next</button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map(skill => (
                  <button
                    key={skill}
                    onClick={()=>toggleSkill(skill)}
                    className={`px-3 py-1 rounded border ${
                      skills.includes(skill)
                        ? "bg-white text-black"
                        : "border-zinc-600"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <button className="btn-primary" onClick={()=>setStep(4)}>Next</button>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-xl font-semibold">Socials</h2>
              {Object.keys(socials).map(k=>(
                <input key={k} className="input" placeholder={k} onChange={e=>setSocials({...socials,[k]:e.target.value})}/>
              ))}
              <label className="flex gap-2 text-sm">
                <input type="checkbox" checked={extras.stats} onChange={()=>setExtras({...extras,stats:!extras.stats})}/>
                GitHub Stats
              </label>
              <label className="flex gap-2 text-sm">
                <input type="checkbox" checked={extras.streak} onChange={()=>setExtras({...extras,streak:!extras.streak})}/>
                GitHub Streak
              </label>
              <button className="btn-primary" onClick={generateReadme}>
                Generate README
              </button>
            </>
          )}
        </div>
      )}

    {/* STEP 5 – EDITOR + FULL PREVIEW */}
{step === 5 && (
  <div className="flex flex-col md:flex-row border border-zinc-800 rounded overflow-hidden">

    {/* LEFT – MARKDOWN EDITOR */}
    <div className="flex flex-col w-full md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-800">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-400">Markdown Editor</h2>
        <div className="flex gap-2">
          <button onClick={copyText} className="btn-outline text-xs">Copy</button>
          <button onClick={downloadFile} className="btn-outline text-xs">Download</button>
        </div>
      </div>
      <textarea
        value={output}
        onChange={(e) => setOutput(e.target.value)}
        className="w-full min-h-[60vh] textarea font-mono border-none rounded-none editor-scrollbar"
        placeholder="Edit README.md..."
      />
    </div>

    {/* RIGHT – LIVE PREVIEW */}
    <div className="w-full md:w-1/2 p-4 preview-scrollbar">
      <h2 className="text-sm font-semibold text-zinc-400 mb-2">Live Preview</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {output}
      </ReactMarkdown>
    </div>

  </div>
)}

     
      <style jsx>{`
        .input, .textarea {
          width: 100%;
          padding: 10px;
          background: black;
          border: 1px solid #3f3f46;
          border-radius: 6px;
          color: white;
        }
        .textarea { height: 160px; resize: none; }
        .btn-primary {
          padding: 10px;
          background: #2563eb;
          border-radius: 6px;
          color: white;
        }
        .btn-outline {
          padding: 10px;
          border: 1px solid #3f3f46;
          border-radius: 6px;
          color: white;
        }

        /* Custom scrollbar for Live Preview */
        .preview-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #2563eb #0d1117;
        }
        .preview-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .preview-scrollbar::-webkit-scrollbar-track {
          background: #0d1117;
        }
        .preview-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2563eb;
          border-radius: 4px;
          border: 2px solid #0d1117;
        }

        /* Custom scrollbar for Editor */
        .editor-scrollbar {
          overflow: auto;
          scrollbar-width: thin;
          scrollbar-color: #2563eb #0d1117;
        }
        .editor-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .editor-scrollbar::-webkit-scrollbar-track {
          background: #0d1117;
        }
        .editor-scrollbar::-webkit-scrollbar-thumb {
          background-color: #2563eb;
          border-radius: 4px;
          border: 2px solid #0d1117;
        }
      `}</style>
    </div>
  );
}
