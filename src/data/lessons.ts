import type { Lesson } from '../types'

export const dayTypes = {
  A: {
    name: 'Day type A: Grammar activation',
    skill: 'Grammar activation',
    description: 'Turn advanced grammatical knowledge into language you can access quickly and use deliberately.',
  },
  B: {
    name: 'Day type B: Argument fluency',
    skill: 'Argument fluency',
    description: 'Build nuanced positions, concede intelligently, challenge weak reasoning, and trace consequences.',
  },
  C: {
    name: 'Day type C: Storytelling and narrative control',
    skill: 'Narrative control',
    description: 'Manage time, emphasis, causality, and evaluation so that a story feels purposeful rather than merely chronological.',
  },
  D: {
    name: 'Day type D: Register upgrade',
    skill: 'Register upgrade',
    description: 'Replace vague or over-casual language with precise, natural English suited to serious conversation and writing.',
  },
  E: {
    name: 'Day type E: Correction, recycling, and consolidation',
    skill: 'Consolidation',
    description: 'Retrieve earlier language, notice persistent weaknesses, and strengthen control through deliberate reuse.',
  },
} as const

function typeForDay(day: number): keyof typeof dayTypes {
  const remainder = day % 5
  return remainder === 1 ? 'A' : remainder === 2 ? 'B' : remainder === 3 ? 'C' : remainder === 4 ? 'D' : 'E'
}

