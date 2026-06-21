import { useLocalStorage } from '../hooks/useLocalStorage'

interface TextareaAnswerBoxProps {
  storageKey: string
  label?: string
  large?: boolean
  onChange?: (answer: string) => void
}

export function TextareaAnswerBox({ storageKey, label = 'Your answer', large = false, onChange }: TextareaAnswerBoxProps) {
  const [answer, setAnswer] = useLocalStorage(storageKey, '')

  const updateAnswer = (next: string) => {
    setAnswer(next)
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      // Keep the writing experience usable when storage is unavailable.
    }
    onChange?.(next)
    window.dispatchEvent(new CustomEvent('c1-answers-changed'))
  }

  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink/45">{label}</span>
        <span className="text-[11px] text-ink/35">Saved locally</span>
      </div>
      <textarea
        value={answer}
        onChange={(event) => updateAnswer(event.target.value)}
        rows={large ? 7 : 4}
        placeholder="Write your answer here…"
        className="focus-ring min-h-32 w-full resize-y rounded-xl border border-white/80 bg-white/55 px-4 py-3.5 text-[15px] leading-7 text-ink shadow-inner shadow-violet-950/5 backdrop-blur-xl placeholder:text-ink/30"
      />
    </label>
  )
}
