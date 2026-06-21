import { CornerDownRight } from 'lucide-react'
import type { Lesson, Task } from '../types'
import { TextareaAnswerBox } from './TextareaAnswerBox'

export function TaskCard({ lesson, task, index }: { lesson: Lesson; task: Task; index: number }) {
  const storageKey = `c1-answer-day-${lesson.day}-${task.id}`

  return (
    <article className="liquid-glass overflow-hidden rounded-2xl">
      <div className="grid gap-6 p-6 sm:p-7 lg:grid-cols-[170px_1fr] lg:gap-9">
        <div>
          <span className="mb-3 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-100 to-violet-200 text-xs font-bold text-violet-800 shadow-inner">{String(index + 1).padStart(2, '0')}</span>
          <p className="eyebrow leading-relaxed">{task.type}</p>
          {task.requiredWord && (
            <div className="mt-5 inline-block rounded-lg border border-amber-200/70 bg-amber-50/70 px-3 py-2 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-wider text-ink/35">Use</p>
              <p className="mt-0.5 text-sm font-bold text-rust">{task.requiredWord}</p>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm leading-6 text-ink/60">{task.instruction}</p>
          <div className="my-5 flex gap-3 rounded-xl border border-white/60 bg-white/45 p-4 text-[15px] font-medium leading-6 text-ink/85 shadow-inner backdrop-blur-xl">
            <CornerDownRight className="mt-0.5 shrink-0 text-sage-600" size={17} />
            <p>{task.prompt}</p>
          </div>
          <TextareaAnswerBox storageKey={storageKey} />
        </div>
      </div>
    </article>
  )
}
