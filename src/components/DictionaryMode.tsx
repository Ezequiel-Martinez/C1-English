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

interface TextToken {
  value: string
  normalized: string
  start: number
  end: number
}

interface LookupTerm {
  word: string
  original: string
  sentence: string
  tokens: TextToken[]
  selectedIndex: number
}

interface DefinitionCandidate {
  partOfSpeech?: string
  definition: string
}

const definitionCache = new Map<string, Definition>()

const polishedDefinitions: Record<string, Pick<Definition, 'partOfSpeech' | 'definition' | 'translation'>> = {
  today: {
    partOfSpeech: 'adverb',
    definition: 'On or during the present day.',
    translation: 'hoy',
  },
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
  'time frame': {
    partOfSpeech: 'noun',
    definition: 'A period of time considered as a unit for planning, explaining, or completing something.',
    translation: 'marco temporal · plazo',
  },
  'time frames': {
    partOfSpeech: 'plural noun',
    definition: 'Periods of time considered as units for planning, explaining, or completing something.',
    translation: 'marcos temporales · plazos',
  },
}

const phrasalParticles = new Set([
  'about', 'across', 'after', 'along', 'around', 'away', 'back', 'by', 'down', 'for',
  'forward', 'in', 'into', 'off', 'on', 'out', 'over', 'through', 'to', 'up', 'with',
])

const determiners = new Set([
  'a', 'an', 'the', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her',
  'its', 'our', 'their', 'some', 'any', 'each', 'every', 'another',
])

const objectStarters = new Set([
  ...determiners,
  'me', 'you', 'him', 'her', 'it', 'us', 'them', 'myself', 'yourself', 'itself',
])

const verbLeadIns = new Set([
  'to', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must', 'shall',
  'do', 'does', 'did', 'be', 'am', 'is', 'are', 'was', 'were', 'been', 'being',
  'have', 'has', 'had',
])

const abstractFrameContext = new Set([
  'alternative', 'argument', 'claim', 'concept', 'conditional', 'conditionals',
  'context', 'criticism', 'idea', 'issue', 'language', 'meaning', 'position',
  'problem', 'proposal', 'question', 'statement', 'structure',
])

function cleanDefinition(definition: string) {
  return definition
    .replace(/\s*\([^)]*etymolog[^)]*\)/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function baseDefinitionScore(definition: string) {
  const cleaned = cleanDefinition(definition)
  let score = Math.min(cleaned.length, 180)
  if (cleaned.length < 30) score -= 70
  if (/^(one|someone) who\b/i.test(cleaned)) score -= 120
  if (/^a person who\b/i.test(cleaned)) score -= 55
  if (/used other than (figuratively|idiomatically)/i.test(cleaned)) score -= 140
  if (/etymolog/i.test(definition)) score -= 100
  return score
}

function contextWords(term: LookupTerm) {
  const start = Math.max(0, term.selectedIndex - 4)
  const end = Math.min(term.tokens.length, term.selectedIndex + 5)
  return term.tokens.slice(start, end).map((token) => token.normalized.toLocaleLowerCase('en'))
}

function inferredPartOfSpeech(term: LookupTerm): 'noun' | 'verb' | undefined {
  if (term.word.includes(' ')) return undefined

  const current = term.tokens[term.selectedIndex]?.normalized.toLocaleLowerCase('en') ?? term.word.toLocaleLowerCase('en')
  const previous = term.tokens[term.selectedIndex - 1]?.normalized.toLocaleLowerCase('en')
  const next = term.tokens[term.selectedIndex + 1]?.normalized.toLocaleLowerCase('en')

  if (previous && determiners.has(previous)) return 'noun'
  if (previous && verbLeadIns.has(previous)) return 'verb'
  if (current.endsWith('ing') && previous && verbLeadIns.has(previous)) return 'verb'
  if (current.endsWith('s') && previous === 'time') return 'noun'
  if (next && objectStarters.has(next) && (!previous || !determiners.has(previous))) return 'verb'
  if (current.endsWith('s') && next && objectStarters.has(next)) return 'verb'

  return undefined
}

