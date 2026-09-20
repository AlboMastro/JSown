function Header() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/50 px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white">
            JS<span className="text-indigo-400">own</span>
          </h1>
          <p className="text-xs text-zinc-400">
            JSON to MD tool
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/AlboMastro"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-medium text-zinc-300 ring-1 ring-inset ring-zinc-800 transition hover:bg-zinc-800 hover:text-white"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

export default Header;