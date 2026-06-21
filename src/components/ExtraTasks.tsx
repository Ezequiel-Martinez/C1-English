import { Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { Lesson } from '../types'
import { TaskCard } from './TaskCard'

export function ExtraTasks({ lesson }: { lesson: Lesson }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const extraTasks = lesson.extraTasks ?? []

  if (!extraTasks.length) return null

  return (
    <div className="mt-5">
      <div className="liquid-glass flex flex-col items-start justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 shadow-lg shadow-amber-400/20">
            <Sparkles size={18} />
          </span>
          <div>
            <p className="text-sm font-bold">Need more activation?</p>
            <p className="mt-1 text-xs leading-5 text-ink/50">
              {visibleCount === 0
                ? `${extraTasks.length} optional rewriting challenges are ready.`
                : visibleCount < extraTasks.length
                  ? `${extraTasks.length - visibleCount} more challenge${extraTasks.length - visibleCount === 1 ? '' : 's'} available.`
                  : 'You have opened the complete extra set.'}
            </p>
          </div>
        </div>
        {visibleCount < extraTasks.length && (
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(extraTasks.length, count + 1))}
            className="focus-ring inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-400 px-4 text-xs font-bold text-amber-950 shadow-md shadow-amber-300/20 hover:brightness-105"
          >
            <Plus size={15} /> Add another task
          </button>
        )}
      </div>
      {visibleCount > 0 && (
        <div className="mt-4 space-y-4">
          {extraTasks.slice(0, visibleCount).map((task, index) => (
            <TaskCard key={`${lesson.day}-${task.id}`} lesson={lesson} task={task} index={lesson.tasks.length + index} />
          ))}
        </div>
      )}
    </div>
  )
}