function hasAbstractFrameContext(term: LookupTerm) {
  if (!/^\s*frames?\s*$/i.test(term.word)) return false
  const words = new Set(contextWords(term))
  return [...abstractFrameContext].some((word) => words.has(word))
}

function contextualPolishedDefinition(key: string, term: LookupTerm) {
  if ((key === 'frame' || key === 'frames') && hasAbstractFrameContext(term)) {
    return {
      partOfSpeech: 'verb',
      definition: 'To present or express an idea in a particular way, shaping how it is understood.',
      translation: 'enmarcar · plantear',
    }
  }

  return polishedDefinitions[key]
}

function definitionScore(candidate: DefinitionCandidate, term: LookupTerm) {
  let score = baseDefinitionScore(candidate.definition)
  const partOfSpeech = candidate.partOfSpeech?.toLocaleLowerCase('en') ?? ''
  const contextPartOfSpeech = inferredPartOfSpeech(term)

  if (contextPartOfSpeech === 'verb') {
    if (partOfSpeech.includes('verb')) score += 220
    if (partOfSpeech.includes('noun')) score -= 80
  }

  if (contextPartOfSpeech === 'noun') {
    if (partOfSpeech.includes('noun')) score += 160
    if (partOfSpeech.includes('verb')) score -= 70
  }

  if (hasAbstractFrameContext(term)) {
    if (partOfSpeech.includes('verb')) score += 180
    if (/\b(express|formulat|present|represent|word|understand|describe|interpret|idea|concept|context)\b/i.test(candidate.definition)) score += 120
    if (/\b(border|picture|photo|spectacle|body|building|machine|structure)\b/i.test(candidate.definition)) score -= 160
  }

  return score
}

