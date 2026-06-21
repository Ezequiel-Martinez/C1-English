import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  const element = document.createElement('textarea')
  element.value = text
  element.style.position = 'fixed'
  element.style.opacity = '0'
  document.body.appendChild(element)
  element.select()
  document.execCommand('copy')
  element.remove()
}

type ButtonVariant = 'default' | 'grammar' | 'style' | 'argument' | 'session'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-violet-950 text-white hover:bg-violet-800',
  grammar: 'border border-violet-200 bg-violet-50/80 text-violet-800 hover:bg-violet-100',
  style: 'border border-fuchsia-200 bg-fuchsia-50/80 text-fuchsia-800 hover:bg-fuchsia-100',
  argument: 'border border-amber-200 bg-amber-50/80 text-amber-800 hover:bg-amber-100',
  session: 'bg-gradient-to-r from-fuchsia-600 via-violet-600 to-purple-700 text-white shadow-lg shadow-violet-500/20 hover:brightness-110',
}

export function CopyPromptButton({ getPrompt, label = 'Copy correction prompt', variant = 'default', disabled = false }: { getPrompt: () => string; label?: string; variant?: ButtonVariant; disabled?: boolean }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(timeout)
  }, [copied])

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={async () => {
        if (disabled) return
        await copyText(getPrompt())
        setCopied(true)
      }}
      className={`focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${copied ? 'bg-emerald-100 text-emerald-700' : variantClasses[variant]}`}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? 'Prompt copied' : label}
    </button>
  )
}
