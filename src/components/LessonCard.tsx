import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface LessonCardProps {
  label: string
  icon: LucideIcon
  children: ReactNode
  className?: string
  tone?: 'paper' | 'tint'
}

export function LessonCard({ label, icon: Icon, children, className = '', tone = 'paper' }: LessonCardProps) {
  return (
    <article className={`liquid-glass rounded-2xl p-6 sm:p-7 ${tone === 'tint' ? 'bg-fuchsia-50/30' : ''} ${className}`}>
      <div className="mb-5 flex items-center gap-2 text-sage-600">
        <Icon size={16} strokeWidth={1.9} />
        <p className="eyebrow">{label}</p>
      </div>
      {children}
    </article>
  )
}