function cleanTranslation(translation: string) {
  return translation.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

async function translateWord(word: string): Promise<string | undefined> {
  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|es`)
    if (!response.ok) return undefined
    const data = await response.json() as { responseData?: { translatedText?: string } }
    const rawTranslation = data.responseData?.translatedText?.trim()
    if (!rawTranslation || /<[^>]*>/i.test(rawTranslation)) return undefined
    const translation = cleanTranslation(rawTranslation)
    if (!translation || /MYMEMORY WARNING/i.test(translation) || translation.toLocaleLowerCase('en') === word.toLocaleLowerCase('en')) return undefined
    return translation.toLocaleLowerCase('es')
  } catch {
    return undefined
  }
}

function normalizeToken(value: string) {
  const normalized = value.replace(/’/g, "'")
  const possessive = normalized.match(/^(.+)'s$/i)
  if (possessive?.[1] && possessive[1].length > 1) return possessive[1]
  return normalized.replace(/'$/, '')
}

function sentenceAround(text: string, start: number, end: number) {
  const before = Math.max(
    text.lastIndexOf('.', start - 1),
    text.lastIndexOf('!', start - 1),
    text.lastIndexOf('?', start - 1),
    text.lastIndexOf('\n', start - 1),
  )
  const afterCandidates = ['.', '!', '?', '\n']
    .map((mark) => text.indexOf(mark, end))
    .filter((index) => index >= 0)
  const after = afterCandidates.length ? Math.min(...afterCandidates) : text.length
  return text.slice(before + 1, after === text.length ? after : after + 1).trim()
}

function makeLookupTerm(text: string, tokens: TextToken[], selectedIndex: number, startIndex: number, length: number): LookupTerm {
  const selectedTokens = tokens.slice(startIndex, startIndex + length)
  const start = selectedTokens[0]?.start ?? tokens[selectedIndex].start
  const end = selectedTokens[selectedTokens.length - 1]?.end ?? tokens[selectedIndex].end
  return {
    word: selectedTokens.map((token) => token.normalized).join(' '),
    original: selectedTokens.map((token) => token.value).join(' '),
    sentence: sentenceAround(text, start, end),
    tokens,
    selectedIndex,
  }
}

function pointInsideToken(node: Node, token: TextToken, x: number, y: number) {
  const range = document.createRange()
  range.setStart(node, token.start)
  range.setEnd(node, token.end)
  const rects = Array.from(range.getClientRects())
  range.detach()

  return rects.some((rect) =>
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom,
  )
}

function canJoinTokens(text: string, first: TextToken, second: TextToken) {
  const gap = text.slice(first.end, second.start)
  return /^[ \t\u00a0]+$/.test(gap)
}

function termAtPoint(x: number, y: number): LookupTerm | null {
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
    normalized: normalizeToken(match[0]),
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }))
  const selectedIndex = tokens.findIndex((token) => pointInsideToken(position.node, token, x, y))
  if (selectedIndex < 0) return null

  const phraseAt = (start: number, length: number) => {
    if (start < 0 || start + length > tokens.length) return null
    const phraseTokens = tokens.slice(start, start + length)
    const canJoin = phraseTokens.every((token, index) => {
      const nextToken = phraseTokens[index + 1]
      return !nextToken || canJoinTokens(text, token, nextToken)
    })
    if (!canJoin) return null
    return phraseTokens.map((token) => token.normalized).join(' ')
  }

  // Prefer recognised three-word units, such as “put up with”.
  for (const start of [selectedIndex - 2, selectedIndex - 1, selectedIndex]) {
    const phrase = phraseAt(start, 3)
    if (phrase && polishedDefinitions[phrase.toLocaleLowerCase('en')]) return makeLookupTerm(text, tokens, selectedIndex, start, 3)
  }

  // A verb followed by a common particle is treated as one hoverable unit.
  for (const start of [selectedIndex - 1, selectedIndex]) {
    const phrase = phraseAt(start, 2)
    if (!phrase) continue
    const [first, second] = phrase.toLocaleLowerCase('en').split(' ')
    if (polishedDefinitions[`${first} ${second}`] || phrasalParticles.has(second)) return makeLookupTerm(text, tokens, selectedIndex, start, 2)
  }

  return tokens[selectedIndex].normalized.length > 1 ? makeLookupTerm(text, tokens, selectedIndex, selectedIndex, 1) : null
}

function definitionCacheKey(key: string, term: LookupTerm) {
  return [key, inferredPartOfSpeech(term) ?? 'generic', contextWords(term).join(' ')].join('|')
}

async function lookupWord(term: LookupTerm): Promise<Definition> {
  const key = term.word.toLocaleLowerCase('en')
  const cached = definitionCache.get(definitionCacheKey(key, term))
  if (cached) return cached

  const polished = contextualPolishedDefinition(key, term)
  const translationPromise = polished?.translation ? Promise.resolve(polished.translation) : translateWord(key)
  const cacheKey = definitionCacheKey(key, term)
  if (polished) {
    const result = { word: term.word, ...polished, translation: polished.translation ?? await translationPromise }
    definitionCache.set(cacheKey, result)
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
    const best = candidates.sort((a, b) => definitionScore(b, term) - definitionScore(a, term))[0]
    const result: Definition = {
      word: entry?.word ?? term.word,
      phonetic: entry?.phonetic ?? entry?.phonetics?.find((item) => item.text)?.text,
      partOfSpeech: best?.partOfSpeech,
      definition: best ? cleanDefinition(best.definition) : undefined,
      translation: await translationPromise,
    }
    definitionCache.set(cacheKey, result)
    return result
  } catch {
    const result = { word: term.word, translation: await translationPromise, missing: true }
    definitionCache.set(cacheKey, result)
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

      const term = termAtPoint(event.clientX, event.clientY)
      const key = term ? `${term.word.toLocaleLowerCase('en')}|${term.sentence}|${term.selectedIndex}` : ''
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
        setTooltip({ word: term!.word, x: point.x, y: point.y, loading: true })
        const definition = await lookupWord(term!)
        if (candidateRef.current === key) {
          setTooltip({ ...definition, x: point.x, y: point.y })
        }
      }, 2000)
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
        {enabled ? 'Dictionary on · hover 2s' : 'Dictionary off'}
      </button>
    </div>
  )
}
