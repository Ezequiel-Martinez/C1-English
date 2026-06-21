import type { Lesson } from '../types'

export function buildEntireSessionPrompt(lesson: Lesson, answers: Record<string, string>) {
  const taskBlocks = [...lesson.tasks, ...(lesson.extraTasks ?? [])]
    .filter((task) => answers[task.id]?.trim())
    .map((task, index) => `Task ${index + 1} — ${task.type}
Instruction: ${task.instruction}
Prompt: ${task.prompt}
My answer: ${answers[task.id].trim()}`)

  if (lesson.speakingPrompt && answers.speaking?.trim()) {
    taskBlocks.push(`Speaking long turn
Instruction: ${lesson.speakingPrompt.instruction}
Prompt: ${lesson.speakingPrompt.prompt}
My answer / notes: ${answers.speaking.trim()}`)
  }

  if (lesson.recyclingChallenge && answers.recycling?.trim()) {
    taskBlocks.push(`Recycling challenge — ${lesson.recyclingChallenge.target}
Instruction: ${lesson.recyclingChallenge.instruction}
Prompt: ${lesson.recyclingChallenge.prompt}
My answer: ${answers.recycling.trim()}`)
  }

  return `Act as my strict C1 English Grammar Activation Coach.

Review my entire Day ${lesson.day} practice session.

Day type: ${lesson.dayType}
Target structure: ${lesson.targetStructure}
Target lexical item: ${lesson.targetLexicalItem}
Communicative function: ${lesson.communicativeFunction}

${taskBlocks.length ? taskBlocks.join('\n\n---\n\n') : '[I have not written any answers yet.]'}

For each completed task:
1. give separate scores from 1 to 5 for grammar, style, and argument quality
2. provide a corrected version
3. identify what was wrong or weak
4. give one stronger alternative
5. state whether I used the target structure and lexical item effectively

Then finish with:
1. my three recurring weaknesses across the session
2. the strongest sentence I produced and why it works
3. one concise rewrite drill for my weakest area

Be direct, practical, and correction-focused. Do not flatter me. If an answer is correct but below C1, say: “Correct, but below C1. Upgrade it.”`
}
