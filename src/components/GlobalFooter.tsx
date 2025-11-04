export default function GlobalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 py-4">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <p className="text-right select-none">
            <span className="text-[11px] sm:text-xs italic text-emerald-700/90">Built with&nbsp;❤️&nbsp;by</span>{' '}
            <span
              className="italic text-[12px] align-middle"
              style={{
                WebkitTextStroke: '0.7px #065f46',
                color: 'transparent',
              }}
            >
              Antonina Dulama
            </span>{' '}
            <span className="text-[11px] sm:text-xs italic text-emerald-700/80">© {year}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
