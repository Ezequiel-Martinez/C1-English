import { Quote } from 'lucide-react'

export function ModelAnswerCard({ answer, number }: { answer: string; number: number }) {
  return (
    <blockquote className="liquid-glass relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7">
      <Quote className="absolute -right-2 -top-4 h-24 w-24 text-sage-100" strokeWidth={1} />
      <p className="relative font-display text-[22px] leading-[1.48] text-ink/90">“{answer}”</p>
      <footer className="mt-6 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-fuchsia-500 to-amber-400" />
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45">Model {number}</span>
      </footer>
    </blockquote>
  )
}
