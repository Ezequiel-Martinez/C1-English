import { BookOpenText } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="border-b border-white/60 bg-white/35 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
        <a href="#top" className="group flex items-center gap-3" aria-label="C1 English Daily Activation home">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-600 to-purple-800 text-white shadow-lg shadow-fuchsia-500/20 transition group-hover:-rotate-2">
            <BookOpenText size={19} strokeWidth={1.8} />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold leading-none">C1 English</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-sage-600">Daily activation</span>
          </span>
        </a>
        <div className="hidden items-center gap-3 text-sm text-ink/55 sm:flex">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-sm shadow-amber-300" />
          90-day practice cycle
        </div>
      </div>
    </header>
  )
}
