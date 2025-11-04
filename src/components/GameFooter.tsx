export default function GameFooter() {
  return (
    <footer className="mt-16 mb-2">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <a
            href="https://git-scm.com/cheat-sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5
                       text-white text-sm font-medium shadow hover:bg-emerald-700 transition"
          >
            📄 Git Cheat Sheet
          </a>
        </div>
      </div>
    </footer>
  );
}
