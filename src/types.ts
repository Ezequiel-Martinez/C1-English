export interface Task {
  id: string
  type: string
  instruction: string
  prompt: string
  requiredWord?: string
}

export interface SpeakingPrompt {
  instruction: string
  prompt: string
  notes: string[]
  durationLabel?: string
}

export interface RecyclingChallenge {
  source: string
  target: string
  instruction: string
  prompt: string
}

export interface Lesson {
  day: number
  dayType: string
  typeCode: 'A' | 'B' | 'C' | 'D' | 'E'
  skillLabel: string
  skillDescription: string
  targetStructure: string
  structureFunction: string
  explanation: string
  targetLexicalItem: string
  lexicalMeaning: string
  lexicalPattern: string
  lexicalExample: string
  communicativeFunction: string
  dangerZone: string
  modelAnswers: string[]
  tasks: Task[]
  extraTasks?: Task[]
  speakingPrompt?: SpeakingPrompt
  recyclingChallenge?: RecyclingChallenge
  complete: boolean
}
