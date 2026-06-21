import { BookOpen, LoaderCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Definition {
  word: string
  phonetic?: string
  partOfSpeech?: string
  definition?: string
  translation?: string
  missing?: boolean
}

interface TooltipState extends Definition {
  x: number
  y: number
  loading?: boolean
}

const definitionCache = new Map<string, Definition>()

const polishedDefinitions: Record<string, Pick<Definition, 'partOfSpeech' | 'definition' | 'translation'>> = {
  commuter: {
    partOfSpeech: 'noun',
    definition: 'A person who travels regularly between home and a workplace or place of study.',
  },
  commuters: {
    partOfSpeech: 'plural noun',
    definition: 'People who travel regularly between home and a workplace or place of study.',
  },
  'rule out': {
    partOfSpeech: 'phrasal verb',
    definition: 'To reject, eliminate, or exclude something as a possibility.',
    translation: 'descartar',
  },
  'end up': {
    partOfSpeech: 'phrasal verb',
    definition: 'To eventually reach a particular situation or result, often unexpectedly.',
    translation: 'acabar · terminar',
  },
  'mess up': {
    partOfSpeech: 'phrasal verb',
    definition: 'To handle something badly, make a mistake, or cause something to fail.',
    translation: 'arruinar · estropear',
  },
  'back up': {
    partOfSpeech: 'phrasal verb',
    definition: 'To make a copy of digital information so it can be recovered later.',
    translation: 'hacer una copia de seguridad',
  },
}

const phrasalParticles = new Set([
  'about', 'across', 'after', 'along', 'around', 'away', 'back', 'by', 'down', 'for',
  'forward', 'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'up', 'with',
])

function cleanDefinition(definition: string) {
  return definition
    .replace(/\s*\([^)]*etymolog[^)]*\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function definitionScore(definition: string) {
  const cleaned = cleanDefinition(definition)
  let score = Math.min(cleaned.length, 180)
  if (cleaned.length < 30) score -= 70
  if (/^(one|someone) who\b/i.test(cleaned)) score -= 120
  if (/^a person who\b/i.test(cleaned)) score -= 55
  if (/used other than (figuratively|idiomatically)/i.test(cleaned)) score -= 140
  if (/etymolog/i.test(definition)) score -= 100
  return score
}

async function translateWord(word: string): Promise<string | undefined> {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|es`)
    if (!response.ok) return undefined
    const data = await response.json() as { responseData?: { translatedText?: string } }
    const translation = data.responseData?.translatedText?.trim()
    if (!translation || /MYMEMORY WARNING/i.test(translation) || translation.toLocaleLowerCase('en') === word.toLocaleLowerCase('en')) return undefined
    return translation.toLocaleLowerCase('es')
  } catch {
    return undefined
  }
}

function termAtPoint(x: number, y: number): string | null {
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
  const tokens = Array.from(text.matchAll(/[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['’-][A-Za-zÀ-ÖØ-öø-ÿ]+)*/g)).map((match) => ({
    value: match[0],
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }))
  const selectedIndex = tokens.findIndex((token) => position.offset >= token.start && position.offset <= token.end)
  if (selectedIndex < 0) return null

  const phraseAt = (start: number, length: number) => {
    if (start < 0 || start + length > tokens.length) return null
    return tokens.slice(start, start + length).map((token) => token.value).join(' ')
  }

  // Prefer recognised three-word units, such as “put up with”.
  for (const start of [selectedIndex - 2, selectedIndex - 1, selectedIndex]) {
    const phrase = phraseAt(start, 3)
    if (phrase && polishedDefinitions[phrase.toLocaleLowerCase('en')]) return phrase
  }

  // A verb followed by a common particle is treated as one hoverable unit.
  for (const start of [selectedIndex - 1, selectedIndex]) {
    const phrase = phraseAt(start, 2)
    if (!phrase) continue
    const [first, second] = phrase.toLocaleLowerCase('en').split(' ')
    if (polishedDefinitions[`${first} ${second}`] || phrasalParticles.has(second)) return phrase
  }

  return tokens[selectedIndex].value.length > 1 ? tokens[selectedIndex].value : null
}

async function lookupWord(word: string): Promise<Definition> {
  const key = word.toLocaleLowerCase('en')
  const cached = definitionCache.get(key)
  if (cached) return cached

  const translationPromise = translateWord(key)
  const polished = polishedDefinitions[key]
  if (polished) {
    const result = { word, ...polished, translation: polished.translation ?? await translationPromise }
    definitionCache.set(key, result)
    return result
  }

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
    const candidates = data.flatMap((item) =>
      (item.meanings ?? []).flatMap((meaning) =>
        (meaning.definitions ?? [])
          .filter((definition) => definition.definition)
          .map((definition) => ({ partOfSpeech: meaning.partOfSpeech, definition: definition.definition! })),
      ),
    )
    const best = candidates.sort((a, b) => definitionScore(b.definition) - definitionScore(a.definition))[0]
    const result: Definition = {
      word: entry?.word ?? word,
      phonetic: entry?.phonetic ?? entry?.phonetics?.find((item) => item.text)?.text,
      partOfSpeech: best?.partOfSpeech,
      definition: best ? cleanDefinition(best.definition) : undefined,
      translation: await translationPromise,
    }
    definitionCache.set(key, result)
    return result
  } catch {
    const result = { word, translation: await translationPromise, missing: true }
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

      const word = termAtPoint(event.clientX, event.clientY)
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
                  <p className="font-display text-2xl font-semibold capitalize">
                    {tooltip.word}{tooltip.translation && <span className="font-normal text-fuchsia-700"> ({tooltip.translation})</span>}
                  </p>
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
