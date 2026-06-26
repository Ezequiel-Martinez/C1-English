import { useMemo } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  Braces,
  Focus,
  Languages,
  MessageSquareText,
  Sparkles,
  Target,
} from 'lucide-react'
import { getLesson } from './data/lessons'
import { useLocalStorage } from './hooks/useLocalStorage'
import {
  AppHeader,
  DaySelector,
  DictionaryMode,
  ExtraTasks,
  LessonCard,
  LessonSummary,
  ModelAnswerCard,
  RecyclingChallengeCard,
  SessionActions,
  SpeakingPromptCard,
  TaskCard,
} from './components'

function getCycleDay(startDate: string): number | null {
  if (!startDate) return null
  const start = new Date(`${startDate}T00:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const elapsed = Math.floor((today.getTime() - start.getTime()) / 86_400_000) + 1
  if (elapsed < 1) return null
  return ((elapsed - 1) % 90) + 1
}

function SectionHeading({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="mb-7 grid gap-3 sm:grid-cols-[170px_1fr] sm:gap-8">
      <p className="eyebrow pt-2">{step}</p>
      <div>
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/55">{description}</p>
      </div>
    </div>
  )
}

function EmptyLesson({ day, dayType }: { day: number; dayType: string }) {
  return (
    <main id="lesson" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
      <div className="liquid-glass rounded-3xl px-6 py-16 text-center sm:px-12">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-sage-100 text-sage-700"><Sparkles size={20} /></span>
        <p className="eyebrow mt-6">Day {day} · {dayType}</p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl leading-tight">This lesson outline exists, but the full activation tasks have not been added yet.</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-ink/50">Days 6, 7, and 8 are ready for a complete session. Select one above to explore the full practice flow.</p>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem('c1-selected-day', '6')
            window.location.reload()
          }}
          className="focus-ring mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-sage-900 px-5 text-sm font-bold text-white hover:bg-sage-700"
        >
          Open Day 6 <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}

export default function App() {
  const [selectedDay, setSelectedDay] = useLocalStorage('c1-selected-day', '6')
  const [startDate, setStartDate] = useLocalStorage('c1-start-date', '')
  const day = Math.min(90, Math.max(1, Number(selectedDay) || 6))
  const lesson = getLesson(day)
  const currentCycleDay = useMemo(() => getCycleDay(startDate), [startDate])

  const selectDay = (nextDay: number) => {
    setSelectedDay(String(nextDay))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="top" className="min-h-screen">
      <AppHeader />
      <DaySelector
        day={day}
        startDate={startDate}
        currentCycleDay={currentCycleDay}
        onDayChange={selectDay}
        onStartDateChange={setStartDate}
      />
      <LessonSummary lesson={lesson} />

      {!lesson.complete ? (
        <EmptyLesson day={day} dayType={lesson.dayType} />
      ) : (
        <main id="lesson" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <section>
            <SectionHeading
              step="01 · Understand"
              title="Today’s language"
              description="Start with purpose, not rules. Notice what this language lets you do in a real exchange."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              <LessonCard label="Target structure" icon={Braces}>
                <h3 className="font-display text-2xl leading-tight">{lesson.targetStructure}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-sage-700">{lesson.structureFunction}</p>
                <p className="mt-4 text-sm leading-6 text-ink/55">{lesson.explanation}</p>
              </LessonCard>

              <LessonCard label="Target lexical item" icon={Languages} tone="tint">
                <h3 className="font-display text-3xl leading-none">{lesson.targetLexicalItem}</h3>
                <p className="mt-4 text-sm leading-6 text-ink/60">{lesson.lexicalMeaning}</p>
                <dl className="mt-5 space-y-3 border-t border-ink/10 pt-4 text-sm">
                  <div className="grid gap-1 sm:grid-cols-[72px_1fr]">
                    <dt className="font-bold text-ink/40">Pattern</dt>
                    <dd className="font-medium">{lesson.lexicalPattern}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[72px_1fr]">
                    <dt className="font-bold text-ink/40">Example</dt>
                    <dd className="italic leading-6 text-ink/70">“{lesson.lexicalExample}”</dd>
                  </div>
                </dl>
              </LessonCard>

              <LessonCard label="Skill focus" icon={Focus}>
                <p className="text-sm font-bold text-sage-700">{lesson.dayType}</p>
                <h3 className="mt-2 font-display text-2xl">{lesson.skillLabel}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/55">{lesson.skillDescription}</p>
              </LessonCard>

              <LessonCard label="Communicative function" icon={MessageSquareText}>
                <p className="font-display text-[22px] leading-[1.45] text-ink/90">{lesson.communicativeFunction}</p>
              </LessonCard>

              <LessonCard label="Danger zone" icon={AlertTriangle} className="lg:col-span-2" tone="tint">
                <div className="grid gap-3 sm:grid-cols-[170px_1fr] sm:gap-8">
                  <h3 className="font-display text-2xl text-rust">Watch the transfer.</h3>
                  <p className="text-sm leading-6 text-ink/65">{lesson.dangerZone}</p>
                </div>
              </LessonCard>
            </div>
          </section>

          <section className="mt-20 sm:mt-24">
            <SectionHeading
              step="02 · Observe"
              title="C1 models in context"
              description="Read for control and intent. Notice how the target language carries the reasoning rather than decorating it."
            />
            <div className="grid gap-4 lg:grid-cols-2">
              {lesson.modelAnswers.map((answer, index) => (
                <ModelAnswerCard key={answer} answer={answer} number={index + 1} />
              ))}
            </div>
          </section>

          <section className="mt-20 sm:mt-24">
            <SectionHeading
              step="03 · Produce"
              title="Activation tasks"
              description="Rewrite first, then choose a grammar, style, or argument-focused correction prompt. Nothing here grades you."
            />
            <div className="space-y-4">
              {lesson.tasks.map((task, index) => (
                <TaskCard key={`${lesson.day}-${task.id}`} lesson={lesson} task={task} index={index} />
              ))}
            </div>
            <ExtraTasks key={lesson.day} lesson={lesson} />
          </section>

          {lesson.speakingPrompt && (
            <section className="mt-20 sm:mt-24">
              <SectionHeading
                step="04 · Speak"
                title="Take the language off the page"
                description="Use the notes box as scaffolding or as a transcript. Aim for clear movement from position to evidence to conclusion."
              />
              <SpeakingPromptCard key={lesson.day} lesson={lesson} />
            </section>
          )}

          {lesson.recyclingChallenge && (
            <section className="mt-20 sm:mt-24">
              <SectionHeading
                step="05 · Recycle"
                title="One last retrieval"
                description="A short return to earlier language keeps useful structures available under pressure."
              />
              <RecyclingChallengeCard key={lesson.day} lesson={lesson} />
            </section>
          )}

          <section className="mt-20 sm:mt-24">
            <SectionHeading
              step="06 · Feedback"
              title="Review the complete session"
              description="When you are finished, choose a short or detailed correction prompt. Only responses you actually wrote will be included."
            />
            <SessionActions lesson={lesson} />
          </section>

          <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-8">
            <div className="flex items-center gap-2 text-sm text-ink/45">
              <Target size={16} /> Day {day} complete when you decide it is.
            </div>
            <button
              type="button"
              onClick={() => selectDay(Math.min(90, day + 1))}
              disabled={day === 90}
              className="focus-ring inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-sage-700 hover:bg-sage-100 disabled:opacity-30"
            >
              Next day <ArrowRight size={16} />
            </button>
          </div>
        </main>
      )}

      <footer className="border-t border-white/60 bg-white/30 px-5 py-8 text-center text-xs text-ink/40 backdrop-blur-2xl">
        Private by design. Your writing stays in this browser.
      </footer>
      <DictionaryMode />
    </div>
  )
}
