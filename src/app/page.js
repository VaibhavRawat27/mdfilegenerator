import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex justify-center">
      <main className="w-full max-w-6xl px-6 py-16 sm:px-10 lg:px-20 bg-white dark:bg-black">

        {/* Top Bar */}
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white">
            mdFileGenerator
          </h1>

          <a
            href="https://github.com/your-username/mdFileGenerator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            GitHub
          </a>
        </header>

        {/* Hero */}
        <section className="mt-24 text-center sm:text-left max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-semibold leading-tight tracking-tight text-black dark:text-white">
            Markdown files, <br className="hidden sm:block" />
            generated properly.
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            mdFileGenerator helps you generate clean, structured and
            professional Markdown files for GitHub projects and profiles —
            without copy-paste or messy templates.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-black px-8 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Generate Markdown
            </Link>

            <Link
              href="/generate"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-black px-8 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Markdown Previewer
            </Link>

            <a
              href="https://github.com/your-username/mdFileGenerator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-zinc-300 px-8 text-sm font-medium text-black transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
            >
              View Repository
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="my-24 h-px bg-zinc-200 dark:bg-zinc-800" />

        {/* Supported Files */}
        <section>
          <h3 className="text-2xl font-semibold text-black dark:text-white">
            Supported Markdown files
          </h3>

          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Generate all essential documentation files required for
            professional and open-source projects.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Project README", "README.md for repositories"],
              ["Profile README", "GitHub profile introduction"],
              ["License Files", "MIT, Apache, GPL"],
              ["CONTRIBUTING", "Contribution guidelines"],
              ["Code of Conduct", "Community standards"],
              ["Custom Markdown", "Any custom MD structure"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
              >
                <p className="font-medium text-black dark:text-white">
                  {title}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mt-24 max-w-3xl">
          <h3 className="text-2xl font-semibold text-black dark:text-white">
            How it works
          </h3>

          <ul className="mt-6 space-y-3 text-zinc-600 dark:text-zinc-400">
            <li>1. Choose the type of Markdown file</li>
            <li>2. Fill in required details</li>
            <li>3. Preview generated Markdown</li>
            <li>4. Copy or download instantly</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-32 border-t border-zinc-200 pt-8 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          Open source • Built with Next.js • 2025
        </footer>
      </main>
    </div>
  );
}
