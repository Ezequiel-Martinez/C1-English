import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

interface DaySelectorProps {
  day: number
  startDate: string
  currentCycleDay: number | null
  onDayChange: (day: number) => void
  onStartDateChange: (date: string) => void
}

export function DaySelector({ day, startDate, currentCycleDay, onDayChange, onStartDateChange }: DaySelectorProps) {
  const canOpenCurrent = currentCycleDay !== null && currentCycleDay !== day

  return (
    <section className="relative z-10 mx-auto -mb-8 max-w-6xl px-5 sm:px-8 lg:px-10" aria-label="Lesson controls">
      <div className="liquid-glass flex flex-col gap-5 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous day"
            onClick={() => onDayChange(Math.max(1, day - 1))}
            disabled={day === 1}
            className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-ink/10 text-ink/60 hover:bg-sage-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <label className="relative">
            <span className="sr-only">Select practice day</span>
            <select
              value={day}
              onChange={(event) => onDayChange(Number(event.target.value))}
            className="focus-ring h-10 min-w-40 appearance-none rounded-xl border border-white/80 bg-white/60 px-4 pr-10 text-sm font-semibold shadow-inner backdrop-blur-xl"
            >
              {Array.from({ length: 90 }, (_, index) => (
                <option key={index + 1} value={index + 1}>Day {index + 1} of 90</option>
              ))}
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-ink/40" size={15} />
          </label>
          <button
            type="button"
            aria-label="Next day"
            onClick={() => onDayChange(Math.min(90, day + 1))}
            disabled={day === 90}
            className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-ink/10 text-ink/60 hover:bg-sage-50 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <label className="flex items-center gap-2 text-sm text-ink/55">
            <CalendarDays size={16} />
            <span className="whitespace-nowrap">Start date</span>
            <input
              type="date"
              value={startDate}
              onChange={(event) => onStartDateChange(event.target.value)}
              className="focus-ring h-10 min-w-0 rounded-xl border border-white/80 bg-white/60 px-3 text-sm text-ink shadow-inner backdrop-blur-xl"
            />
          </label>
          {canOpenCurrent && (
            <button
              type="button"
              onClick={() => onDayChange(currentCycleDay)}
              className="focus-ring h-10 whitespace-nowrap rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 text-xs font-bold text-white shadow-md shadow-fuchsia-500/20 hover:brightness-110"
            >
              Open Day {currentCycleDay}
            </button>
          )}
          {currentCycleDay !== null && !canOpenCurrent && (
            <span className="whitespace-nowrap rounded-full bg-sage-100 px-3 py-1.5 text-xs font-bold text-sage-700">Today</span>
          )}
        </div>
      </div>
    </section>
  )
}
