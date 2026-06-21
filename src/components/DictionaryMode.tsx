import { BookOpen, LoaderCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Definition {
  word: string
  phonetic?: string
  partOfSpeech?: string
  definition?: string
  missing?: boolean
}

interface TooltipState extends Definition {
  x: number
  y: number
  loading?: boolean
}

const definitionCache = new Map<string, Definition>()

function wordAtPoint(x: number, y: number): string | null {
  const caretDocument = document as Document & {
    caretRangeFromPoint?: (x: number, y: number) => Range | null
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null
  }

  const range = caretDocument.caretRangeFromPoint?.(x, y)
  const position = range
    ? { node: range.startContainer, offset: range.startOffset }
    : (() => {
        const caret = caretDocument.caretPositionFromPoint?.(x, y)
        return caret ? { node: caret.offsetNode, offset: caret.offset } : null
      })()

  if (!position || position.node.nodeType !== Node.TEXT_NODE) return null
  const text = position.node.textContent ?? ''
  let start = Math.min(position.offset, text.length)
  let end = start
  const isWordCharacter = (character: string) => /[A-Za-zÀ-ÖØ-öø-ÿ'’-]/.test(character)

  while (start > 0 && isWordCharacter(text[start - 1])) start -= 1
  while (end < text.length && isWordCharacter(text[end])) end += 1

  const word = text.slice(start, end).replace(/^[’'-]+|[’'-]+$/g, '')
  return word.length > 1 ? word : null
}

async function lookupWord(word: string): Promise<Definition> {
  const key = word.toLocaleLowerCase('en')
  const cached = definitionCache.get(key)
  if (cached) return cached

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(key)}`)
    if (!response.ok) throw new Error('No entry')
    const data = await response.json() as Array<{
      word?: string
      phonetic?: string
      phonetics?: Array<{ text?: string }>
      meanings?: Array<{ partOfSpeech?: string; definitions?: Array<{ definition?: string }> }>
    }>
    const entry = data[0]
    const meaning = entry?.meanings?.find((item) => item.definitions?.[0]?.definition)
    const result: Definition = {
      word: entry?.word ?? word,
      phonetic: entry?.phonetic ?? entry?.phonetics?.find((item) => item.text)?.text,
      partOfSpeech: meaning?.partOfSpeech,
      definition: meaning?.definitions?.[0]?.definition,
    }
    definitionCache.set(key, result)
    return result
  } catch {
    const result = { word, missing: true }
    definitionCache.set(key, result)
    return result
  }
}

export function DictionaryMode() {
  const [enabled, setEnabled] = useState(true)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const timerRef = useRef<number | null>(null)
  const candidateRef = useRef('')
  const pointRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const clearCandidate = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = null
      candidateRef.current = ''
      setTooltip(null)
    }

    if (!enabled) {
      clearCandidate()
      return
    }

    const handleMove = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null
      if (element?.closest('button, input, textarea, select, [data-dictionary-ignore]')) {
        clearCandidate()
        return
      }

      const word = wordAtPoint(event.clientX, event.clientY)
      const key = word?.toLocaleLowerCase('en') ?? ''
      pointRef.current = { x: event.clientX, y: event.clientY }
      if (!key) {
        clearCandidate()
        return
      }
      if (candidateRef.current === key) return

      if (timerRef.current) window.clearTimeout(timerRef.current)
      candidateRef.current = key
      setTooltip(null)
      timerRef.current = window.setTimeout(async () => {
        const point = pointRef.current
        setTooltip({ word: word!, x: point.x, y: point.y, loading: true })
        const definition = await lookupWord(word!)
        if (candidateRef.current === key) {
          setTooltip({ ...definition, x: point.x, y: point.y })
        }
      }, 3000)
    }

    document.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('scroll', clearCandidate, { passive: true })
    return () => {
      document.removeEventListener('mousemove', handleMove)
      window.removeEventListener('scroll', clearCandidate)
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [enabled])

  const left = tooltip ? Math.min(window.innerWidth - 330, Math.max(16, tooltip.x + 16)) : 0
  const top = tooltip ? Math.min(window.innerHeight - 190, Math.max(16, tooltip.y + 20)) : 0

  return (
    <div data-dictionary-ignore>
      {tooltip && (
        <aside
          className="fixed z-[70] w-[310px] rounded-2xl border border-white/70 bg-white/80 p-4 text-ink shadow-2xl shadow-violet-950/20 backdrop-blur-2xl"
          style={{ left, top }}
          aria-live="polite"
        >
          {tooltip.loading ? (
            <div className="flex items-center gap-3 text-sm text-violet-700">
              <LoaderCircle className="animate-spin" size={17} /> Looking up <strong>{tooltip.word}</strong>…
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-semibold capitalize">{tooltip.word}</p>
                  <p className="mt-0.5 text-xs text-violet-600">
                    {[tooltip.partOfSpeech, tooltip.phonetic].filter(Boolean).join(' · ') || 'English word'}
                  </p>
                </div>
                <button type="button" onClick={() => setTooltip(null)} className="text-ink/30 hover:text-ink" aria-label="Close definition"><X size={16} /></button>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink/70">
                {tooltip.missing ? 'No short dictionary definition was found for this form.' : tooltip.definition}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-widest text-ink/30">Dictionary mode</p>
            </>
          )}
        </aside>
      )}

      <button
        type="button"
        onClick={() => setEnabled((value) => !value)}
        className={`fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full border px-4 py-3 text-xs font-bold shadow-xl backdrop-blur-2xl transition sm:bottom-7 sm:right-7 ${enabled ? 'border-fuchsia-200/70 bg-white/75 text-violet-800 shadow-fuchsia-900/10' : 'border-white/50 bg-violet-950/75 text-white shadow-violet-950/20'}`}
        aria-pressed={enabled}
      >
        <BookOpen size={15} />
        {enabled ? 'Dictionary on · hover 3s' : 'Dictionary off'}
      </button>
    </div>
  )
}
