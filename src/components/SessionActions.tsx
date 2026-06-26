import { Files } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Lesson } from '../types'
import { buildDetailedSessionPrompt, buildShortSessionPrompt } from '../lib/prompt'
import { CopyPromptButton } from './CopyPromptButton'

function collectAnswers(lesson: Lesson) {
  const answers: Record<string, string> = {}
  for (const task of [...lesson.tasks, ...(lesson.extraTasks ?? [])]) {
    answers[task.id] = localStorage.getItem(`c1-answer-day-${lesson.day}-${task.id}`) ?? ''
  }
  answers.speaking = localStorage.getItem(`c1-answer-day-${lesson.day}-speaking`) ?? ''
  answers.recycling = localStorage.getItem(`c1-answer-day-${lesson.day}-recycling`) ?? ''
  return answers
}

export function SessionActions({ lesson }: { lesson: Lesson }) {
  const countAnswers = () => Object.values(collectAnswers(lesson)).filter((answer) => answer.trim()).length
  const [answerCount, setAnswerCount] = useState(countAnswers)

  useEffect(() => {
    const updateCount = () => setAnswerCount(countAnswers())
    updateCount()
    window.addEventListener('c1-answers-changed', updateCount)
    return () => window.removeEventListener('c1-answers-changed', updateCount)
  }, [lesson])

  return (
    <div className="liquid-glass mb-8 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-500/20">
          <Files size={17} />
        </span>
        <div>
          <p className="text-sm font-bold">Ready for general feedback?</p>
          <p className="mt-1 text-xs leading-5 text-ink/50">
            {answerCount > 0
              ? `${answerCount} completed ${answerCount === 1 ? 'response' : 'responses'} will be included. Choose short or detailed feedback.`
              : 'Write at least one response to create your session feedback prompts.'}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <CopyPromptButton
          label="Short correction prompt"
          variant="session"
          disabled={answerCount === 0}
          getPrompt={() => buildShortSessionPrompt(lesson, collectAnswers(lesson))}
        />
        <CopyPromptButton
          label="Detailed correction prompt"
          variant="default"
          disabled={answerCount === 0}
          getPrompt={() => buildDetailedSessionPrompt(lesson, collectAnswers(lesson))}
        />
      </div>
    </div>
  )
}
