import { ArrowDown, Clock3 } from 'lucide-react'
import type { Lesson } from '../types'

export function LessonSummary({ lesson }: { lesson: Lesson }) {
  const progress = Math.round((lesson.day / 90) * 100)

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#331042] via-[#642079] to-[#b42d7a] pb-16 pt-20 text-paper sm:pb-20 sm:pt-24">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -top-28 h-96 w-96 rounded-full bg-violet-400/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-80 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_280px] lg:px-10">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/75">
              Day {lesson.day.toString().padStart(2, '0')}
            </span>
            <span className="text-sm text-white/55">Type {lesson.typeCode}</span>
            <span className="flex items-center gap-1.5 text-sm text-white/55"><Clock3 size={14} /> 10–15 min</span>
          </div>
          <p className="mb-3 text-sm font-semibold text-fuchsia-200">{lesson.dayType}</p>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
            {lesson.targetStructure}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <p className="text-sm text-white/50">Today’s lexical item</p>
            <p className="font-display text-2xl text-white">{lesson.targetLexicalItem}</p>
            <a href="#lesson" className="group flex items-center gap-2 text-sm font-semibold text-fuchsia-200 hover:text-white">
              Begin session <ArrowDown size={15} className="transition group-hover:translate-y-1" />
            </a>
          </div>
        </div>
        <div className="self-end rounded-2xl border border-white/20 bg-white/[0.10] p-5 shadow-2xl shadow-violet-950/20 backdrop-blur-2xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Cycle progress</p>
              <p className="mt-2 font-display text-3xl">{progress}%</p>
            </div>
            <p className="text-sm text-white/50">{lesson.day} / 90</p>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-300 via-rose-300 to-amber-300 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-white/45">Production first. Feedback happens outside this space.</p>
        </div>
      </div>
    </section>
  )
}