const authoredLessons: Record<number, Lesson> = {
  6: {
    day: 6,
    dayType: dayTypes.A.name,
    typeCode: 'A',
    skillLabel: dayTypes.A.skill,
    skillDescription: dayTypes.A.description,
    targetStructure: 'Advanced contrast with whereas / while / nonetheless',
    structureFunction: 'Contrast ideas, qualify claims, and avoid simplistic either-or arguments.',
    explanation: 'Whereas and while connect contrasting clauses within one sentence. Nonetheless links a concession to a result that remains true, usually across two carefully punctuated clauses or sentences.',
    targetLexicalItem: 'rule out',
    lexicalMeaning: 'To reject or exclude something as a possibility.',
    lexicalPattern: 'rule out + noun · rule out the possibility that…',
    lexicalExample: 'We cannot rule out the possibility that the policy will have unintended effects.',
    communicativeFunction: 'Today’s language helps you compare positions precisely, resist black-and-white reasoning, and challenge an idea without sounding crude or dismissive.',
    dangerZone: 'Spanish speakers often overuse “but” or translate contrast structures too directly. Whereas and contrastive while normally connect two clauses; nonetheless is an adverb and requires deliberate punctuation.',
    modelAnswers: [
      'Remote work gives employees greater autonomy, whereas office-based work makes spontaneous collaboration considerably easier. We should not rule out a hybrid model merely because it is harder to coordinate.',
      'While the proposal is unlikely to solve the underlying problem, it may reduce the immediate pressure on public services. Its limitations are clear; nonetheless, ruling it out before a trial would be premature.',
    ],
    tasks: [
      {
        id: 'task-1',
        type: 'Sentence combining',
        instruction: 'Combine the ideas into one precise sentence using whereas or while. Preserve the contrast without adding new information.',
        prompt: 'Online courses offer flexibility. Face-to-face courses provide more immediate social interaction.',
        requiredWord: 'whereas / while',
      },
      {
        id: 'task-2',
        type: 'Mini argument',
        instruction: 'Write 2–3 sentences evaluating the claim. Use nonetheless and rule out naturally.',
        prompt: '“If a public policy is expensive, it should not be introduced.”',
      },
      {
        id: 'task-3',
        type: 'Error diagnosis',
        instruction: 'Rewrite the sentence correctly, improving punctuation and placement. Briefly name the problem if useful.',
        prompt: 'Whereas the plan is risky. We cannot rule out it, nonetheless.',
      },
    ],
    extraTasks: [
      {
        id: 'extra-1',
        type: 'Forced contrast',
        instruction: 'Rewrite the claim as a two-sentence response that concedes one point but maintains a contrasting conclusion.',
        prompt: 'Social media gives marginalised voices greater visibility, so its effect on public debate is broadly positive.',
        requiredWord: 'while · nonetheless',
      },
      {
        id: 'extra-2',
        type: 'Precision rewrite',
        instruction: 'Rewrite this simplistic sentence in a more nuanced C1 style. Preserve its central meaning and use rule out.',
        prompt: 'The evidence is weak, but the explanation may still be true.',
        requiredWord: 'rule out',
      },
      {
        id: 'extra-3',
        type: 'Register upgrade',
        instruction: 'Rewrite the comment for a serious policy discussion, using a contrast structure instead of but.',
        prompt: 'The idea sounds good, but it probably won’t work for small towns.',
      },
    ],
    speakingPrompt: {
      instruction: 'Speak for 60–90 seconds. Compare two credible positions, then state your own measured conclusion.',
      prompt: 'Should employers be allowed to require all staff to return to the office full-time?',
      notes: ['Include one concession', 'Use whereas or while', 'Use nonetheless', 'Use rule out'],
    },
    recyclingChallenge: {
      source: 'Recycle Day 5',
      target: 'Hedging with appears to / tends to',
      instruction: 'Soften this absolute claim without making it vague.',
      prompt: 'Working from home makes people less productive.',
    },
    complete: true,
  },
  7: {
    day: 7,
    dayType: dayTypes.B.name,
    typeCode: 'B',
    skillLabel: dayTypes.B.skill,
    skillDescription: dayTypes.B.description,
    targetStructure: 'Mixed conditionals',
    structureFunction: 'Connect an unreal past cause to a present result, or a present condition to a past outcome.',
    explanation: 'Mixed conditionals cross time frames. A common pattern is if + past perfect, would + base verb to show how a past decision still shapes the present.',
    targetLexicalItem: 'end up',
    lexicalMeaning: 'To eventually reach a situation or result, often unexpectedly.',
    lexicalPattern: 'end up + -ing · end up + adjective / prepositional phrase',
    lexicalExample: 'Without clearer priorities, the team may end up solving the wrong problem.',
    communicativeFunction: 'Today’s language helps you explain how past choices create present consequences and trace the unintended outcomes of a decision.',
    dangerZone: 'Do not put would in the if-clause. Spanish speakers may also use a present form where English needs the past perfect: “If I would have known…” should be “If I had known…”.',
    modelAnswers: [
      'If the council had consulted local residents earlier, it would not be facing such determined opposition now. By treating criticism as an obstacle, it ended up weakening an otherwise defensible proposal.',
      'If the company were genuinely committed to staff development, it would have invested in training before the restructure. Instead, several capable employees ended up leaving at precisely the wrong moment.',
    ],
    tasks: [
      {
        id: 'task-1',
        type: 'Key word transformation',
        instruction: 'Rewrite the complete sentence as a mixed conditional. Preserve the meaning and include had; do not use a gap or fragment.',
        prompt: 'I ignored the early warnings, so I am dealing with a much larger problem now.',
        requiredWord: 'HAD',
      },
      {
        id: 'task-2',
        type: 'Mini argument',
        instruction: 'Write 2–3 sentences about a present consequence of a past public decision. Use a mixed conditional and end up.',
        prompt: 'Choose a decision in education, transport, technology, or work. Explain an unintended consequence it has today.',
      },
      {
        id: 'task-3',
        type: 'Precision paraphrase',
        instruction: 'Express the causal relationship as one sophisticated mixed conditional sentence.',
        prompt: 'The organisation does not value dissent. That is why it dismissed the warnings last year and now faces a preventable crisis.',
      },
    ],
    extraTasks: [
      {
        id: 'extra-1',
        type: 'Causal rewrite',
        instruction: 'Rewrite these ideas as one mixed conditional sentence, then add a natural consequence using end up.',
        prompt: 'The city neglected its rail network for decades. Commuters now depend heavily on cars.',
      },
      {
        id: 'extra-2',
        type: 'Argument upgrade',
        instruction: 'Rewrite the claim so that the causal reasoning is more precise and less absolute. Use a mixed conditional.',
        prompt: 'If schools were better, the government would not have had to introduce the employment programme.',
      },
      {
        id: 'extra-3',
        type: 'Counterfactual rewrite',
        instruction: 'Rewrite the passage in two sentences. Connect the past choice to the present situation and use end up naturally.',
        prompt: 'She chose a secure career instead of studying music. She is successful now, but she still wonders whether she chose well.',
      },
    ],
    speakingPrompt: {
      instruction: 'Speak for 60–90 seconds about a decision whose effects became clear only later.',
      prompt: 'Describe a past decision—personal or public—that created an important present-day consequence. Was that consequence foreseeable?',
      notes: ['Include one concession', 'Use a mixed conditional', 'Use end up', 'Give one concrete example'],
    },
    recyclingChallenge: {
      source: 'Recycle Day 6',
      target: 'whereas / nonetheless · rule out',
      instruction: 'Contrast the two approaches and reach a qualified conclusion in two sentences.',
      prompt: 'Preventing every risk versus accepting manageable uncertainty.',
    },
    complete: true,
  },
  8: {
    day: 8,
    dayType: dayTypes.C.name,
    typeCode: 'C',
    skillLabel: dayTypes.C.skill,
    skillDescription: dayTypes.C.description,
    targetStructure: 'Third conditional with implied criticism',
    structureFunction: 'Evaluate a past mistake and imply that a better course of action was available.',
    explanation: 'The third conditional frames an unreal alternative in the past: if + past perfect, would have + past participle. In context, it can convey restrained criticism without an overt accusation.',
    targetLexicalItem: 'mess up',
    lexicalMeaning: 'To handle something badly or cause it to fail; informal but natural.',
    lexicalPattern: 'mess up + noun · mess something up',
    lexicalExample: 'A rushed handover messed up what should have been a straightforward transition.',
    communicativeFunction: 'Today’s language helps you narrate a preventable failure, assign responsibility with restraint, and show exactly where events could have unfolded differently.',
    dangerZone: 'Avoid doubling have forms or using would in the if-clause. Also control register: mess up is natural in speech, but a formal report would need mishandle, undermine, or jeopardise.',
    modelAnswers: [
      'If the organisers had tested the booking system under realistic conditions, they would have spotted the fault before tickets went on sale. The technical team did not cause the demand, but they clearly messed up the launch.',
      'The negotiations might not have collapsed if both sides had clarified their non-negotiable demands at the outset. By leaving key terms deliberately vague, they messed up their best chance of reaching a durable agreement.',
    ],
    tasks: [
      {
        id: 'task-1',
        type: 'Constrained transformation',
        instruction: 'Turn the statement into restrained criticism using a third conditional. Do not use the word should.',
        prompt: 'You did not back up the files, and the team lost a week of work.',
      },
      {
        id: 'task-2',
        type: 'Narrative control',
        instruction: 'Write 3–4 sentences describing the failure. Use a third conditional to identify the turning point and mess up once.',
        prompt: 'A promising project failed because nobody confirmed who was responsible for the final decision.',
      },
      {
        id: 'task-3',
        type: 'Register upgrade',
        instruction: 'Rewrite this criticism for a formal internal review. Keep the third conditional but replace the informal phrasal verb.',
        prompt: 'If they had actually checked the numbers, they wouldn’t have messed up the whole budget.',
      },
    ],
    extraTasks: [
      {
        id: 'extra-1',
        type: 'Restrained criticism',
        instruction: 'Rewrite the criticism so that it sounds firm but professionally controlled. Use a third conditional.',
        prompt: 'They were careless and ruined the negotiation by sending the figures too late.',
      },
      {
        id: 'extra-2',
        type: 'Narrative rewrite',
        instruction: 'Rewrite the account in two or three sentences, identifying the decisive mistake and its unreal alternative.',
        prompt: 'Nobody checked the venue capacity. Hundreds of guests arrived, and the event became chaotic.',
        requiredWord: 'mess up',
      },
      {
        id: 'extra-3',
        type: 'Register shift',
        instruction: 'Rewrite the idea twice: first for an informal conversation, then for a formal review.',
        prompt: 'The communications team handled the announcement badly and damaged public trust.',
      },
    ],
    speakingPrompt: {
      instruction: 'Speak for 60–90 seconds. Tell the story clearly, then evaluate the critical decision without becoming dramatic.',
      prompt: 'Describe a plan, event, or collaboration that went wrong because of one avoidable mistake.',
      notes: ['Set the context briefly', 'Use a third conditional', 'Use mess up naturally', 'End with a lesson or consequence'],
    },
    recyclingChallenge: {
      source: 'Recycle Day 7',
      target: 'Mixed conditionals · end up',
      instruction: 'Connect a past communication failure to a present problem.',
      prompt: 'Write one mixed conditional sentence and a second sentence using end up.',
    },
    complete: true,
  },
}

function placeholderLesson(day: number): Lesson {
  const typeCode = typeForDay(day)
  const type = dayTypes[typeCode]
  return {
    day,
    dayType: type.name,
    typeCode,
    skillLabel: type.skill,
    skillDescription: type.description,
    targetStructure: 'Lesson outline pending',
    structureFunction: 'This target structure will be added to the practice cycle.',
    explanation: '',
    targetLexicalItem: 'Lexical item pending',
    lexicalMeaning: '',
    lexicalPattern: '',
    lexicalExample: '',
    communicativeFunction: '',
    dangerZone: '',
    modelAnswers: [],
    tasks: [],
    complete: false,
  }
}

export const lessons: Lesson[] = Array.from(
  { length: 90 },
  (_, index) => authoredLessons[index + 1] ?? placeholderLesson(index + 1),
)

export function getLesson(day: number): Lesson {
  return lessons[Math.min(90, Math.max(1, day)) - 1]
}
