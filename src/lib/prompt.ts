import type { Lesson } from '../types'

function buildSessionTaskBlocks(lesson: Lesson, answers: Record<string, string>) {
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

  return taskBlocks
}

export function buildShortSessionPrompt(lesson: Lesson, answers: Record<string, string>) {
  const taskBlocks = buildSessionTaskBlocks(lesson, answers)

  return `Act as my professional C1 English teacher.

Review my entire Day ${lesson.day} practice session. Keep the feedback brief, task-oriented, and useful for learning.

Day type: ${lesson.dayType}
Target structure: ${lesson.targetStructure}
Target lexical item: ${lesson.targetLexicalItem}
Communicative function: ${lesson.communicativeFunction}

${taskBlocks.length ? taskBlocks.join('\n\n---\n\n') : '[I have not written any answers yet.]'}

For each completed task, give exactly four short lines:
1. Task aim: one phrase explaining what this task was testing.
2. What worked: one sentence tied to my answer and the task aim.
3. Main issue: one sentence. If there is no meaningful issue, write "No meaningful issue."
4. Best version: corrected or improved version. If no correction is needed, write "No correction needed; keep your answer."

Before judging, think about the instruction, prompt, target structure, target lexical item, and communicative function. Do not invent a weakness just to correct something. If the answer is accurate, natural, and satisfies the task at C1 level, say "Correct and C1-ready." If it is correct but too simple for C1, say "Correct, but below C1. Upgrade it."

Focus only on the biggest useful teaching point for each task. Ignore tiny preferences unless they affect accuracy, naturalness, register, or the task purpose.

Do not give scores, long explanations, generic advice, or multiple alternatives. End with one final line: "Next focus: ..." based on the session pattern, or "Keep doing: ..." if the session is already strong.`
}

export function buildDetailedSessionPrompt(lesson: Lesson, answers: Record<string, string>) {
  const taskBlocks = buildSessionTaskBlocks(lesson, answers)

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

export const buildEntireSessionPrompt = buildDetailedSessionPrompt
