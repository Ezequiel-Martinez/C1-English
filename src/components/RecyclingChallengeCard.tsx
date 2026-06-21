import { Recycle } from 'lucide-react'
import type { Lesson } from '../types'
import { TextareaAnswerBox } from './TextareaAnswerBox'

export function RecyclingChallengeCard({ lesson }: { lesson: Lesson }) {
  const challenge = lesson.recyclingChallenge!
  const storageKey = `c1-answer-day-${lesson.day}-recycling`

  return (
    <article className="liquid-glass rounded-2xl bg-gradient-to-br from-amber-50/70 via-yellow-50/45 to-fuchsia-50/40 p-6 sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[230px_1fr] lg:gap-10">
        <div>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 shadow-lg shadow-amber-300/30"><Recycle size={18} /></span>
          <p className="eyebrow mt-5 text-rust">{challenge.source}</p>
          <h3 className="mt-2 font-display text-2xl leading-tight">{challenge.target}</h3>
        </div>
        <div>
          <p className="text-sm leading-6 text-ink/60">{challenge.instruction}</p>
          <p className="my-4 font-display text-xl leading-7">{challenge.prompt}</p>
          <TextareaAnswerBox storageKey={storageKey} />
        </div>
      </div>
    </article>
  )
}
