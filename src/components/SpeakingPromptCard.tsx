import { Mic2 } from 'lucide-react'
import type { Lesson } from '../types'
import { TextareaAnswerBox } from './TextareaAnswerBox'

export function SpeakingPromptCard({ lesson }: { lesson: Lesson }) {
  const speaking = lesson.speakingPrompt!
  const storageKey = `c1-answer-day-${lesson.day}-speaking`

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-800 p-6 text-white shadow-2xl shadow-fuchsia-900/20 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-fuchsia-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div>
          <div className="mb-6 flex items-center gap-2 text-[#aec4b3]">
            <Mic2 size={17} />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em]">60–90 seconds</p>
          </div>
          <h3 className="font-display text-3xl leading-tight sm:text-4xl">{speaking.prompt}</h3>
          <p className="mt-5 text-sm leading-6 text-white/60">{speaking.instruction}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {speaking.notes.map((note) => (
              <span key={note} className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/65">{note}</span>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl border border-white/60 bg-white/75 p-5 text-ink shadow-2xl shadow-violet-950/20 backdrop-blur-2xl sm:p-6">
          <TextareaAnswerBox storageKey={storageKey} label="My spoken answer / notes" large />
        </div>
      </div>
    </article>
  )
}
