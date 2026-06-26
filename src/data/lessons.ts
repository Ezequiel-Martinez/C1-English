import type { Lesson, SpeakingPrompt, Task } from '../types'

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
    skill: 'Storytelling and narrative control',
    description: 'Manage time, emphasis, causality, and evaluation so that a story feels purposeful rather than merely chronological.',
  },
  D: {
    name: 'Day type D: Register upgrade',
    skill: 'Register upgrade',
    description: 'Replace vague or over-casual language with precise, natural English suited to serious conversation and writing.',
  },
  E: {
    name: 'Day type E: Correction, recycling, and consolidation',
    skill: 'Correction, recycling, and consolidation',
    description: 'Retrieve earlier language, notice persistent weaknesses, and strengthen control through deliberate reuse.',
  },
} as const

type TypeCode = keyof typeof dayTypes

interface LessonSeed {
  day: number
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
  speakingPrompt: SpeakingPrompt
}

function typeForDay(day: number): TypeCode {
  const remainder = day % 5
  return remainder === 1 ? 'A' : remainder === 2 ? 'B' : remainder === 3 ? 'C' : remainder === 4 ? 'D' : 'E'
}

function lesson(
  day: number,
  targetStructure: string,
  targetLexicalItem: string,
  details: Omit<LessonSeed, 'day' | 'targetStructure' | 'targetLexicalItem'>,
): LessonSeed {
  return { day, targetStructure, targetLexicalItem, ...details }
}

function task(id: string, type: string, instruction: string, prompt: string, requiredWord?: string): Task {
  return { id, type, instruction, prompt, requiredWord }
}

function speak(prompt: string, notes: string[], instruction = 'Speak for 60-90 seconds. Build a coherent answer, not isolated sentences.'): SpeakingPrompt {
  return { instruction, prompt, notes }
}

const lessonSeeds: LessonSeed[] = [
  lesson(1, 'Inversion after negative adverbials', 'boil down to', {
    structureFunction: 'Emphasize a restriction, sequence, or surprising conclusion by moving a negative adverbial to the front.',
    explanation: 'After negative or limiting adverbials such as not until, rarely, under no circumstances, and only then, English uses auxiliary-subject inversion. Strong speakers use it to sharpen emphasis and control dramatic order.',
    lexicalMeaning: 'To reduce a complex issue to its essential cause, question, or choice.',
    lexicalPattern: 'boil down to + noun / -ing / whether-clause',
    lexicalExample: 'The disagreement ultimately boils down to whether the risks are acceptable.',
    communicativeFunction: 'You can identify the real issue behind a messy debate while sounding precise rather than simplistic.',
    dangerZone: 'Spanish speakers often front the adverbial but keep normal word order: "Not until later I realized." After the fronted phrase, use inversion: "Not until later did I realize."',
    modelAnswers: [
      'Only when the assumptions were tested did the debate boil down to a question of evidence rather than personality.',
      'Under no circumstances should the decision boil down to convenience if the long-term credibility of the team is at stake.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite the sentence using inversion. Preserve the meaning and use the key word without changing it.', 'We only understood that the conflict was about trust after the figures were made public.', 'UNTIL'),
      task('task-2', 'Constrained transformation', 'Rewrite the idea in 14-20 words using a negative adverbial and boil down to.', 'The real issue is not effort; it is whether the team is willing to be honest about failure.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and briefly identify the word-order problem.', 'Not only the proposal boils down to short-term savings, but it also ignores the reputational cost.'),
    ],
    speakingPrompt: speak('A team is arguing about whether to cancel a project that is already late. Explain what the decision really boils down to and use inversion to emphasize the turning point.', ['Use one negative adverbial', 'Use boil down to', 'Name the real trade-off', 'Avoid a simple yes/no answer']),
  }),
  lesson(2, 'Cleft sentences for emphasis', 'come down to', {
    structureFunction: 'Highlight the decisive factor in an argument by splitting the sentence into an emphasized frame.',
    explanation: 'Cleft sentences use frames such as what..., it is/was..., or the thing that... to focus attention. They are useful when you want to redirect a discussion toward the central issue.',
    lexicalMeaning: 'To depend on or be essentially about one decisive factor.',
    lexicalPattern: 'come down to + noun / -ing / whether-clause',
    lexicalExample: 'The choice comes down to whether we value speed more than accuracy.',
    communicativeFunction: 'You can make an argument sound clearer, more forceful, and less scattered by foregrounding the core criterion.',
    dangerZone: 'Avoid translating "depende de" into weak phrases like "it depends of." Use "it comes down to whether..." or "what it comes down to is..."',
    modelAnswers: [
      'What the debate comes down to is not whether remote work is comfortable, but whether it protects the quality of collaboration.',
      'It is the lack of accountability, not the lack of resources, that the whole problem seems to come down to.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 connected sentences defending or challenging the claim. Use a cleft sentence and come down to naturally.', 'Hiring decisions should be based mainly on cultural fit.'),
      task('task-2', 'Forced contrast', 'Compare speed and accuracy in high-pressure work. Use "what..." clefting to identify the decisive factor.', 'Speed may impress clients; accuracy may protect trust.', 'WHAT'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences. Include one concession, one counterargument, and come down to.', 'Some people argue that talent matters less than consistency.'),
    ],
    speakingPrompt: speak('Discuss whether success in language learning comes down more to discipline or intelligent feedback.', ['Use one what-cleft', 'Use come down to', 'Include a concession', 'Give one consequence']),
  }),
  lesson(3, 'Fronting for emphasis', 'bring up', {
    structureFunction: 'Move a key phrase to the beginning of the sentence to control focus, contrast, or narrative momentum.',
    explanation: 'Fronting places an object, complement, or adverbial phrase first: "That concern, nobody brought up." It creates emphasis and often sounds spoken, evaluative, or contrastive.',
    lexicalMeaning: 'To mention, raise, or introduce a topic for discussion.',
    lexicalPattern: 'bring up + noun / bring something up / bring up the fact that...',
    lexicalExample: 'No one brought up the long-term cost until the contract had already been signed.',
    communicativeFunction: 'You can make a story sound less flat by choosing which detail deserves attention first.',
    dangerZone: 'Do not overuse fronting in every sentence. It works best when the fronted information is contrastive, surprising, or emotionally important.',
    modelAnswers: [
      'The budget risk, nobody brought up until the final meeting, which made the whole approval process feel strangely staged.',
      'That objection, she had brought up months earlier; by the time the launch failed, everyone pretended it was new information.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the account with one fronted phrase and bring up. Keep the sequence clear.', 'The legal team mentioned the data issue late in the process. That issue later delayed the launch.'),
      task('task-2', 'Sentence combining', 'Combine the four short sentences into two C1 sentences. Use fronting for emphasis in one of them.', 'The warning was uncomfortable. Nobody mentioned it. The client noticed the weakness. The meeting changed direction.', 'bring up'),
      task('task-3', 'Precision paraphrase', 'Rewrite the sentence so the most important information appears first.', 'Nobody discussed the obvious ethical problem because the presentation focused only on growth.'),
    ],
    speakingPrompt: speak('Tell a short story about a meeting where the most important issue was mentioned too late.', ['Use one fronted phrase', 'Use bring up', 'Show the turning point', 'Keep past tenses controlled']),
  }),
  lesson(4, 'Hedging and cautious claims', 'point out', {
    structureFunction: 'Make claims sound precise, responsible, and intellectually honest when evidence is incomplete.',
    explanation: 'Hedging uses language such as appears to, tends to, may, is likely to, and to some extent. It lets you make a claim without overstating certainty.',
    lexicalMeaning: 'To draw attention to a fact, risk, mistake, or implication.',
    lexicalPattern: 'point out + noun / point out that / as X points out',
    lexicalExample: 'Several reviewers pointed out that the sample was too small to support such a confident conclusion.',
    communicativeFunction: 'You can disagree, correct, or qualify a claim without sounding blunt or careless.',
    dangerZone: 'Spanish speakers may sound too absolute in English. "This proves..." often needs "This suggests..." or "This appears to show..."',
    modelAnswers: [
      'The results appear to support the policy, although it is worth pointing out that the sample excludes the most vulnerable users.',
      'I would be cautious about calling the experiment a success; as the report points out, several outcomes may have been driven by external pressure.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the sentence in a cautious C1 register using one hedge and point out.', 'This study proves that online learning is worse than classroom learning.'),
      task('task-2', 'Precision paraphrase', 'Make the criticism diplomatic but clear. Do not weaken the actual concern.', 'Your plan ignores the cost and probably will not work.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence so the claim is natural and properly hedged.', 'I want to point out you are completely wrong and the data says the opposite.'),
    ],
    speakingPrompt: speak('A colleague is making a confident claim based on limited evidence. Respond diplomatically and explain what needs to be pointed out.', ['Use two hedges', 'Use point out', 'Avoid sounding aggressive', 'End with a practical next step']),
  }),
  lesson(5, 'Concession clauses with although / even though / much as', 'push back', {
    structureFunction: 'Acknowledge a valid point while still maintaining your own position.',
    explanation: 'Concession clauses show that your argument can absorb opposition: although, even though, and much as introduce a point you accept before you explain why it is not decisive.',
    lexicalMeaning: 'To resist, challenge, or question an idea, decision, or pressure.',
    lexicalPattern: 'push back against + noun / push back on + claim / push back when...',
    lexicalExample: 'The analysts pushed back against the assumption that growth would continue indefinitely.',
    communicativeFunction: 'You can disagree without sounding simplistic because you show what you understand before challenging it.',
    dangerZone: 'Do not use "although" and "but" to connect the same contrast: "Although it is risky, but..." is wrong. Choose one structure.',
    modelAnswers: [
      'Much as I understand the pressure to move quickly, I would push back against launching before the legal risks are clear.',
      'Even though the proposal has political appeal, several experts pushed back because it fails to address the underlying incentives.',
    ],
    tasks: [
      task('task-1', 'Mixed transformation', 'Rewrite the sentence using a concession clause and push back. Keep the tone firm but professional.', 'The plan is popular, but I think we should challenge it because the evidence is weak.'),
      task('task-2', 'Correction challenge', 'Correct the sentence and briefly explain the linking problem.', 'Although the strategy sounds reasonable, but the team should push back it before accepting the deadline.'),
      task('task-3', 'Controlled production', 'Write 3 sentences. Concede one advantage of automation, then push back against one overconfident claim about it.', 'Use although/even though/much as and avoid a one-sided answer.'),
    ],
    speakingPrompt: speak('Your team wants to accept an attractive but risky offer. Explain why you understand the appeal, then push back against the decision.', ['Use much as or even though', 'Use push back', 'Recycle one hedge from Day 4', 'Make the disagreement controlled']),
  }),
  lesson(6, 'Advanced contrast with whereas / while / nonetheless', 'rule out', {
    structureFunction: 'Contrast ideas, qualify claims, and avoid simplistic either-or arguments.',
    explanation: 'Whereas and while connect contrasting clauses within one sentence. Nonetheless links a concession to a result that remains true, usually across two carefully punctuated clauses or sentences.',
    lexicalMeaning: 'To reject or exclude something as a possibility.',
    lexicalPattern: 'rule out + noun / rule out the possibility that...',
    lexicalExample: 'We cannot rule out the possibility that the policy will have unintended effects.',
    communicativeFunction: 'You can compare positions precisely, resist black-and-white reasoning, and challenge an idea without sounding crude.',
    dangerZone: 'Spanish speakers often overuse "but" or translate contrast structures too directly. Whereas and contrastive while need two clauses; nonetheless is an adverb and needs deliberate punctuation.',
    modelAnswers: [
      'Remote work gives employees greater autonomy, whereas office-based work makes spontaneous collaboration considerably easier. We should not rule out a hybrid model merely because it is harder to coordinate.',
      'While the proposal is unlikely to solve the underlying problem, it may reduce the immediate pressure on public services; nonetheless, ruling it out before a trial would be premature.',
    ],
    tasks: [
      task('task-1', 'Sentence combining', 'Combine the ideas into one precise contrast using whereas or while. Preserve the contrast without adding new information.', 'Online courses offer flexibility. Face-to-face courses provide more immediate social interaction.', 'whereas / while'),
      task('task-2', 'Constrained transformation', 'Rewrite in 16-24 words using nonetheless and rule out.', 'The evidence is limited, but we should not completely reject the explanation.'),
      task('task-3', 'Error diagnosis', 'Rewrite the sentence correctly, improving word order and punctuation.', 'Whereas the plan is risky. We cannot rule out it, nonetheless.'),
    ],
    speakingPrompt: speak('Compare two credible approaches to remote work and explain which option should not be ruled out too quickly.', ['Use whereas or while', 'Use nonetheless', 'Use rule out', 'Give a qualified conclusion']),
  }),
  lesson(7, 'Mixed conditionals', 'end up', {
    structureFunction: 'Connect an unreal past cause to a present result, or a present condition to a past outcome.',
    explanation: 'Mixed conditionals cross time frames. A common pattern is if + past perfect, would + base verb to show how a past decision still shapes the present.',
    lexicalMeaning: 'To eventually reach a situation or result, often unexpectedly.',
    lexicalPattern: 'end up + -ing / end up + adjective / end up in + noun',
    lexicalExample: 'Without clearer priorities, the team may end up solving the wrong problem.',
    communicativeFunction: 'You can explain how past choices create present consequences and trace unintended outcomes with more precision.',
    dangerZone: 'Do not put would in the if-clause. "If I would have known..." should be "If I had known..."',
    modelAnswers: [
      'If the council had consulted local residents earlier, it would not be facing such determined opposition now. By treating criticism as an obstacle, it ended up weakening an otherwise defensible proposal.',
      'If the company were genuinely committed to staff development, it would have invested in training before the restructure. Instead, several capable employees ended up leaving at precisely the wrong moment.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences about a present consequence of a past public decision. Use a mixed conditional and end up.', 'Choose education, transport, technology, or work as your context.'),
      task('task-2', 'Key word transformation', 'Rewrite as a mixed conditional. Preserve the meaning and use the key word without changing it.', 'I ignored the early warnings, so I am dealing with a much larger problem now.', 'HAD'),
      task('task-3', 'Forced contrast', 'Contrast two possible past choices and their current consequences. Use end up once.', 'Investing early in training versus cutting training to save money.'),
    ],
    speakingPrompt: speak('Describe a past decision, personal or public, that created an important present-day consequence.', ['Use a mixed conditional', 'Use end up', 'Include one concession', 'Explain whether the consequence was foreseeable']),
  }),
  lesson(8, 'Third conditional with implied criticism', 'mess up', {
    structureFunction: 'Evaluate a past mistake and imply that a better course of action was available.',
    explanation: 'The third conditional frames an unreal alternative in the past: if + past perfect, would have + past participle. In context, it can convey restrained criticism without a direct accusation.',
    lexicalMeaning: 'To handle something badly or cause it to fail; informal but natural.',
    lexicalPattern: 'mess up + noun / mess something up',
    lexicalExample: 'A rushed handover messed up what should have been a straightforward transition.',
    communicativeFunction: 'You can narrate a preventable failure, assign responsibility with restraint, and show where events could have unfolded differently.',
    dangerZone: 'Avoid using would in the if-clause. Also control register: mess up is natural in speech, but a formal report may need mishandle or undermine.',
    modelAnswers: [
      'If the organisers had tested the booking system under realistic conditions, they would have spotted the fault before tickets went on sale. The technical team did not cause the demand, but they clearly messed up the launch.',
      'The negotiations might not have collapsed if both sides had clarified their non-negotiable demands at the outset. By leaving key terms deliberately vague, they messed up their best chance of reaching a durable agreement.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Turn the statement into restrained criticism using a third conditional. Do not use should.', 'You did not back up the files, and the team lost a week of work.'),
      task('task-2', 'Story reconstruction', 'Write 3-4 sentences describing the failure. Use a third conditional to identify the turning point and mess up once.', 'A promising project failed because nobody confirmed who was responsible for the final decision.'),
      task('task-3', 'Register upgrade', 'Rewrite this criticism for a formal internal review. Keep the third conditional but replace mess up with a formal alternative.', 'If they had actually checked the numbers, they would not have messed up the whole budget.'),
    ],
    speakingPrompt: speak('Describe a plan, event, or collaboration that went wrong because of one avoidable mistake.', ['Use a third conditional', 'Use mess up naturally', 'Show the turning point', 'End with a lesson or consequence']),
  }),
  lesson(9, 'Modal perfects for speculation', 'turn out', {
    structureFunction: 'Speculate carefully about past causes or explanations without claiming certainty.',
    explanation: 'Modal perfects such as may have, might have, could have, must have, and cannot have help you reason about the past from incomplete evidence.',
    lexicalMeaning: 'To prove to be, become known as, or happen in a particular way.',
    lexicalPattern: 'turn out to be + adjective/noun / turn out that + clause',
    lexicalExample: 'The delay turned out to be less serious than the first report suggested.',
    communicativeFunction: 'You can discuss evidence, uncertainty, and alternative explanations without overstating what you know.',
    dangerZone: 'Do not use "could of" or "must of"; the form is modal + have + past participle. Also avoid "resulted to be" for turned out to be.',
    modelAnswers: [
      'The figures may have been distorted by seasonal demand, so the apparent decline could turn out to be temporary.',
      'The criticism must have sounded exaggerated at first, but it turned out to be a fairly accurate warning about the system.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the sentence so it sounds cautious and evidence-based. Use a modal perfect and turn out.', 'The experiment failed because the researchers were careless.'),
      task('task-2', 'Precision paraphrase', 'Offer two possible explanations for the same past event using different modal perfects.', 'The product received excellent early reviews and then lost users quickly.', 'may have / might have / must have'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the modal-perfect error.', 'The initial warning could of turned out true if the team ignored the maintenance issue.'),
    ],
    speakingPrompt: speak('Speculate about why a promising idea looked strong at first but later turned out differently.', ['Use two modal perfects', 'Use turn out', 'Mention evidence limits', 'Avoid sounding certain']),
  }),
  lesson(10, 'Modal perfects for regret and criticism', 'let down', {
    structureFunction: 'Express regret, blame, or missed obligation about the past with controlled force.',
    explanation: 'Should have, could have, and might have can evaluate past decisions. The tone depends on context: they can sound regretful, accusatory, or professionally critical.',
    lexicalMeaning: 'To disappoint someone or fail to provide expected support or quality.',
    lexicalPattern: 'let someone down / let down + group / feel let down by',
    lexicalExample: 'The organisation let down the staff who had trusted its promises.',
    communicativeFunction: 'You can criticize past behavior without sounding childish or purely emotional.',
    dangerZone: 'Do not say "I am agree they should have..." and avoid "let down to someone." The object comes directly after let down.',
    modelAnswers: [
      'The board should have communicated the risks earlier, because its silence let down the employees who had planned around those assurances.',
      'They could have preserved trust by admitting the delay immediately; instead, the final explanation made customers feel even more let down.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the sentence. Use a modal perfect and let down naturally.', 'The manager should explained the problem before and did not let down to the team.'),
      task('task-2', 'Controlled production', 'Write 3 sentences criticizing a past decision. Include regret, one concession, and let down.', 'A university cancelled a course with very little notice.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus one contrast marker from Day 6 to rewrite the idea.', 'The apology was sincere, but the delay damaged trust.'),
    ],
    speakingPrompt: speak('Explain a time when an institution, company, or leader let people down. Keep the criticism precise rather than emotional.', ['Use should have or could have', 'Use let down', 'Recycle contrast from Day 6', 'Mention one preventable consequence']),
  }),
  lesson(11, 'Reduced relative clauses', 'single out', {
    structureFunction: 'Compress information by turning full relative clauses into concise descriptive phrases.',
    explanation: 'Reduced relative clauses omit who/which/that plus forms of be, or use participle phrases: "the report published yesterday", "people affected by the decision", "teams facing pressure."',
    lexicalMeaning: 'To choose one person, group, or factor for special attention, often for praise or criticism.',
    lexicalPattern: 'single out + noun / be singled out for + noun/-ing',
    lexicalExample: 'The report singled out poor communication as the main cause of the delay.',
    communicativeFunction: 'You can pack detail into a sentence without making it heavy or repetitive.',
    dangerZone: 'Do not reduce every relative clause mechanically. "The person works here" cannot become "the person works here" as a modifier; reduction depends on the grammar of the clause.',
    modelAnswers: [
      'The employees affected by the restructure should not be singled out for problems created by senior management.',
      'The risks identified in the audit were serious, but the review unfairly singled out one junior analyst for a collective failure.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite with a reduced relative clause and single out. Preserve the meaning.', 'The committee criticized the team that was responsible for the failed pilot.', 'SINGLED'),
      task('task-2', 'Sentence combining', 'Combine the sentences into one C1 sentence using a reduced relative clause.', 'The policy affects temporary workers. Those workers were not consulted. The report focuses on that group.', 'single out'),
      task('task-3', 'Error diagnosis', 'Correct the reduced relative clause and explain the problem.', 'The manager singled out the employees were affected by the delay.'),
    ],
    speakingPrompt: speak('Discuss whether it is fair to single out individual employees when a failure was caused by a flawed system.', ['Use a reduced relative clause', 'Use single out', 'Include one concession', 'Distinguish individual and systemic responsibility']),
  }),
  lesson(12, 'Non-defining relative clauses', 'lay out', {
    structureFunction: 'Add extra information elegantly without losing control of the main sentence.',
    explanation: 'Non-defining relative clauses add non-essential information with commas: "The proposal, which the team laid out yesterday,..." They help you sound explanatory and precise.',
    lexicalMeaning: 'To explain, present, or arrange information clearly.',
    lexicalPattern: 'lay out + plan/argument/evidence / lay something out clearly',
    lexicalExample: 'The consultant laid out the risks before recommending any action.',
    communicativeFunction: 'You can build an argument that is detailed but still easy to follow.',
    dangerZone: 'Do not use "that" in a non-defining relative clause. Use which, who, or whose with commas.',
    modelAnswers: [
      'The policy, which the minister laid out in unusually cautious terms, may reduce costs without solving the deeper staffing problem.',
      'Their argument, which was laid out more clearly in the appendix, rests on assumptions that have not been tested.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences evaluating a proposal. Include one non-defining relative clause and lay out.', 'A city wants to replace several bus routes with an app-based transport service.'),
      task('task-2', 'Key word transformation', 'Rewrite as one sentence with a non-defining relative clause. Use the key word.', 'The report explained the financial risks clearly. It was ignored by the board.', 'WHICH'),
      task('task-3', 'Forced contrast', 'Contrast a plan that is clearly laid out with one that is politically attractive but vague.', 'Use one non-defining relative clause and one concession.'),
    ],
    speakingPrompt: speak('Explain what makes a proposal convincing when the evidence is complex.', ['Use a non-defining relative clause', 'Use lay out', 'Mention clarity and limits', 'Give one example']),
  }),
  lesson(13, 'Participle clauses', 'build up', {
    structureFunction: 'Link actions, causes, and background information compactly in narrative or argument.',
    explanation: 'Participle clauses use -ing or past participles to connect information: "Facing pressure, the team delayed the decision." They can show cause, sequence, or background.',
    lexicalMeaning: 'To accumulate, develop, or increase gradually.',
    lexicalPattern: 'build up + pressure/trust/tension/evidence / build up to + event',
    lexicalExample: 'Tension built up for months before the dispute became public.',
    communicativeFunction: 'You can explain how problems develop over time instead of listing events flatly.',
    dangerZone: 'Make sure the participle clause refers logically to the subject. "Having ignored the warnings, the crisis grew" is a dangling participle because the crisis did not ignore warnings.',
    modelAnswers: [
      'Having ignored several early complaints, the company allowed resentment to build up until a minor error triggered a much larger conflict.',
      'Faced with growing criticism, the committee tried to rebuild trust, but the pressure had already built up beyond what a statement could fix.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the account with a participle clause showing cause. Use build up.', 'The team ignored small delays for months. The pressure became impossible to manage.'),
      task('task-2', 'Sentence combining', 'Combine the short sentences into two sophisticated C1 sentences.', 'The evidence accumulated slowly. Managers dismissed it. Staff frustration increased. The final complaint surprised nobody.', 'build up'),
      task('task-3', 'Error diagnosis', 'Correct the dangling participle and make the causality clear.', 'Having built up over several months, the managers ignored the tension until it was too late.'),
    ],
    speakingPrompt: speak('Tell a story about a problem that built up gradually before anyone admitted it was serious.', ['Use one participle clause', 'Use build up', 'Show sequence clearly', 'Explain the turning point']),
  }),
  lesson(14, 'Having + past participle clauses', 'fall back on', {
    structureFunction: 'Show that one completed action happened before another and explain its effect.',
    explanation: 'Having + past participle creates a compressed past sequence: "Having lost public trust, the company fell back on discounts." It is useful in formal narrative and analysis.',
    lexicalMeaning: 'To use a backup option, habit, argument, or resource when the preferred one fails.',
    lexicalPattern: 'fall back on + noun / fall back on old habits / fall back on a backup plan',
    lexicalExample: 'When negotiation failed, the team fell back on a legal strategy.',
    communicativeFunction: 'You can explain fallback decisions and show how earlier failures shaped later choices.',
    dangerZone: 'Do not use "having" for events that happen at the same time. It marks a completed earlier action.',
    modelAnswers: [
      'Having underestimated the technical complexity, the team fell back on a temporary fix that solved the symptom but not the cause.',
      'Having failed to secure public support, the council fell back on procedural arguments rather than addressing the criticism directly.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite in a more formal C1 style using having + past participle and fall back on.', 'They failed to agree, so they used their old excuse again.'),
      task('task-2', 'Precision paraphrase', 'Explain the sequence in one sentence. The first action must be completed before the second.', 'The company lost access to cheap funding. It relied on short-term cost cuts.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the sequencing problem.', 'Having falls back on discounts, the company admitted the product had lost momentum.'),
    ],
    speakingPrompt: speak('Describe a time when a person or organisation had to fall back on a backup plan after an earlier mistake.', ['Use having + past participle', 'Use fall back on', 'Keep chronology clear', 'Evaluate the backup plan']),
  }),
  lesson(15, 'Passive reporting structures: it is said / thought / believed', 'look into', {
    structureFunction: 'Distance yourself from a claim while reporting what is generally believed or alleged.',
    explanation: 'Passive reporting structures such as it is believed that and he is said to allow you to report claims without presenting them as your own certainty.',
    lexicalMeaning: 'To investigate, examine, or check something carefully.',
    lexicalPattern: 'look into + issue/claim/problem / be looked into',
    lexicalExample: 'The committee promised to look into the allegations before publishing its findings.',
    communicativeFunction: 'You can discuss uncertainty, allegations, and institutional investigations in a controlled formal register.',
    dangerZone: 'Do not say "it is said me" or "it is believed the problem." Use "it is believed that..." or "the problem is believed to..."',
    modelAnswers: [
      'It is widely believed that the complaint was not looked into properly, which is why the decision still lacks credibility.',
      'The failure is thought to have stemmed from poor oversight, although the auditors are still looking into several competing explanations.',
    ],
    tasks: [
      task('task-1', 'Mixed transformation', 'Rewrite the claim using a passive reporting structure and look into.', 'People say the regulator ignored several warnings before it investigated the issue.'),
      task('task-2', 'Correction challenge', 'Correct the sentence and make the register formal.', 'It is said the company looked the allegations into too late.'),
      task('task-3', 'Controlled production', 'Write 3 sentences about a disputed public claim. Include one passive reporting structure and one cautious hedge.', 'The claim involves safety, funding, or political influence.'),
    ],
    speakingPrompt: speak('Discuss how an institution should respond when it is believed to have ignored early warnings.', ['Use passive reporting', 'Use look into', 'Recycle a hedge from Day 4', 'Avoid making unsupported claims']),
  }),
  lesson(16, 'Passive causative: have / get something done', 'sort out', {
    structureFunction: 'Describe arranging for someone else to solve, repair, or handle a problem.',
    explanation: 'The passive causative uses have/get + object + past participle: "We had the contract reviewed." It focuses on the result or arrangement, not the doer.',
    lexicalMeaning: 'To solve, organise, or deal with a problem successfully.',
    lexicalPattern: 'sort out + problem / sort something out / get something sorted out',
    lexicalExample: 'The team needs to sort out the approval process before the next deadline.',
    communicativeFunction: 'You can discuss delegation, repair, and problem-solving with practical precision.',
    dangerZone: 'Do not say "I did repair the laptop" when someone else repaired it for you. Use "I had the laptop repaired" or "got it repaired."',
    modelAnswers: [
      'Before the audit, we had the data checked independently so that any inconsistencies could be sorted out quickly.',
      'The manager got the contract reviewed by a specialist, but she still failed to sort out the underlying communication problem.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using the passive causative and sort out.', 'A specialist reviewed the process for us because the approval system was confusing.', 'HAD'),
      task('task-2', 'Constrained transformation', 'Rewrite in 14-22 words using get + object + past participle and sort out.', 'We need someone to fix the scheduling problem before the client meeting.'),
      task('task-3', 'Error diagnosis', 'Correct the causative structure.', 'We got reviewed the policy and finally sorted the confusion out.'),
    ],
    speakingPrompt: speak('Explain a professional problem that could be solved faster if the right expert were brought in.', ['Use have/get something done', 'Use sort out', 'Name the actual bottleneck', 'Mention one risk if nothing changes']),
  }),
  lesson(17, 'Advanced passive with modal verbs', 'carry out', {
    structureFunction: 'Discuss obligations, possibilities, and requirements while focusing on the action rather than the actor.',
    explanation: 'Modal passives use modal + be + past participle: must be reviewed, should be tested, cannot be ignored. They are common in formal recommendations and procedures.',
    lexicalMeaning: 'To perform, conduct, or complete a task, study, plan, or investigation.',
    lexicalPattern: 'carry out + research/a review/an investigation/a plan',
    lexicalExample: 'A full safety review should be carried out before the system is expanded.',
    communicativeFunction: 'You can make recommendations and express procedural necessity in a formal, impersonal register.',
    dangerZone: 'Do not drop be after the modal. Say "must be carried out", not "must carried out."',
    modelAnswers: [
      'Before the policy is extended nationally, an independent evaluation should be carried out to test its real effects.',
      'The interview data must not be dismissed until a more rigorous analysis has been carried out.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences arguing what must be done before a risky policy expands. Use a modal passive and carry out.', 'Context: public health, education, transport, or workplace surveillance.'),
      task('task-2', 'Forced contrast', 'Contrast what can be done quickly with what must be carried out carefully.', 'Use at least two modal passives.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the missing auxiliary.', 'A proper investigation should carried out before anyone is blamed.'),
    ],
    speakingPrompt: speak('Discuss when a decision should not be implemented until further checks have been carried out.', ['Use modal passive forms', 'Use carry out', 'Include one concession', 'Explain the cost of rushing']),
  }),
  lesson(18, 'Nominalization for formal speech', 'account for', {
    structureFunction: 'Turn actions into abstract nouns to create a more formal, analytical style.',
    explanation: 'Nominalization uses nouns such as implementation, reduction, failure, expansion, and assessment instead of verb-heavy wording. It can make analysis denser and more formal.',
    lexicalMeaning: 'To explain, justify, or take something into consideration.',
    lexicalPattern: 'account for + result/difference/risk / take account of + noun',
    lexicalExample: 'The model fails to account for regional differences in income.',
    communicativeFunction: 'You can sound more academic and precise when explaining causes, limitations, or evidence.',
    dangerZone: 'Nominalization can become heavy. Use it to sharpen analysis, not to hide responsibility behind abstract nouns.',
    modelAnswers: [
      'The sudden reduction in complaints may not account for improved service quality, since several users simply stopped reporting problems.',
      'The failure of the forecast stems partly from its inability to account for behavioural changes after the price increase.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the explanation in a more formal style using nominalization and account for.', 'People used the service less because prices went up and the timetable became unreliable.'),
      task('task-2', 'Sentence combining', 'Combine the ideas into one or two formal C1 sentences.', 'The survey changed its method. The results look better. That change may explain the difference.', 'account for'),
      task('task-3', 'Precision paraphrase', 'Upgrade the sentence without making it artificially vague.', 'The plan failed because managers did not think about how people would react.'),
    ],
    speakingPrompt: speak('Explain why a set of results may look impressive but fail to account for an important hidden variable.', ['Use at least one nominalization', 'Use account for', 'Keep the explanation clear', 'Mention one limitation']),
  }),
  lesson(19, 'Emphatic do / did', 'stand out', {
    structureFunction: 'Add controlled emphasis to a positive claim, correction, or contrast.',
    explanation: 'Emphatic do/did is used before the base verb: "I do understand the concern." It often corrects an assumption or strengthens a contrast.',
    lexicalMeaning: 'To be especially noticeable, impressive, or different.',
    lexicalPattern: 'stand out as + noun/adjective / stand out from + group / what stands out is...',
    lexicalExample: 'What stands out is how quickly the team adapted under pressure.',
    communicativeFunction: 'You can correct someone firmly while still sounding measured and precise.',
    dangerZone: 'Do not use emphatic do with be or modal verbs. Say "I am aware", not "I do am aware."',
    modelAnswers: [
      'I do accept that the sample is small, but one finding still stands out: the intervention helped the least confident students most.',
      'The report did identify several operational weaknesses, yet what stands out is the lack of any serious follow-through.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the response so it sounds firm, not defensive. Use emphatic do and stand out.', 'I understand your concern, but the main problem is the missing evidence.'),
      task('task-2', 'Error diagnosis', 'Correct the sentence and explain why do is wrong or right.', 'The data does is limited, but the pattern stands out clearly.'),
      task('task-3', 'Diplomatic disagreement', 'Write 3 sentences disagreeing with a simplistic interpretation. Use emphatic do once.', 'The project failed because the team was lazy.'),
    ],
    speakingPrompt: speak('Respond to someone who has misunderstood your position. Clarify what you do accept and what still stands out.', ['Use emphatic do/did', 'Use stand out', 'Keep the tone controlled', 'Avoid overexplaining']),
  }),
  lesson(20, 'Subjunctive after recommend / suggest / insist', 'follow through', {
    structureFunction: 'State recommendations, demands, or requirements in a formal and concise way.',
    explanation: 'After verbs like recommend, suggest, insist, and demand, formal English can use the base form: "I recommend that he be informed." It sounds precise and institutional.',
    lexicalMeaning: 'To complete a promised action or continue until the end.',
    lexicalPattern: 'follow through on + commitment/plan/promise / follow through with + action',
    lexicalExample: 'The board announced reforms but failed to follow through on them.',
    communicativeFunction: 'You can make formal recommendations and evaluate whether action matched promises.',
    dangerZone: 'In the subjunctive, the verb does not change: "she be", "he complete", not "she is" or "he completes" in formal use.',
    modelAnswers: [
      'The review recommends that the company follow through on its safety commitments before expanding the service.',
      'I would insist that the policy be monitored publicly, because institutions often promise reform and then fail to follow through.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the recommendation. Use the formal subjunctive and follow through.', 'The committee recommends that the manager follows through with the changes immediately.'),
      task('task-2', 'Controlled production', 'Write 3 sentences for a formal report. Include one recommendation and one criticism of weak follow-through.', 'Context: training, customer safety, or public accountability.'),
      task('task-3', 'Recycling transformation', 'Combine today\'s structure with a modal passive from Day 17.', 'The review should happen before the promise is treated as credible.'),
    ],
    speakingPrompt: speak('Give a formal recommendation to an organisation that has announced reforms but not acted on them.', ['Use recommend/suggest/insist + base verb', 'Use follow through', 'Recycle a passive from Day 17', 'Mention accountability']),
  }),
  lesson(21, 'Wish / if only for present regret', 'put up with', {
    structureFunction: 'Express dissatisfaction with a current situation you would like to be different.',
    explanation: 'Wish/if only + past simple describes present regret or irritation: "I wish the process were clearer." It does not refer to past time here.',
    lexicalMeaning: 'To tolerate an unpleasant situation, behaviour, or condition.',
    lexicalPattern: 'put up with + noun/-ing',
    lexicalExample: 'Employees should not have to put up with constant last-minute changes.',
    communicativeFunction: 'You can express frustration about current problems without sounding childish or vague.',
    dangerZone: 'Do not say "I wish it would be" for a state you simply want to be different. Use "I wish it were/was..."',
    modelAnswers: [
      'I wish the approval process were more transparent, because junior staff are being asked to put up with uncertainty that managers created.',
      'If only the platform were less fragmented, users would not have to put up with the same errors every week.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using wish or if only and put up with.', 'The team tolerates unclear instructions, and that is frustrating.', 'WISH'),
      task('task-2', 'Constrained transformation', 'Write one sentence using if only + past simple and put up with. Tone: controlled frustration.', 'Context: an inefficient work process.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the tense meaning.', 'I wish the system is clearer so we do not have to put up with so many mistakes.'),
    ],
    speakingPrompt: speak('Describe a current situation people should not have to put up with and explain what you wish were different.', ['Use wish or if only for present regret', 'Use put up with', 'Avoid ranting', 'Suggest one practical improvement']),
  }),
  lesson(22, 'Wish / if only for past regret', 'miss out on', {
    structureFunction: 'Express regret about a past action, inaction, or lost opportunity.',
    explanation: 'Wish/if only + past perfect refers to past regret: "I wish we had acted earlier." It helps you evaluate past choices with emotional and analytical control.',
    lexicalMeaning: 'To lose the chance to experience or benefit from something.',
    lexicalPattern: 'miss out on + opportunity/experience/benefit',
    lexicalExample: 'Several students missed out on support because the information was poorly communicated.',
    communicativeFunction: 'You can talk about missed opportunities in a way that is specific, reflective, and not melodramatic.',
    dangerZone: 'Do not use "I wish I would have..." Use "I wish I had..." for past regret.',
    modelAnswers: [
      'I wish the school had identified the problem earlier, because many students missed out on support they were entitled to receive.',
      'If only the team had tested the prototype with real users, it would not have missed out on such valuable feedback.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences about a missed opportunity in education, work, or technology. Use wish/if only + past perfect and miss out on.', 'Explain the consequence, not only the regret.'),
      task('task-2', 'Key word transformation', 'Rewrite using if only and miss out on.', 'We did not apply early, so we lost the chance to receive funding.', 'ONLY'),
      task('task-3', 'Forced contrast', 'Compare a short-term saving with a long-term opportunity that was missed. Use one past regret structure.', 'A company cut mentoring costs and later lost several promising junior employees.'),
    ],
    speakingPrompt: speak('Talk about a decision that caused someone to miss out on a valuable opportunity.', ['Use wish/if only + past perfect', 'Use miss out on', 'Include one concession', 'Explain what could have been done differently']),
  }),
  lesson(23, 'Would rather / would sooner', 'back out of', {
    structureFunction: 'Express preference, reluctance, or an alternative choice with a mature tone.',
    explanation: 'Would rather/would sooner + base verb expresses preference. Would rather + subject + past tense can express what you want someone else to do: "I would rather they waited."',
    lexicalMeaning: 'To withdraw from a promise, agreement, plan, or commitment.',
    lexicalPattern: 'back out of + deal/plan/agreement/commitment',
    lexicalExample: 'The sponsor backed out of the agreement after the budget changed.',
    communicativeFunction: 'You can narrate preferences and withdrawals while showing tension between intention and pressure.',
    dangerZone: 'Do not say "I would rather to leave." Use "I would rather leave."',
    modelAnswers: [
      'I would rather delay the launch than back out of quality commitments we made to users months ago.',
      'She would sooner admit the plan had become unrealistic than back out of the agreement without an explanation.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the situation as a controlled narrative using would rather and back out of.', 'A partner wanted to withdraw from a deal but feared damaging their reputation.'),
      task('task-2', 'Sentence combining', 'Combine the ideas into two C1 sentences.', 'The deadline was unrealistic. The team preferred to renegotiate. They did not want to withdraw from the project.', 'back out of'),
      task('task-3', 'Precision paraphrase', 'Rewrite the sentence so the preference sounds mature, not childish.', 'I do not want to continue because the agreement is annoying.'),
    ],
    speakingPrompt: speak('Tell a short story about someone who had to decide whether to back out of a commitment.', ['Use would rather/would sooner', 'Use back out of', 'Show the pressure', 'Explain the final decision']),
  }),
  lesson(24, 'It is high time / it is about time', 'step up', {
    structureFunction: 'Express that action is overdue and should already be happening.',
    explanation: 'It is high time/about time + past tense refers to the present or future: "It is high time the company took responsibility." It sounds urgent and critical.',
    lexicalMeaning: 'To increase effort, responsibility, intensity, or performance.',
    lexicalPattern: 'step up + effort/security/support / step up to + responsibility',
    lexicalExample: 'Local authorities need to step up their response before the problem worsens.',
    communicativeFunction: 'You can demand change with controlled urgency rather than vague frustration.',
    dangerZone: 'After "it is high time", use past tense for present meaning: "It is high time they acted", not "they act."',
    modelAnswers: [
      'It is high time the platform stepped up its moderation efforts instead of treating repeated abuse as an unfortunate side effect.',
      'It is about time policymakers stepped up support for workers whose jobs are being reshaped by automation.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the blunt complaint as a firm C1 statement using it is high time and step up.', 'The government must do more because the situation is getting worse.'),
      task('task-2', 'Diplomatic disagreement', 'Write 3 sentences disagreeing with someone who says the current response is enough. Use it is about time.', 'Context: mental health support, data protection, or public transport.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the tense after high time.', 'It is high time the company steps up and fixes the safety problem.'),
    ],
    speakingPrompt: speak('Argue that an institution has delayed action for too long and now needs to step up.', ['Use it is high time/about time', 'Use step up', 'Use a controlled critical tone', 'Mention consequences of delay']),
  }),
  lesson(25, 'Unreal past for hypothetical meaning', 'come up against', {
    structureFunction: 'Use past forms to discuss imaginary, unlikely, or tactfully distanced present situations.',
    explanation: 'Unreal past appears after structures such as suppose, imagine, I would rather, and it is time. The past form marks distance from reality, not necessarily past time.',
    lexicalMeaning: 'To encounter a difficulty, obstacle, resistance, or limit.',
    lexicalPattern: 'come up against + obstacle/resistance/problem/limit',
    lexicalExample: 'The reform came up against strong resistance from local authorities.',
    communicativeFunction: 'You can explore hypothetical obstacles and test ideas before committing to them.',
    dangerZone: 'Do not interpret every past form as past time. In "suppose we came up against resistance", came refers to a hypothetical future or present scenario.',
    modelAnswers: [
      'Suppose the proposal came up against legal resistance; would the team have enough evidence to defend it publicly?',
      'I would rather we tested the policy on a smaller scale before we came up against problems that could damage trust permanently.',
    ],
    tasks: [
      task('task-1', 'Mixed transformation', 'Rewrite using unreal past and come up against. Keep it hypothetical.', 'If the plan faces resistance, what will we do?'),
      task('task-2', 'Correction challenge', 'Correct the sentence and explain why the past form is used.', 'Suppose we come up against serious criticism, we need had a better explanation.'),
      task('task-3', 'Controlled production', 'Write 3 sentences exploring a hypothetical obstacle to a promising idea. Include one concession and one unreal past form.', 'A school wants to replace exams with project-based assessment, but parents may resist the change.'),
    ],
    speakingPrompt: speak('Imagine your preferred solution came up against serious resistance. Explain how you would adapt without abandoning the goal.', ['Use unreal past', 'Use come up against', 'Recycle it is high time/about time from Day 24', 'Keep the answer strategic']),
  }),
  lesson(26, 'Advanced conditionals without if', 'take on', {
    structureFunction: 'Use inversion to create formal, compact conditionals without if.',
    explanation: 'Had, were, and should can replace if in formal conditionals: "Had we known...", "Were the plan approved...", "Should problems arise..."',
    lexicalMeaning: 'To accept responsibility, work, risk, or a challenge.',
    lexicalPattern: 'take on + responsibility/work/risk/challenge / take someone on',
    lexicalExample: 'The team took on more responsibility than it could realistically manage.',
    communicativeFunction: 'You can discuss risks, responsibilities, and alternative outcomes in a polished formal style.',
    dangerZone: 'Do not mix if with conditional inversion: "If had we known" is wrong. Use either "If we had known" or "Had we known."',
    modelAnswers: [
      'Had the team understood the legal risk, it would not have taken on such a demanding contract without specialist advice.',
      'Were the company to take on responsibility for the transition, it would need to publish a credible timeline first.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using a conditional without if and take on.', 'If the city accepted responsibility for the service, it would need more funding.', 'WERE'),
      task('task-2', 'Constrained transformation', 'Write one formal sentence beginning with Had. Use take on and show an unreal past consequence.', 'The team accepted a contract before understanding the legal risk.'),
      task('task-3', 'Error diagnosis', 'Correct the conditional structure.', 'If had the board taken on the risk, the investors would have demanded stronger evidence.'),
    ],
    speakingPrompt: speak('Discuss a situation where an organisation should not take on a responsibility unless certain conditions are met.', ['Use had/were/should inversion', 'Use take on', 'Mention a risk', 'Use a formal tone']),
  }),
  lesson(27, 'Provided that / assuming that / as long as', 'go ahead with', {
    structureFunction: 'Set conditions under which an action is acceptable, realistic, or defensible.',
    explanation: 'Provided that, assuming that, and as long as introduce necessary conditions. They are useful for qualified agreement and practical decision-making.',
    lexicalMeaning: 'To proceed with a plan, project, or decision.',
    lexicalPattern: 'go ahead with + plan/project/decision / go ahead with it',
    lexicalExample: 'The board will go ahead with the expansion provided that the risk assessment is approved.',
    communicativeFunction: 'You can support a plan without sounding naive by attaching clear conditions.',
    dangerZone: 'Do not use future after these conjunctions in standard conditional clauses. Say "provided that the data is reliable", not "will be reliable."',
    modelAnswers: [
      'I would go ahead with the pilot, provided that the results are monitored independently and published in full.',
      'Assuming that the privacy safeguards are genuine, the city can go ahead with the system without dismissing public concerns.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences supporting a plan with conditions. Use provided that or as long as and go ahead with.', 'Context: AI in schools, workplace monitoring, or a new transport scheme.'),
      task('task-2', 'Forced contrast', 'Contrast blind optimism with conditional support. Include go ahead with.', 'Use assuming that or provided that.'),
      task('task-3', 'Error diagnosis', 'Correct the conditional clause.', 'We can go ahead with the trial provided that the data will be reliable.'),
    ],
    speakingPrompt: speak('Explain when you would go ahead with a controversial plan and what conditions would have to be met first.', ['Use provided that/assuming that/as long as', 'Use go ahead with', 'Include one concession', 'Name one non-negotiable condition']),
  }),
  lesson(28, 'Unless / otherwise / or else', 'fall through', {
    structureFunction: 'Explain negative conditions, warnings, and consequences if action is not taken.',
    explanation: 'Unless means if not. Otherwise and or else point to the consequence of failing to meet a condition. They are useful for pressure and risk management.',
    lexicalMeaning: 'To fail to happen, especially after being planned or expected.',
    lexicalPattern: 'deal/plan/agreement falls through / fall through at the last minute',
    lexicalExample: 'The agreement fell through when the funding was withdrawn.',
    communicativeFunction: 'You can explain what must happen to prevent a plan from collapsing.',
    dangerZone: 'Avoid double negatives after unless. "Unless we do not act" usually means the opposite of what you intend.',
    modelAnswers: [
      'Unless the funding is confirmed this week, the partnership may fall through before the legal details are even discussed.',
      'The team needs a clearer decision process; otherwise, the agreement could fall through because nobody knows who has final authority.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the situation using unless or otherwise and fall through.', 'A deal failed because the legal team did not receive the documents in time.'),
      task('task-2', 'Story reconstruction', 'Write 3-4 sentences about a plan that nearly collapsed. Use otherwise and fall through.', 'Show the sequence and the rescue point.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the conditional meaning.', 'Unless the sponsor does not approve the budget, the event will fall through.'),
    ],
    speakingPrompt: speak('Tell a short story about a plan that almost fell through because one condition was not met.', ['Use unless/otherwise/or else', 'Use fall through', 'Show cause and consequence', 'Keep chronology tight']),
  }),
  lesson(29, 'In case / lest / for fear that', 'hold back', {
    structureFunction: 'Explain preventive action taken to avoid a possible negative outcome.',
    explanation: 'In case introduces a precaution. For fear that is formal and explanatory. Lest is rare and formal but useful in advanced recognition and careful writing.',
    lexicalMeaning: 'To restrain, delay, withhold, or stop something from developing fully.',
    lexicalPattern: 'hold back + information/progress/person / hold someone back from + -ing',
    lexicalExample: 'The team held back some details for fear that the announcement would cause confusion.',
    communicativeFunction: 'You can describe caution, self-censorship, and risk-avoidance with more nuance.',
    dangerZone: 'In case does not mean if. "Take an umbrella in case it rains" means as a precaution before it rains.',
    modelAnswers: [
      'The researchers held back the preliminary findings for fear that the media would misrepresent them before peer review.',
      'She avoided raising the concern in public lest it be interpreted as personal criticism, but holding back only made the meeting less honest.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite in a more precise C1 style using for fear that and hold back.', 'They did not share the data because they were worried people would react badly.'),
      task('task-2', 'Precision paraphrase', 'Explain a preventive action using in case. Include hold back naturally.', 'A manager delayed an announcement to avoid confusion among staff.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and explain the difference between in case and if.', 'They held back the warning if investors panicked.'),
    ],
    speakingPrompt: speak('Discuss when it is responsible to hold back information and when it becomes manipulative.', ['Use in case/for fear that/lest', 'Use hold back', 'Include a balanced contrast', 'Give one concrete example']),
  }),
  lesson(30, 'As if / as though', 'make out', {
    structureFunction: 'Describe appearance, pretence, or hypothetical comparison with subtle evaluation.',
    explanation: 'As if/as though can describe how something appears or how someone pretends. With unreal meaning, use past forms: "as if he knew", "as though nothing had happened."',
    lexicalMeaning: 'To claim or pretend that something is true; also to manage to see, hear, or understand something.',
    lexicalPattern: 'make out that + clause / make someone/something out to be + noun/adjective',
    lexicalExample: 'The company made out that the delay was unavoidable, although the documents suggested otherwise.',
    communicativeFunction: 'You can criticize pretence, spin, or misleading presentation without sounding crude.',
    dangerZone: 'Do not say "as if he knows everything" when the meaning is unreal or critical; use "as if he knew everything."',
    modelAnswers: [
      'The spokesperson made out that the decision was purely technical, as though political pressure had played no role at all.',
      'They spoke as if the outcome had been inevitable, but the report makes it out to be a failure of planning rather than fate.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the sentence. Use as if/as though and make out.', 'They made out the failure like it was nobody responsibility.'),
      task('task-2', 'Controlled production', 'Write 3 sentences criticizing a misleading explanation. Include as though and make out that.', 'Context: a company, school, or public authority explaining a mistake.'),
      task('task-3', 'Recycling transformation', 'Combine today\'s target with unless/otherwise from Day 28.', 'The plan will look credible only if leaders stop pretending the risks are minor.'),
    ],
    speakingPrompt: speak('Explain a situation where someone made out that a problem was smaller or simpler than it really was.', ['Use as if/as though', 'Use make out', 'Recycle unless or otherwise', 'Keep the criticism controlled']),
  }),
  lesson(31, 'Discourse markers for argumentation', 'bring in', {
    structureFunction: 'Guide listeners through reasoning with clear transitions, concessions, and conclusions.',
    explanation: 'Markers such as admittedly, however, more importantly, by contrast, in practical terms, and ultimately help structure an argument. They should clarify logic, not decorate it.',
    lexicalMeaning: 'To introduce, involve, or add something or someone.',
    lexicalPattern: 'bring in + evidence/expert/rule/perspective',
    lexicalExample: 'The committee brought in independent experts to review the evidence.',
    communicativeFunction: 'You can build arguments that are easier to follow and harder to dismiss.',
    dangerZone: 'Do not stack discourse markers mechanically. One precise transition is stronger than several vague ones.',
    modelAnswers: [
      'Admittedly, the proposal is expensive; however, once we bring in the cost of inaction, the comparison becomes less straightforward.',
      'More importantly, the debate changes when we bring in user safety rather than treating efficiency as the only criterion.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite the argument with two clear discourse markers and bring in.', 'The plan costs money. We should also consider the cost of doing nothing.', 'HOWEVER'),
      task('task-2', 'Constrained transformation', 'Write 3 connected sentences using admittedly, however, and bring in. Tone: analytical.', 'Topic: whether schools should use AI tools for writing feedback.'),
      task('task-3', 'Error diagnosis', 'Improve the flow and remove weak transition clutter.', 'Firstly, however, in conclusion, we should bring in more data because the idea is good but bad.'),
    ],
    speakingPrompt: speak('Argue for or against bringing in outside experts when an organisation faces public criticism.', ['Use at least three discourse markers', 'Use bring in', 'Include one concession', 'Make the conclusion explicit']),
  }),
  lesson(32, 'Cause and consequence chains', 'lead to', {
    structureFunction: 'Trace how one factor produces another without oversimplifying causality.',
    explanation: 'Cause-consequence chains use structures such as X leads to Y, which in turn creates Z. Strong speakers distinguish direct causes, contributing factors, and outcomes.',
    lexicalMeaning: 'To cause, produce, or result in a later event or situation.',
    lexicalPattern: 'lead to + noun/-ing / lead someone to + verb',
    lexicalExample: 'Poor communication led to delays, which then led to higher costs.',
    communicativeFunction: 'You can explain complex consequences instead of making shallow cause-effect claims.',
    dangerZone: 'Avoid "lead that" or "lead to happen." Use lead to + noun/-ing, or lead someone to believe/do something.',
    modelAnswers: [
      'A lack of early feedback can lead to false confidence, which in turn leads teams to ignore warnings until the cost of change becomes much higher.',
      'When incentives reward speed over accuracy, they often lead to rushed decisions rather than genuine efficiency.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences tracing a consequence chain. Use lead to twice without sounding repetitive.', 'Topic: short-term targets in workplaces.'),
      task('task-2', 'Forced contrast', 'Compare an immediate benefit with a delayed consequence. Use which in turn and lead to.', 'Context: cutting training budgets.'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences to the statement. Include one cause chain and one qualification.', 'Technology solves more problems than it creates.'),
    ],
    speakingPrompt: speak('Explain how one apparently small decision can lead to a series of larger consequences.', ['Use lead to', 'Use one cause chain', 'Include a qualification', 'End with a lesson']),
  }),
  lesson(33, 'Counterargument structures', 'push back against', {
    structureFunction: 'Respond to an opposing view by naming it, conceding what is fair, and challenging what is weak.',
    explanation: 'Counterargument structures include while it is true that..., that does not mean..., a stronger objection is..., and this overlooks.... They prevent your argument from sounding one-sided.',
    lexicalMeaning: 'To resist or challenge an idea, pressure, claim, or decision.',
    lexicalPattern: 'push back against + claim/assumption/pressure/decision',
    lexicalExample: 'Several researchers pushed back against the claim that the results were conclusive.',
    communicativeFunction: 'You can disagree in a way that sounds intellectually mature and fair.',
    dangerZone: 'Do not only say "I disagree." Name the claim you are challenging and explain the weakness.',
    modelAnswers: [
      'While it is true that automation improves speed, I would push back against the assumption that faster decisions are always better decisions.',
      'A reasonable counterargument is that regulation may slow innovation; however, that does not justify pushing back against every safeguard.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the response as a mature counterargument using while it is true that and push back against.', 'The policy is popular, so criticism of it is unnecessary.'),
      task('task-2', 'Story reconstruction', 'Write 3-4 sentences about a debate where one person challenged a weak assumption. Use push back against.', 'Show what the assumption was and why it mattered.'),
      task('task-3', 'Sentence combining', 'Combine the ideas into a counterargument.', 'The measure saves time. It reduces oversight. That creates a serious risk.'),
    ],
    speakingPrompt: speak('Push back against the idea that efficiency should be the main goal of every organisation.', ['Use a counterargument structure', 'Use push back against', 'Include one concession', 'Give one consequence']),
  }),
  lesson(34, 'Weighing trade-offs', 'give up on', {
    structureFunction: 'Compare competing benefits and costs instead of treating choices as obvious.',
    explanation: 'Trade-off language includes on the one hand, at the expense of, the drawback is, the real question is whether, and what we gain in X we may lose in Y.',
    lexicalMeaning: 'To stop trying to achieve, support, or believe in something.',
    lexicalPattern: 'give up on + goal/person/idea/project',
    lexicalExample: 'We should not give up on the project simply because the first version failed.',
    communicativeFunction: 'You can evaluate difficult choices with nuance and avoid shallow either-or reasoning.',
    dangerZone: 'Do not use give up without on when naming the thing abandoned: "give up on the plan."',
    modelAnswers: [
      'The real trade-off is not whether we give up on innovation, but whether we accept slower progress in exchange for stronger safeguards.',
      'On the one hand, the reform is disruptive; on the other, giving up on it now would preserve a system that already fails vulnerable users.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the sentence as a nuanced trade-off using give up on.', 'The plan is difficult, but we should not stop trying.'),
      task('task-2', 'Diplomatic disagreement', 'Write 3 sentences disagreeing with someone who wants to abandon a reform after early problems.', 'Use trade-off language and give up on.'),
      task('task-3', 'Precision paraphrase', 'Turn the simple contrast into a C1-level evaluation.', 'The cheaper option saves money but gives worse results.'),
    ],
    speakingPrompt: speak('Discuss whether a difficult but promising project should be continued or abandoned.', ['Use trade-off language', 'Use give up on', 'Mention short-term and long-term consequences', 'Reach a qualified conclusion']),
  }),
  lesson(35, 'Generalizing carefully', 'stem from', {
    structureFunction: 'Make broad claims without overgeneralising or ignoring exceptions.',
    explanation: 'Careful generalization uses many, often, tend to, in many cases, may, and not necessarily. It lets you discuss patterns while respecting complexity.',
    lexicalMeaning: 'To originate from or be caused by something.',
    lexicalPattern: 'stem from + cause/problem/assumption/history',
    lexicalExample: 'The conflict stems from years of poor communication, not one bad decision.',
    communicativeFunction: 'You can explain patterns and causes without sounding dogmatic.',
    dangerZone: 'Avoid absolute claims such as "people always" or "this proves." At C1, precision often means limiting the scope of your claim.',
    modelAnswers: [
      'In many organisations, resistance to change stems from mistrust rather than laziness, although poor communication often makes both look similar.',
      'Some failures stem from technical limits, but many stem from incentives that reward appearance over substance.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the overgeneralisation. Use a careful generalizer and stem from.', 'All employees resist change because they are afraid of work.'),
      task('task-2', 'Controlled production', 'Write 3 sentences generalizing carefully about why teams avoid honest feedback. Include stem from.', 'Avoid always, never, and everyone.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus a trade-off expression from Day 34.', 'Strict rules can create fairness, but they can also create rigidity.'),
    ],
    speakingPrompt: speak('Explain what resistance to change often stems from, while avoiding stereotypes.', ['Use careful generalization', 'Use stem from', 'Recycle a trade-off expression', 'Mention one exception']),
  }),
  lesson(36, 'Clarifying and rephrasing', 'spell out', {
    structureFunction: 'Restate an idea more clearly when a point is vague, misunderstood, or too abstract.',
    explanation: 'Clarifying language includes in other words, what I mean is, to put it differently, and more precisely. It helps you make complex ideas accessible.',
    lexicalMeaning: 'To explain something clearly and in detail.',
    lexicalPattern: 'spell out + consequences/details/terms / spell out what/how/why',
    lexicalExample: 'The contract fails to spell out who is responsible for data security.',
    communicativeFunction: 'You can make your reasoning explicit and prevent vague agreement from hiding real disagreement.',
    dangerZone: 'Do not say "explain me." Say "explain it to me" or "spell out the problem."',
    modelAnswers: [
      'The proposal sounds attractive, but we need to spell out what success would actually mean in measurable terms.',
      'In other words, the disagreement is not about ambition; it is about whether the plan spells out a credible path from promise to delivery.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite so the vague idea becomes explicit. Use spell out.', 'The plan says it will improve quality, but it does not explain how.', 'OUT'),
      task('task-2', 'Constrained transformation', 'Write 3 sentences that clarify an abstract claim. Use in other words and spell out.', 'Claim: "The policy will modernise education."'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and improve its naturalness.', 'Can you explain me what the strategy spells out about risk?'),
    ],
    speakingPrompt: speak('Take a vague proposal and spell out what it would actually require in practice.', ['Use a clarifying marker', 'Use spell out', 'Define success concretely', 'Mention one hidden cost']),
  }),
  lesson(37, 'Soft disagreement', 'take issue with', {
    structureFunction: 'Challenge a claim politely while keeping the conversation open.',
    explanation: 'Soft disagreement uses frames such as I see the point, but..., I am not entirely convinced that..., and I would take issue with.... It lowers interpersonal heat without weakening the argument.',
    lexicalMeaning: 'To disagree with or object to a specific claim, assumption, or detail.',
    lexicalPattern: 'take issue with + claim/assumption/idea / take issue with the way...',
    lexicalExample: 'I take issue with the assumption that more data automatically means better decisions.',
    communicativeFunction: 'You can disagree with precision and diplomacy rather than blunt rejection.',
    dangerZone: 'Take issue with is not the same as "have an issue" in casual complaint. It means object to a specific point.',
    modelAnswers: [
      'I see why the policy appeals to managers, but I would take issue with the idea that surveillance is the same as accountability.',
      'I am not entirely convinced by the proposal, mainly because it takes too little issue with the incentives that produced the problem.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences gently disagreeing with the claim. Use take issue with.', 'If a worker is productive, monitoring software should not bother them.'),
      task('task-2', 'Forced contrast', 'Contrast what you accept with what you take issue with. Tone: diplomatic.', 'Context: a school banning phones completely.'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences to the statement. Include one concession and one precise objection.', 'Convenience is a good enough reason to automate most decisions.'),
    ],
    speakingPrompt: speak('Politely take issue with a claim that sounds reasonable at first but hides a weak assumption.', ['Use soft disagreement', 'Use take issue with', 'Name the assumption', 'Suggest a better framing']),
  }),
  lesson(38, 'Strong disagreement diplomatically', 'call out', {
    structureFunction: 'Reject a claim or behaviour clearly without sounding uncontrolled or rude.',
    explanation: 'Diplomatic strong disagreement uses firm frames such as I cannot accept the claim that..., it is misleading to suggest..., and this needs to be called out. The tone is controlled but unmistakable.',
    lexicalMeaning: 'To publicly or directly criticize something wrong, unfair, or misleading.',
    lexicalPattern: 'call out + behaviour/claim/person / call someone out for + -ing',
    lexicalExample: 'Several employees called out the company for presenting layoffs as a wellbeing measure.',
    communicativeFunction: 'You can challenge misleading reasoning with authority while maintaining professional control.',
    dangerZone: 'Call out can sound confrontational. Use it when the problem is serious enough to justify direct criticism.',
    modelAnswers: [
      'It is misleading to suggest that unpaid overtime is a sign of commitment, and that assumption should be called out more directly.',
      'I cannot accept the claim that criticism is disloyal; leaders who say that are often trying to avoid being called out.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the disagreement so it is strong but diplomatic. Use call out.', 'That argument is stupid because it blames workers for management mistakes.'),
      task('task-2', 'Story reconstruction', 'Write 3-4 sentences about a moment when someone challenged a misleading claim in a meeting.', 'Use call out and show why the intervention mattered.'),
      task('task-3', 'Sentence combining', 'Combine into a controlled criticism.', 'The company praised flexibility. It punished people who used flexible hours. Someone needed to challenge that contradiction.', 'call out'),
    ],
    speakingPrompt: speak('Explain when it is appropriate to call out a misleading claim in public rather than discuss it privately.', ['Use diplomatic strong disagreement', 'Use call out', 'Mention one risk', 'Mention one ethical reason']),
  }),
  lesson(39, 'Persuasive emphasis', 'drive home', {
    structureFunction: 'Make the central point of an argument memorable without becoming repetitive.',
    explanation: 'Persuasive emphasis uses repetition, clefting, contrast, and summary statements to make a key idea land. It should strengthen logic, not replace it.',
    lexicalMeaning: 'To make something very clear, forceful, or memorable.',
    lexicalPattern: 'drive home + point/message/lesson / drive home the fact that...',
    lexicalExample: 'The incident drove home the fact that informal safeguards were not enough.',
    communicativeFunction: 'You can persuade by making the most important implication unmistakable.',
    dangerZone: 'Do not over-repeat the same sentence. Driving a point home means sharpening it, not shouting it.',
    modelAnswers: [
      'What the failure drives home is that a fast system can still be irresponsible if nobody is accountable for its errors.',
      'The comparison with safer models drives home the point that regulation is not the enemy of innovation; poor design is.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the sentence so it persuasively emphasizes the main point. Use drive home.', 'This shows that planning is important.'),
      task('task-2', 'Precision paraphrase', 'Turn the vague claim into a forceful C1 argument in 2 sentences.', 'The mistake was bad and people should learn from it.', 'drive home'),
      task('task-3', 'Error diagnosis', 'Improve the sentence by removing repetition and strengthening emphasis.', 'This really really proves and drives home that the thing is very important.'),
    ],
    speakingPrompt: speak('Persuade a skeptical audience that a recent failure should change future decision-making.', ['Use persuasive emphasis', 'Use drive home', 'Include one contrast', 'End with a clear takeaway']),
  }),
  lesson(40, 'Framing an argument', 'set out', {
    structureFunction: 'Define the terms, scope, and logic of an argument before developing it.',
    explanation: 'Framing language includes the issue is not..., the question is whether..., I will argue that..., and this should be understood as.... It tells listeners how to interpret your point.',
    lexicalMeaning: 'To explain, describe, or arrange ideas in a clear order; also to begin with an intention.',
    lexicalPattern: 'set out + argument/plan/terms / set out to + verb',
    lexicalExample: 'The report sets out three reasons why the policy failed.',
    communicativeFunction: 'You can make complex arguments easier to follow from the first sentence.',
    dangerZone: 'Do not confuse set out an argument with set up an argument. Set out means present clearly.',
    modelAnswers: [
      'The report sets out a useful distinction: the issue is not whether reform is necessary, but whether this reform is coherent.',
      'Before defending the policy, we need to set out what problem it is meant to solve and what trade-offs it creates.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the opening of an argument. Use set out.', 'I will talk about this topic and say some things about why it is good.'),
      task('task-2', 'Controlled production', 'Write a 4-sentence argument opening. Frame the issue, set out your position, and include one concession.', 'Topic: banning smartphones in classrooms.'),
      task('task-3', 'Recycling transformation', 'Combine today\'s target with drive home from Day 39.', 'The report explains the problem clearly and makes the main lesson obvious.'),
    ],
    speakingPrompt: speak('Set out a balanced argument about whether public services should prioritise efficiency or human support.', ['Frame the issue clearly', 'Use set out', 'Recycle drive home', 'Give a balanced conclusion']),
  }),
  lesson(41, 'Advanced comparison: the more..., the more...', 'catch up with', {
    structureFunction: 'Show proportional relationships between two developing factors.',
    explanation: 'The more..., the more... expresses a parallel increase or decrease: "The more complex the system becomes, the harder it is to monitor."',
    lexicalMeaning: 'To reach the same level as someone or something; or for consequences to affect someone later.',
    lexicalPattern: 'catch up with + person/standard/trend / consequences catch up with someone',
    lexicalExample: 'The consequences of underinvestment eventually caught up with the company.',
    communicativeFunction: 'You can explain escalating pressure, delayed consequences, and comparative dynamics.',
    dangerZone: 'Keep the structure parallel: "The more X happens, the more Y happens." Do not mix it with random comparatives.',
    modelAnswers: [
      'The more the company delayed maintenance, the faster the consequences caught up with it when demand increased.',
      'The more advanced the technology becomes, the harder small institutions find it to catch up with the required expertise.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using the more..., the more... and catch up with.', 'As regulation becomes more complex, smaller firms struggle more to reach the required standard.', 'MORE'),
      task('task-2', 'Constrained transformation', 'Write one sentence showing delayed consequences. Use the more..., the more... and catch up with.', 'Context: ignoring technical debt.'),
      task('task-3', 'Error diagnosis', 'Correct the comparative structure.', 'More the team delays, more the problem catches up with them.'),
    ],
    speakingPrompt: speak('Explain how small neglected problems can catch up with an organisation over time.', ['Use the more..., the more...', 'Use catch up with', 'Give one example', 'Explain the consequence']),
  }),
  lesson(42, 'Double comparatives', 'narrow down', {
    structureFunction: 'Use paired comparative forms to express continuous change or selection.',
    explanation: 'Double comparatives include "getting harder and harder", "more and more convincing", and paired patterns that show gradual intensification.',
    lexicalMeaning: 'To reduce a list of options, causes, or possibilities to a smaller number.',
    lexicalPattern: 'narrow down + options/list/causes / narrow something down to + number',
    lexicalExample: 'The team narrowed the causes down to two likely explanations.',
    communicativeFunction: 'You can describe a process of selection, investigation, or increasing difficulty.',
    dangerZone: 'Do not say "more harder." Use either "harder and harder" or "more and more difficult."',
    modelAnswers: [
      'As the evidence became more and more specific, investigators narrowed the problem down to a flaw in the approval process.',
      'The harder the deadline became to defend, the more urgently the team needed to narrow down its priorities.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences about decision-making under uncertainty. Use a double comparative and narrow down.', 'Context: choosing between several imperfect options.'),
      task('task-2', 'Forced contrast', 'Compare a broad initial search with a focused final decision. Use more and more or harder and harder.', 'Use narrow down naturally.'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences to the statement.', 'Too many options make people less free, not more free.', 'narrow down'),
    ],
    speakingPrompt: speak('Describe how you would narrow down several possible explanations for a complex problem.', ['Use a double comparative', 'Use narrow down', 'Mention evidence', 'Explain why one option becomes stronger']),
  }),
  lesson(43, 'Approximation and vagueness', 'hover around', {
    structureFunction: 'Give approximate figures or impressions without pretending to be exact.',
    explanation: 'Approximation uses around, roughly, approximately, somewhere in the region of, or -ish in informal speech. It is useful when exactness is unavailable or unnecessary.',
    lexicalMeaning: 'To stay near a level, number, place, or state without much movement.',
    lexicalPattern: 'hover around + number/level/percentage',
    lexicalExample: 'Attendance hovered around 60 percent for most of the year.',
    communicativeFunction: 'You can discuss uncertain numbers and trends with honest precision.',
    dangerZone: 'At C1, vagueness should be purposeful. Do not use vague words because you lack vocabulary.',
    modelAnswers: [
      'The error rate hovered around five percent, which is low enough to look acceptable but high enough to create serious trust problems.',
      'Participation appears to have hovered around the same level for months, so the campaign may not have changed behaviour as much as claimed.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the report in a more natural approximate style using hover around.', 'The number of active users was 48 percent, then 51 percent, then 49 percent.'),
      task('task-2', 'Sentence combining', 'Combine the data and interpretation into two C1 sentences.', 'Satisfaction stayed near 70 percent. Complaints rose slowly. Managers still called the policy a success.', 'hover around'),
      task('task-3', 'Precision paraphrase', 'Make the sentence approximate but not vague.', 'Lots of people used the service and it was kind of stable.'),
    ],
    speakingPrompt: speak('Explain a trend where the numbers hover around a stable level but the interpretation is still debatable.', ['Use approximation', 'Use hover around', 'Mention uncertainty', 'Avoid false precision']),
  }),
  lesson(44, 'Degrees of certainty', 'pin down', {
    structureFunction: 'Express how sure you are and distinguish evidence from interpretation.',
    explanation: 'Degrees of certainty include almost certainly, probably, likely, may well, seems to, and is difficult to say. They help you calibrate claims.',
    lexicalMeaning: 'To identify, define, determine, or make something precise.',
    lexicalPattern: 'pin down + cause/meaning/date/details / be hard to pin down',
    lexicalExample: 'The exact cause is difficult to pin down without better data.',
    communicativeFunction: 'You can handle uncertainty without sounding evasive or overconfident.',
    dangerZone: 'Do not use "surely" as a neutral equivalent of probably. In English it often sounds argumentative or surprised.',
    modelAnswers: [
      'The cause is hard to pin down, but the timing strongly suggests that the pricing change played a role.',
      'We can be reasonably certain that demand has shifted, although it is too early to pin down whether the change is permanent.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the sentence with calibrated certainty and pin down.', 'We know the new policy caused the drop.'),
      task('task-2', 'Diplomatic disagreement', 'Write 3 sentences challenging an overconfident conclusion. Use likely/probably/may and pin down.', 'Context: a failed marketing campaign.'),
      task('task-3', 'Error diagnosis', 'Correct the unnatural certainty language.', 'Surely the reason is difficult to pin down, so it is for sure the manager fault.'),
    ],
    speakingPrompt: speak('Discuss a situation where the cause of a problem is difficult to pin down.', ['Use degrees of certainty', 'Use pin down', 'Separate evidence from interpretation', 'Avoid absolute claims']),
  }),
  lesson(45, 'Probability and likelihood', 'play out', {
    structureFunction: 'Talk about possible outcomes and how likely each one is.',
    explanation: 'Probability language includes likely, unlikely, a strong chance, a remote possibility, and it remains to be seen. It is useful for scenario thinking.',
    lexicalMeaning: 'To develop or unfold over time in a particular way.',
    lexicalPattern: 'play out + adverb/prepositional phrase / see how something plays out',
    lexicalExample: 'It is too early to know how the reform will play out in rural schools.',
    communicativeFunction: 'You can evaluate future scenarios without sounding either vague or overconfident.',
    dangerZone: 'Avoid saying "it is probably that." Use "it is probable that" or, more naturally, "it is likely that."',
    modelAnswers: [
      'The most likely outcome is a slow adjustment period, but it remains to be seen how the policy will play out once funding pressures increase.',
      'There is a real possibility that the conflict plays out differently if both sides are given a face-saving compromise.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the forecast. Use probability language and play out.', 'It is probably that the plan plays out bad.'),
      task('task-2', 'Controlled production', 'Write 3-4 sentences evaluating two possible outcomes. Use likely/unlikely and play out.', 'Context: introducing a four-day work week.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus pin down from Day 44.', 'We cannot identify the exact cause yet, but the result will become clearer over time.'),
    ],
    speakingPrompt: speak('Predict how a controversial change might play out over the next year.', ['Use probability language', 'Use play out', 'Recycle pin down', 'Compare two scenarios']),
  }),
  lesson(46, 'Speculation about trends', 'phase out', {
    structureFunction: 'Discuss where a trend may be heading and what might gradually disappear.',
    explanation: 'Trend speculation uses appears to be, seems likely to, may gradually, is expected to, and could eventually. It should connect evidence to cautious prediction.',
    lexicalMeaning: 'To gradually stop using, providing, or producing something.',
    lexicalPattern: 'phase out + product/service/practice / be phased out gradually',
    lexicalExample: 'Several cities are phasing out diesel buses over the next decade.',
    communicativeFunction: 'You can talk about social, technological, or institutional change with measured prediction.',
    dangerZone: 'Do not confuse phase out with fade out. Phase out is usually deliberate and managed.',
    modelAnswers: [
      'Cash payments may not disappear entirely, but they are likely to be phased out of many routine transactions.',
      'The trend suggests that repetitive administrative tasks will gradually be phased out, although human judgement will remain essential.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite as a cautious trend prediction using phase out.', 'Companies will stop using manual expense forms over time.', 'LIKELY'),
      task('task-2', 'Constrained transformation', 'Write 2 sentences speculating about a trend. Use may gradually and phase out.', 'Topic: traditional exams, office attendance, or physical bank branches.'),
      task('task-3', 'Error diagnosis', 'Correct the lexical and certainty problems.', 'For sure, schools will fade out teachers and use only AI.'),
    ],
    speakingPrompt: speak('Speculate about a practice that may be phased out over the next decade and explain what could replace it.', ['Use cautious trend language', 'Use phase out', 'Mention evidence', 'Avoid absolute predictions']),
  }),
  lesson(47, 'Future perfect', 'catch up on', {
    structureFunction: 'Look back from a future point and describe what will be completed by then.',
    explanation: 'The future perfect uses will have + past participle: "By Friday, we will have reviewed the data." It is useful for deadlines, projections, and planning.',
    lexicalMeaning: 'To do work, reading, messages, or rest that you missed or fell behind on.',
    lexicalPattern: 'catch up on + work/reading/sleep/messages',
    lexicalExample: 'By Monday, I will have caught up on the reports I missed during the conference.',
    communicativeFunction: 'You can discuss deadlines and recovery plans with clear time perspective.',
    dangerZone: 'Use by for the future reference point: "By next month, we will have finished", not "until next month."',
    modelAnswers: [
      'By the time the review begins, the team will have caught up on the missing documentation and clarified the remaining risks.',
      'If the schedule holds, we will have completed the trial by June, but we still will not have caught up on staff training.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences explaining whether a team can meet a deadline. Use future perfect and catch up on.', 'Context: a delayed audit or course project.'),
      task('task-2', 'Forced contrast', 'Contrast what will have been completed with what will still be unfinished.', 'Use by and catch up on.'),
      task('task-3', 'Discursive response', 'Respond in 4 sentences to the statement.', 'Deadlines are useful only when people have time to catch up on what they missed.'),
    ],
    speakingPrompt: speak('Explain what you will have completed by a future deadline and what you may still need to catch up on.', ['Use future perfect', 'Use catch up on', 'Mention a condition', 'Be realistic about limits']),
  }),
  lesson(48, 'Future perfect continuous', 'keep up with', {
    structureFunction: 'Emphasize the duration of an activity up to a future point.',
    explanation: 'Future perfect continuous uses will have been + -ing: "By July, we will have been testing the system for six months." It highlights ongoing effort or strain.',
    lexicalMeaning: 'To maintain the same pace, level, or awareness as something or someone.',
    lexicalPattern: 'keep up with + demand/change/work/news',
    lexicalExample: 'Small firms struggle to keep up with constant regulatory changes.',
    communicativeFunction: 'You can discuss sustained effort, pressure, and whether people can maintain pace.',
    dangerZone: 'Do not use the continuous for completed single actions. It stresses duration, not completion.',
    modelAnswers: [
      'By the end of the year, teachers will have been adapting to new assessment rules for eighteen months, and many will still be struggling to keep up with the workload.',
      'The team will have been monitoring the system for weeks before it knows whether the safeguards can keep up with real demand.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite using future perfect continuous and keep up with.', 'The team started testing in January. In July, testing will still be happening because demand keeps changing.'),
      task('task-2', 'Sentence combining', 'Combine into two C1 sentences.', 'The platform is growing. Moderators are reviewing content every day. In six months, the pressure will have lasted a year.', 'keep up with'),
      task('task-3', 'Precision paraphrase', 'Make the sentence more precise about duration.', 'By next month, we will work on this for a long time and still be behind.'),
    ],
    speakingPrompt: speak('Describe a situation where people will have been trying to keep up with change for a long time.', ['Use future perfect continuous', 'Use keep up with', 'Mention strain or sustainability', 'Explain what should change']),
  }),
  lesson(49, 'Future in the past', 'be about to', {
    structureFunction: 'Describe a future event from the perspective of a past moment.',
    explanation: 'Future in the past uses was/were going to, would, was/were about to, and was/were due to. It helps narrate expectations and near-events.',
    lexicalMeaning: 'To be on the point of doing something or very close to happening.',
    lexicalPattern: 'be about to + verb / be just about to + verb',
    lexicalExample: 'The team was about to sign the contract when the funding problem emerged.',
    communicativeFunction: 'You can tell stories where expectations changed at the last moment.',
    dangerZone: 'Be about to means very soon, not a general future plan. Do not use it for distant plans.',
    modelAnswers: [
      'The company was about to announce the merger when regulators raised concerns that would reshape the entire negotiation.',
      'We were going to approve the design, but we were about to discover that the data had been collected under unrealistic conditions.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite as a more controlled narrative using future in the past and be about to.', 'They planned to launch the app, but then they found a serious security flaw.'),
      task('task-2', 'Diplomatic disagreement', 'Use future in the past to explain why an apparently late objection was reasonable.', 'The team was close to approval, but new evidence appeared.'),
      task('task-3', 'Error diagnosis', 'Correct the future-in-the-past form.', 'The board was about to signed the agreement when the auditor called.'),
    ],
    speakingPrompt: speak('Tell a story about a decision that was about to happen when new information changed everything.', ['Use future in the past', 'Use be about to', 'Show expectation versus reality', 'Keep the timeline clear']),
  }),
  lesson(50, 'Advanced predictions', 'pan out', {
    structureFunction: 'Make nuanced predictions and evaluate whether plans are likely to succeed.',
    explanation: 'Advanced prediction combines probability, conditions, evidence, and uncertainty: "If funding holds, the plan is likely to..., but it may not..."',
    lexicalMeaning: 'To develop or turn out in a particular way, especially successfully or unsuccessfully.',
    lexicalPattern: 'pan out well/badly / see how something pans out',
    lexicalExample: 'The strategy looked promising, but it did not pan out as expected.',
    communicativeFunction: 'You can forecast outcomes without pretending the future is simple or certain.',
    dangerZone: 'Pan out is informal-neutral. It works well in speech, but a formal report may prefer develop, succeed, or prove effective.',
    modelAnswers: [
      'The plan may pan out if demand remains stable, but it is unlikely to survive a major funding cut without losing quality.',
      'I would not assume the strategy will pan out simply because the pilot was popular; pilots often hide scaling problems.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the prediction. Use probability language and pan out.', 'For sure the plan will pan out good because the pilot was nice.'),
      task('task-2', 'Controlled production', 'Write 4 sentences predicting whether a reform will work. Include one condition, one risk, and pan out.', 'Topic: a four-day work week, AI tutoring, or congestion pricing.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus future perfect from Day 47.', 'By the end of the trial, we will know whether the strategy succeeded.'),
    ],
    speakingPrompt: speak('Predict whether a promising plan will pan out once it is scaled up.', ['Use advanced prediction language', 'Use pan out', 'Recycle a future form', 'Mention a hidden risk']),
  }),
  lesson(51, 'Narrative sequencing', 'kick off', {
    structureFunction: 'Order events clearly so a story has movement, turning points, and consequences.',
    explanation: 'Narrative sequencing uses at first, initially, soon afterwards, by the time, eventually, and in the end. Strong sequencing shows why events matter.',
    lexicalMeaning: 'To begin or cause something to begin.',
    lexicalPattern: 'kick off + event/process/discussion / kick something off',
    lexicalExample: 'The announcement kicked off a difficult debate about funding priorities.',
    communicativeFunction: 'You can tell a story that moves naturally instead of listing disconnected events.',
    dangerZone: 'Kick off is common but moderately informal. In formal writing, use begin, launch, or initiate.',
    modelAnswers: [
      'The meeting kicked off with a routine update, but it quickly shifted once someone questioned the missing data.',
      'Initially, the pilot seemed minor; by the time public criticism kicked off, the team had already lost control of the narrative.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite the story opening with clearer sequencing and kick off.', 'The debate began after the report appeared. Later, several managers changed their position.', 'KICKED'),
      task('task-2', 'Constrained transformation', 'Write 3 sequenced sentences using initially, by the time, and eventually. Include kick off.', 'Context: a project that became controversial.'),
      task('task-3', 'Error diagnosis', 'Improve the flat chronology and make the sequence natural.', 'First the meeting. Then the problem. Then people angry. The argument kicked off.'),
    ],
    speakingPrompt: speak('Tell a story about a discussion or project that kicked off calmly but became more serious.', ['Use sequencing markers', 'Use kick off', 'Show a turning point', 'End with a consequence']),
  }),
  lesson(52, 'Flashbacks using past perfect', 'go back to', {
    structureFunction: 'Move backward in time inside a story without confusing the listener.',
    explanation: 'Past perfect shows an earlier past event: "The problem went back to a decision the team had made years earlier." It is useful for explaining background causes.',
    lexicalMeaning: 'To return to an earlier time, topic, place, or cause.',
    lexicalPattern: 'go back to + time/event/topic / go back to doing something',
    lexicalExample: 'The dispute goes back to a funding decision made several years ago.',
    communicativeFunction: 'You can explain that a current problem has deeper roots.',
    dangerZone: 'Do not overuse past perfect once the time relationship is clear. Use it to orient the listener, then continue naturally.',
    modelAnswers: [
      'The conflict seemed sudden, but it went back to a promise the directors had made before the restructure.',
      'When the audit began, investigators realised the problem went back to data that had been collected under different rules.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences explaining the deeper origin of a current problem. Use past perfect and go back to.', 'Context: a workplace conflict or public policy failure.'),
      task('task-2', 'Forced contrast', 'Contrast the apparent trigger with the older cause. Include go back to and one past perfect clause.', 'The immediate argument was about a budget cut, but the tension began with an earlier broken promise.'),
      task('task-3', 'Discursive response', 'Respond in 4 sentences to the statement.', 'Most crises are not sudden; they reveal problems that were already there.', 'go back to'),
    ],
    speakingPrompt: speak('Explain a conflict whose real cause went back to an earlier decision.', ['Use past perfect', 'Use go back to', 'Show trigger versus root cause', 'Keep the timeline clear']),
  }),
  lesson(53, 'Backgrounding with past continuous / past perfect continuous', 'build up to', {
    structureFunction: 'Describe ongoing background conditions that lead toward a later event.',
    explanation: 'Past continuous describes background activity; past perfect continuous shows an activity continuing before a past point: "Tension had been building up..."',
    lexicalMeaning: 'To develop gradually toward a climax, decision, or event.',
    lexicalPattern: 'build up to + event/moment/decision',
    lexicalExample: 'The campaign had been building up to a major announcement for weeks.',
    communicativeFunction: 'You can create narrative depth by showing what was happening before the visible event.',
    dangerZone: 'Use past perfect continuous for duration before a past point, not for a single completed action.',
    modelAnswers: [
      'The disagreement had been building up to that moment for months, although the meeting itself looked routine at first.',
      'While the public debate was becoming more heated, the team had been building up to a decision it was not ready to defend.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite using past perfect continuous and build up to.', 'Tension increased for weeks before the director resigned.'),
      task('task-2', 'Sentence combining', 'Combine into a controlled narrative paragraph of 3 sentences.', 'Complaints were increasing. Managers were delaying a response. The final meeting became confrontational.', 'build up to'),
      task('task-3', 'Precision paraphrase', 'Add backgrounding so the event does not sound sudden.', 'The protest happened after the announcement.'),
    ],
    speakingPrompt: speak('Tell a story about tension that had been building up to a decisive moment.', ['Use past continuous or past perfect continuous', 'Use build up to', 'Show background and climax', 'Maintain tense control']),
  }),
  lesson(54, 'Dramatic emphasis in storytelling', 'turn around', {
    structureFunction: 'Create a strong turning point or surprising contrast in a narrative.',
    explanation: 'Dramatic emphasis uses structures such as what happened next was..., little did we know..., and then, suddenly.... The goal is narrative control, not melodrama.',
    lexicalMeaning: 'To change direction, improve a bad situation, or unexpectedly say/do something in response.',
    lexicalPattern: 'turn around and say/do / turn something around / situation turns around',
    lexicalExample: 'The project turned around once the team stopped hiding the problem.',
    communicativeFunction: 'You can make stories more engaging while still sounding precise and credible.',
    dangerZone: 'In British-influenced speech, "turned around and said" can mean responded unexpectedly; do not overuse it as a filler.',
    modelAnswers: [
      'Little did we know that the client was about to turn around and question the one assumption nobody had tested.',
      'What turned the project around was not extra funding, but one uncomfortable conversation about priorities.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the flat story with dramatic but controlled emphasis. Use turn around.', 'The client asked a surprising question and the meeting changed.'),
      task('task-2', 'Diplomatic disagreement', 'Tell the turning point in 3 sentences without exaggerating. Include what happened next was and turn around.', 'A client unexpectedly challenged the data just as the team thought approval was guaranteed.'),
      task('task-3', 'Error diagnosis', 'Improve the sentence rhythm and naturalness.', 'Then he turned around and said and then the project turned around very dramatically.'),
    ],
    speakingPrompt: speak('Tell a story where one unexpected comment or decision turned a situation around.', ['Use dramatic emphasis', 'Use turn around', 'Avoid exaggeration', 'Explain why the moment mattered']),
  }),
  lesson(55, 'Describing gradual change', 'wear off', {
    structureFunction: 'Explain how a feeling, effect, or advantage slowly becomes weaker.',
    explanation: 'Gradual-change language includes gradually, over time, little by little, increasingly, and no longer. It helps you avoid abrupt, unrealistic narratives.',
    lexicalMeaning: 'To gradually disappear or lose strength.',
    lexicalPattern: 'effect/excitement/novelty wears off',
    lexicalExample: 'The initial excitement wore off once the workload increased.',
    communicativeFunction: 'You can describe slow changes in motivation, trust, attention, or impact.',
    dangerZone: 'Wear off is intransitive here: "the effect wore off", not "the effect wore off people."',
    modelAnswers: [
      'The novelty of the platform wore off after a few weeks, and users gradually became more critical of its limitations.',
      'Initial enthusiasm had worn off by the time the second phase began, which made the lack of a clear strategy much harder to hide.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the sentence. Use gradual-change language and wear off.', 'The motivation wore off the students suddenly because the course was boring.'),
      task('task-2', 'Controlled production', 'Write 3 sentences describing how enthusiasm for an initiative changed over time. Include wear off.', 'Context: a productivity app, reform, or training programme.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus build up to from Day 53.', 'Interest declined slowly before a final disappointing announcement.'),
    ],
    speakingPrompt: speak('Describe a situation where initial enthusiasm wore off and people started noticing deeper problems.', ['Use gradual-change language', 'Use wear off', 'Recycle build up to', 'Explain the consequence']),
  }),
  lesson(56, 'Describing sudden change', 'come apart', {
    structureFunction: 'Describe abrupt deterioration, collapse, or loss of control.',
    explanation: 'Sudden-change language includes all of a sudden, abruptly, almost overnight, within minutes, and from one moment to the next. Use it when the shift is genuinely sharp.',
    lexicalMeaning: 'To break into pieces physically or emotionally; to stop functioning as a coherent whole.',
    lexicalPattern: 'come apart under pressure / plan/system/team comes apart',
    lexicalExample: 'The agreement came apart as soon as the funding conditions changed.',
    communicativeFunction: 'You can explain moments when a situation stops being manageable.',
    dangerZone: 'Come apart is vivid. Do not use it for minor inconvenience unless you deliberately want dramatic effect.',
    modelAnswers: [
      'The plan came apart within hours of launch, largely because the team had treated a legal risk as a minor detail.',
      'For months the coalition looked stable; then, almost overnight, it came apart over a dispute that had been underestimated.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using sudden-change language and come apart.', 'The agreement failed very quickly when the investors changed the conditions.', 'APART'),
      task('task-2', 'Constrained transformation', 'Write 3 sentences showing a sudden collapse after a period of apparent stability. Use come apart.', 'Context: a negotiation, event, or team.'),
      task('task-3', 'Error diagnosis', 'Correct the collocation and make the sentence natural.', 'The project came aparted suddenly after one email.'),
    ],
    speakingPrompt: speak('Tell a story about a plan that looked stable and then came apart suddenly.', ['Use sudden-change language', 'Use come apart', 'Show contrast with the earlier situation', 'Explain the trigger']),
  }),
  lesson(57, 'Explaining processes', 'break down', {
    structureFunction: 'Describe how something works by separating it into stages, causes, or components.',
    explanation: 'Process explanation uses first, next, in practice, this means, and the process can be broken down into. It should make complexity clearer.',
    lexicalMeaning: 'To divide into parts for analysis; also to stop functioning.',
    lexicalPattern: 'break down + process/problem/costs / break something down into + parts',
    lexicalExample: 'The trainer broke the process down into three manageable stages.',
    communicativeFunction: 'You can explain complex systems without losing the listener.',
    dangerZone: 'Break down has several meanings. Make the intended meaning clear from context.',
    modelAnswers: [
      'The approval process can be broken down into three stages: evidence gathering, risk assessment, and public justification.',
      'When communication broke down, the team needed someone to break down the problem rather than assign blame immediately.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Explain a complex process in 4 sentences. Use sequencing and break down.', 'Topic: how a policy should be evaluated before launch.'),
      task('task-2', 'Forced contrast', 'Contrast a vague explanation with a process broken down into stages. Include break down twice with different meanings if natural.', 'A manager says "communication failed"; you need to explain exactly where the approval process stopped working.'),
      task('task-3', 'Discursive response', 'Respond to the statement in 4-5 sentences.', 'Experts are useful only if they can break down complexity for non-experts.'),
    ],
    speakingPrompt: speak('Break down a complicated decision into stages and explain where the biggest risk appears.', ['Use process markers', 'Use break down', 'Mention one failure point', 'Keep the explanation accessible']),
  }),
  lesson(58, 'Explaining failure', 'fall apart', {
    structureFunction: 'Explain why a plan, argument, or system stopped working.',
    explanation: 'Failure explanation combines cause, sequence, responsibility, and consequence. Strong answers avoid vague blame and identify the mechanism of failure.',
    lexicalMeaning: 'To collapse, fail, or stop functioning coherently.',
    lexicalPattern: 'plan/argument/system falls apart / fall apart under pressure',
    lexicalExample: 'The strategy fell apart once real users tested it.',
    communicativeFunction: 'You can analyze failure with precision rather than just saying something went wrong.',
    dangerZone: 'Fall apart is usually stronger than fail. Use it when the structure or coherence of something collapsed.',
    modelAnswers: [
      'The argument fell apart when the data showed that the supposed savings depended on unrealistic staffing assumptions.',
      'The project did not fall apart because people lacked effort; it fell apart because responsibility had never been clearly assigned.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the failure explanation with clear causality and fall apart.', 'The plan failed because nobody knew who was responsible.'),
      task('task-2', 'Story reconstruction', 'Write 4 sentences explaining how a project fell apart. Include one earlier warning and one consequence.', 'The project had strong early support, but unclear ownership and rushed testing gradually destroyed confidence.'),
      task('task-3', 'Sentence combining', 'Combine into two C1 sentences.', 'The timetable was unrealistic. The budget was vague. The team ignored warnings. The plan collapsed.', 'fall apart'),
    ],
    speakingPrompt: speak('Explain why a plan or argument fell apart under pressure.', ['Use precise cause language', 'Use fall apart', 'Mention an earlier warning', 'Avoid vague blame']),
  }),
  lesson(59, 'Explaining success', 'pay off', {
    structureFunction: 'Explain why effort, risk, or strategy produced a successful result.',
    explanation: 'Success explanation should connect investment, decision, evidence, and outcome. It is stronger when it explains why success was not accidental.',
    lexicalMeaning: 'To produce a good result after effort, risk, or investment.',
    lexicalPattern: 'strategy/effort/risk pays off / pay off in the long run',
    lexicalExample: 'The extra testing paid off when the system handled unexpected demand.',
    communicativeFunction: 'You can explain achievement without sounding vague or self-congratulatory.',
    dangerZone: 'Pay off can also mean finish paying a debt. Context controls the meaning.',
    modelAnswers: [
      'The decision to test the service with difficult users paid off because it exposed problems the team could still fix cheaply.',
      'What eventually paid off was not talent alone, but the discipline of reviewing weak assumptions before they became expensive.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the simplistic success story in a more analytical C1 style. Use pay off.', 'They worked hard and it went well.'),
      task('task-2', 'Precision paraphrase', 'Explain why a risky decision succeeded without making it sound like luck.', 'The team invested in research before launching.'),
      task('task-3', 'Error diagnosis', 'Correct the sentence and improve its logic.', 'The strategy paid off because it was successful and had success.'),
    ],
    speakingPrompt: speak('Describe a case where preparation or patience paid off in the long run.', ['Use success explanation', 'Use pay off', 'Explain the mechanism', 'Mention one risk']),
  }),
  lesson(60, 'Explaining unintended consequences', 'backfire', {
    structureFunction: 'Show how an action produced the opposite or a harmful unexpected result.',
    explanation: 'Unintended-consequence language includes ended up, inadvertently, instead of, had the opposite effect, and backfired. It links intention to outcome.',
    lexicalMeaning: 'To have the opposite of the intended effect, usually with negative consequences.',
    lexicalPattern: 'plan/strategy/comment backfires / backfire on + person/group',
    lexicalExample: 'The attempt to control criticism backfired and drew more attention to the mistake.',
    communicativeFunction: 'You can analyze why well-meant actions sometimes create worse problems.',
    dangerZone: 'Do not use backfire for any ordinary failure. It specifically means the action produces an opposite or harmful rebound effect.',
    modelAnswers: [
      'The policy was meant to restore trust, but it backfired because it made the organisation look more secretive.',
      'Their attempt to speed up approval had the opposite effect: it backfired by removing the checks that prevented costly errors.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the explanation. Use unintended-consequence language and backfire.', 'The plan backfired good because they wanted help but people got angry.'),
      task('task-2', 'Controlled production', 'Write 4 sentences about a decision that had the opposite effect from the one intended. Include backfire and ended up.', 'A company tried to stop criticism by deleting negative comments, but users reacted publicly.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus pay off from Day 59 in a contrast.', 'One strategy produced long-term benefits; another created the opposite effect.'),
    ],
    speakingPrompt: speak('Explain why a policy, apology, or strategy backfired despite good intentions.', ['Use unintended-consequence language', 'Use backfire', 'Recycle pay off', 'Identify the flawed assumption']),
  }),
  lesson(61, 'Formal register: complex noun phrases', 'draw on', {
    structureFunction: 'Build dense, precise noun phrases that carry information efficiently in formal speech or writing.',
    explanation: 'Complex noun phrases combine determiners, adjectives, prepositional phrases, and reduced clauses: "the long-term social costs of poorly regulated automation."',
    lexicalMeaning: 'To use knowledge, evidence, experience, or resources as support.',
    lexicalPattern: 'draw on + evidence/research/experience/tradition',
    lexicalExample: 'The report draws on interviews with over two hundred participants.',
    communicativeFunction: 'You can sound more formal and analytical without adding unnecessary clauses.',
    dangerZone: 'Complex noun phrases can become unreadable. Keep the head noun clear and avoid stacking modifiers blindly.',
    modelAnswers: [
      'The committee drew on a broad range of longitudinal evidence to assess the long-term educational effects of early streaming.',
      'A serious response must draw on the lived experience of affected users, not only on abstract efficiency metrics.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using a complex noun phrase and draw on.', 'The report used evidence from several interviews with workers who were affected by the change.', 'DREW'),
      task('task-2', 'Constrained transformation', 'Write one formal sentence with a complex noun phrase of at least six words and draw on.', 'Topic: policy design or education reform.'),
      task('task-3', 'Error diagnosis', 'Improve the overloaded noun phrase.', 'The big bad very complex worker problem evidence report draws on many things.'),
    ],
    speakingPrompt: speak('Explain what kinds of evidence a serious policy proposal should draw on.', ['Use one complex noun phrase', 'Use draw on', 'Keep it formal but clear', 'Mention one limitation']),
  }),
  lesson(62, 'Academic-style claims', 'put forward', {
    structureFunction: 'Present a claim cautiously and support it as part of a wider argument.',
    explanation: 'Academic claims often use this suggests that, it can be argued that, one possible explanation is, and the evidence indicates. The tone is precise and measured.',
    lexicalMeaning: 'To propose, present, or suggest an idea, argument, plan, or theory.',
    lexicalPattern: 'put forward + argument/proposal/explanation / put forward the view that...',
    lexicalExample: 'The authors put forward a cautious explanation for the unexpected results.',
    communicativeFunction: 'You can present ideas with authority while leaving room for evidence and qualification.',
    dangerZone: 'Do not overstate academic claims with "this proves." Use suggests, indicates, or supports the view that.',
    modelAnswers: [
      'The authors put forward the view that feedback quality, rather than feedback quantity, predicts long-term improvement.',
      'It can be argued that the proposal put forward by the committee addresses symptoms rather than structural causes.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 4 sentences putting forward a cautious academic claim. Include evidence language and one limitation.', 'Topic: whether AI feedback improves writing.'),
      task('task-2', 'Forced contrast', 'Contrast a strong claim with a more defensible academic claim. Use put forward.', 'Avoid "prove".'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences to the statement.', 'Education systems reward compliance more than independent thought.', 'put forward'),
    ],
    speakingPrompt: speak('Put forward a cautious explanation for why some people improve quickly in a second language while others plateau.', ['Use academic claim language', 'Use put forward', 'Mention evidence limits', 'Avoid overstatement']),
  }),
  lesson(63, 'Academic-style limitations', 'leave out', {
    structureFunction: 'Identify what a study, argument, or explanation fails to include.',
    explanation: 'Limitation language includes however, this does not account for, one limitation is, the analysis leaves out, and the findings should be interpreted cautiously.',
    lexicalMeaning: 'To omit or fail to include something.',
    lexicalPattern: 'leave out + factor/detail/group / be left out of + noun',
    lexicalExample: 'The survey left out part-time workers, which weakens its conclusions.',
    communicativeFunction: 'You can criticize evidence in a precise academic way without dismissing it entirely.',
    dangerZone: 'Do not use "let out" for omit in this context. Use leave out.',
    modelAnswers: [
      'The study is useful, but it leaves out informal workers, which makes its conclusions less generalisable.',
      'One important limitation is that the analysis leaves out the cost of training staff to use the new system.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite as an academic limitation using leave out.', 'The report is not complete because it did not include rural schools.'),
      task('task-2', 'Sentence combining', 'Combine into two formal sentences.', 'The study measured productivity. It did not measure stress. That omission changes how we interpret the results.', 'leave out'),
      task('task-3', 'Precision paraphrase', 'Make the criticism more academic and less blunt.', 'This research is bad because it forgot important people.'),
    ],
    speakingPrompt: speak('Evaluate a study or report by explaining what it usefully shows and what it leaves out.', ['Use limitation language', 'Use leave out', 'Mention one consequence', 'Stay balanced']),
  }),
  lesson(64, 'Academic-style contrast', 'run counter to', {
    structureFunction: 'Contrast findings, assumptions, or arguments in a formal analytical style.',
    explanation: 'Academic contrast uses whereas, by contrast, however, nevertheless, and run counter to. It helps you compare evidence without sounding conversational or vague.',
    lexicalMeaning: 'To conflict with or contradict something.',
    lexicalPattern: 'run counter to + assumption/evidence/principle/trend',
    lexicalExample: 'The findings run counter to the assumption that smaller classes always improve outcomes.',
    communicativeFunction: 'You can challenge assumptions using formal contrast and evidence.',
    dangerZone: 'Do not say "run contrary with." The pattern is run counter to.',
    modelAnswers: [
      'The findings run counter to the assumption that more feedback automatically leads to better performance.',
      'Whereas the policy claims to promote fairness, its effects may run counter to that aim in underfunded schools.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite in academic contrast style using run counter to.', 'The results are surprising because they disagree with what people expected.'),
      task('task-2', 'Diplomatic disagreement', 'Write 3 formal sentences challenging an assumption. Include whereas or however and run counter to.', 'Assumption: competition always improves quality.'),
      task('task-3', 'Error diagnosis', 'Correct the collocation and improve the register.', 'This data runs contrary with the idea that the programme is perfect.'),
    ],
    speakingPrompt: speak('Explain a finding that runs counter to common assumptions about learning, work, or technology.', ['Use academic contrast', 'Use run counter to', 'Mention the assumption', 'Explain the implication']),
  }),
  lesson(65, 'Academic-style implications', 'point towards', {
    structureFunction: 'Explain what evidence suggests without overstating what it proves.',
    explanation: 'Implication language includes suggests, indicates, points towards, raises the possibility that, and may imply. It connects evidence to cautious interpretation.',
    lexicalMeaning: 'To suggest, indicate, or make a conclusion seem likely.',
    lexicalPattern: 'point towards + explanation/conclusion/need/trend',
    lexicalExample: 'The results point towards a need for earlier intervention.',
    communicativeFunction: 'You can interpret evidence with nuance and avoid overclaiming.',
    dangerZone: 'Do not say "point to that we need." Use "point towards the need for..." or "suggest that..."',
    modelAnswers: [
      'The pattern points towards a deeper problem in assessment design rather than a temporary decline in student effort.',
      'Although the evidence is limited, it points towards the need for more targeted support in the first year.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the implication. Use point towards and cautious language.', 'This proves students are lazy and points to we need stricter exams.'),
      task('task-2', 'Controlled production', 'Write 4 formal sentences interpreting a small set of findings. Include one limitation and point towards.', 'Context: workplace burnout or language learning progress.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus run counter to from Day 64.', 'The evidence suggests a conclusion that conflicts with the usual assumption.'),
    ],
    speakingPrompt: speak('Interpret a piece of evidence and explain what it points towards, while avoiding overstatement.', ['Use implication language', 'Use point towards', 'Recycle run counter to', 'Mention uncertainty']),
  }),
  lesson(66, 'Abstract nouns and precision', 'tie in with', {
    structureFunction: 'Use precise abstract nouns to discuss concepts, relationships, and causes.',
    explanation: 'Abstract nouns such as credibility, accountability, feasibility, consistency, and resilience let you talk about complex ideas compactly. Precision matters more than sounding fancy.',
    lexicalMeaning: 'To connect with, relate to, or fit together with something.',
    lexicalPattern: 'tie in with + evidence/argument/theme/strategy',
    lexicalExample: 'The findings tie in with earlier research on motivation and feedback.',
    communicativeFunction: 'You can connect ideas across an argument and make relationships explicit.',
    dangerZone: 'Avoid vague abstract nouns like "things" and "aspects" when a precise noun is available.',
    modelAnswers: [
      'The issue of accountability ties in with the broader question of whether automated decisions can be meaningfully challenged.',
      'This concern ties in with feasibility, because a policy that cannot be implemented consistently will quickly lose credibility.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using two precise abstract nouns and tie in with.', 'This problem connects to whether the plan can work and whether people trust it.', 'TIES'),
      task('task-2', 'Constrained transformation', 'Write one formal sentence connecting two ideas with tie in with. Use at least one abstract noun ending in -ity, -tion, or -ness.', 'Connect transparent decision-making with public trust in a health service.'),
      task('task-3', 'Error diagnosis', 'Improve the vague abstract language.', 'This thing ties in with other aspects and stuff about the system.'),
    ],
    speakingPrompt: speak('Explain how accountability ties in with trust in an organisation or public service.', ['Use precise abstract nouns', 'Use tie in with', 'Give one concrete example', 'Avoid vague nouns']),
  }),
  lesson(67, 'Avoiding overstatement', 'tone down', {
    structureFunction: 'Make a claim more accurate, diplomatic, or defensible by reducing excessive force.',
    explanation: 'Avoiding overstatement involves replacing absolute claims with calibrated ones: often, may, appears to, in some cases, tends to. It improves credibility.',
    lexicalMeaning: 'To make language, criticism, colour, or intensity less strong.',
    lexicalPattern: 'tone down + criticism/claim/language / tone something down',
    lexicalExample: 'The final report toned down its strongest claims after peer review.',
    communicativeFunction: 'You can sound more credible by reducing claims that your evidence cannot support.',
    dangerZone: 'Toning down a claim should not make it empty. Keep the core point clear.',
    modelAnswers: [
      'I would tone down the claim that the policy failed completely and say instead that it appears to have produced uneven results.',
      'The criticism needs to be toned down if the aim is to persuade rather than simply embarrass the organisation.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences explaining why an exaggerated claim should be toned down. Use evidence-based language.', 'Claim: "Remote work destroys creativity."'),
      task('task-2', 'Forced contrast', 'Contrast a sensational version with a defensible C1 version. Use tone down.', 'Topic: AI will replace all teachers.'),
      task('task-3', 'Discursive response', 'Respond in 4 sentences.', 'Strong language is sometimes necessary to make people listen.', 'tone down'),
    ],
    speakingPrompt: speak('Take an exaggerated claim and tone it down without making it weak.', ['Use cautious language', 'Use tone down', 'Keep the core argument', 'Explain why precision helps persuasion']),
  }),
  lesson(68, 'Strengthening claims', 'back up', {
    structureFunction: 'Make a claim more convincing by adding evidence, reasoning, or examples.',
    explanation: 'Strengthening claims means moving from assertion to support: this is supported by, the evidence suggests, for example, and this is consistent with. It requires substance, not intensity.',
    lexicalMeaning: 'To support a claim, argument, person, or system with evidence or help.',
    lexicalPattern: 'back up + claim/argument/evidence / back something up with + noun',
    lexicalExample: 'The proposal is interesting, but it needs to be backed up with stronger data.',
    communicativeFunction: 'You can make your argument more persuasive without exaggerating it.',
    dangerZone: 'Do not say "back up with the claim" when the evidence supports the claim. The claim is backed up with evidence.',
    modelAnswers: [
      'The claim is plausible, but it needs to be backed up with comparative data before it can justify a national reform.',
      'If you want to argue that the programme improves confidence, back that up with evidence from students who previously struggled.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite the weak assertion as a stronger evidence-backed claim. Use back up.', 'This method is better because I think students like it.'),
      task('task-2', 'Story reconstruction', 'Write 3 sentences showing how a speaker strengthened an argument by adding evidence. Include back up.', 'A student makes a claim about feedback, then adds survey data and one concrete example.'),
      task('task-3', 'Sentence combining', 'Combine into a more persuasive claim.', 'The policy may reduce delays. The pilot showed shorter waiting times. The sample was small.', 'back up'),
    ],
    speakingPrompt: speak('Make a claim about education, technology, or work and explain what evidence would back it up.', ['Use strengthening language', 'Use back up', 'Mention evidence quality', 'Avoid overclaiming']),
  }),
  lesson(69, 'Framing evidence', 'bear out', {
    structureFunction: 'Present evidence as supporting, confirming, complicating, or weakening a claim.',
    explanation: 'Evidence framing uses phrases such as the data suggests, this is borne out by, the evidence is consistent with, and this does not necessarily show. It controls interpretation.',
    lexicalMeaning: 'To confirm, support, or show that something is true.',
    lexicalPattern: 'be borne out by + evidence/data/results / evidence bears out + claim',
    lexicalExample: 'The prediction was borne out by the follow-up study.',
    communicativeFunction: 'You can connect evidence to claims without making the relationship too loose or too strong.',
    dangerZone: 'The passive form is "borne out", not "born out."',
    modelAnswers: [
      'The claim is partly borne out by the survey data, although the interviews paint a more complicated picture.',
      'What the evidence bears out is not that the reform failed, but that its benefits were unevenly distributed.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite the evidence statement in a formal style using bear out.', 'The numbers show that the warning was right.'),
      task('task-2', 'Precision paraphrase', 'Frame the evidence carefully: it supports part of the claim but not all of it. Use borne out.', 'The programme improved attendance but did not improve exam results.'),
      task('task-3', 'Error diagnosis', 'Correct the participle and improve the claim-evidence link.', 'The argument was born out because the data was good.'),
    ],
    speakingPrompt: speak('Discuss a claim that is partly borne out by evidence but still needs qualification.', ['Use evidence-framing language', 'Use bear out/borne out', 'Mention a limitation', 'Explain the implication']),
  }),
  lesson(70, 'Challenging evidence', 'cast doubt on', {
    structureFunction: 'Question the strength, relevance, or interpretation of evidence.',
    explanation: 'Challenging evidence involves asking whether data is representative, reliable, sufficient, or causally relevant. Strong criticism targets evidence, not personalities.',
    lexicalMeaning: 'To make something seem less certain, reliable, or believable.',
    lexicalPattern: 'cast doubt on + claim/evidence/interpretation/reliability',
    lexicalExample: 'The small sample size casts doubt on the strength of the conclusion.',
    communicativeFunction: 'You can challenge weak evidence in a serious, analytical register.',
    dangerZone: 'Casting doubt is not the same as disproving. It weakens certainty; it does not automatically refute the claim.',
    modelAnswers: [
      'The absence of a control group casts doubt on the claim that the programme itself caused the improvement.',
      'These inconsistencies do not disprove the theory, but they cast enough doubt on it to justify a more cautious conclusion.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the evidence challenge. Use cast doubt on.', 'This totally destroys the study because it has some problems.'),
      task('task-2', 'Controlled production', 'Write 4 sentences challenging a piece of evidence. Include one limitation, one cautious conclusion, and cast doubt on.', 'A company claims productivity improved after surveillance software was introduced, but the sample excludes remote workers.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus bear out from Day 69.', 'Some data supports the claim, but another weakness makes it less certain.'),
    ],
    speakingPrompt: speak('Challenge a claim by explaining what casts doubt on the evidence without overstating your criticism.', ['Use evidence-challenge language', 'Use cast doubt on', 'Recycle bear out', 'Keep the tone analytical']),
  }),
  lesson(71, 'Advanced reported speech', 'bring up', {
    structureFunction: 'Report what someone said while preserving tense, stance, and nuance.',
    explanation: 'Advanced reported speech handles backshift, reporting verbs, attitude, and distance: admitted that, insisted that, warned that, claimed to have. It lets you retell complex exchanges accurately.',
    lexicalMeaning: 'To mention, raise, or introduce a topic for discussion.',
    lexicalPattern: 'bring up + topic/concern/issue / bring something up with someone',
    lexicalExample: 'She brought up the staffing issue during the review meeting.',
    communicativeFunction: 'You can report disagreement, warnings, or concerns without flattening the speaker\'s position.',
    dangerZone: 'Do not report everything with "said me." Use told me, explained that, warned that, or brought up the fact that.',
    modelAnswers: [
      'The analyst warned that the figures had been misread and brought up the possibility of a delayed effect.',
      'Several staff members said they had brought up the workload problem before, but management had treated it as a temporary inconvenience.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite as reported speech using bring up.', '"We raised this risk last month," the engineers said.', 'BROUGHT'),
      task('task-2', 'Constrained transformation', 'Report the exchange in 3 sentences. Use at least two reporting verbs and bring up.', 'A manager denied a problem; an employee mentioned evidence; another warned about consequences.'),
      task('task-3', 'Error diagnosis', 'Correct the reported speech and collocation.', 'She said me that she brought up to him the issue yesterday.'),
    ],
    speakingPrompt: speak('Report a meeting where someone brought up a concern that others had tried to avoid.', ['Use advanced reported speech', 'Use bring up', 'Use two reporting verbs', 'Keep the sequence clear']),
  }),
  lesson(72, 'Reported questions with embedded structure', 'ask around', {
    structureFunction: 'Report questions naturally inside statements without incorrect question word order.',
    explanation: 'Embedded questions use statement word order: "She asked why the data was missing", not "why was the data missing." They are common in reporting investigations and uncertainty.',
    lexicalMeaning: 'To ask several people for information or help.',
    lexicalPattern: 'ask around about + noun / ask around to see whether...',
    lexicalExample: 'I asked around to see whether anyone had noticed the same problem.',
    communicativeFunction: 'You can describe inquiry and uncertainty without sounding grammatically awkward.',
    dangerZone: 'Do not keep direct question order inside an embedded question. Say "why it failed", not "why did it fail."',
    modelAnswers: [
      'The coordinator asked around to find out whether anyone knew why the supplier had withdrawn.',
      'I asked several colleagues what the delay was about, but nobody could explain why the approval had taken so long.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences about investigating a confusing decision. Use an embedded question and ask around.', 'Context: a cancelled meeting, missing data, or sudden policy change.'),
      task('task-2', 'Forced contrast', 'Contrast a direct question with a reported embedded question. Include ask around.', 'Question: "Why did the project lose funding?"'),
      task('task-3', 'Discursive response', 'Respond in 4 sentences.', 'Informal questions often reveal problems that official reports miss.', 'ask around'),
    ],
    speakingPrompt: speak('Describe a situation where you had to ask around to find out what had really happened.', ['Use reported questions', 'Use ask around', 'Avoid question word order errors', 'Explain what you discovered']),
  }),
  lesson(73, 'Reporting disagreement', 'push back', {
    structureFunction: 'Report disagreement using precise verbs and structures instead of repeating direct speech.',
    explanation: 'Reporting disagreement uses verbs such as objected, challenged, rejected, questioned, pushed back, and took issue with. It captures stance and intensity.',
    lexicalMeaning: 'To resist, challenge, or question an idea, decision, or pressure.',
    lexicalPattern: 'push back against/on + claim/decision / push back when...',
    lexicalExample: 'The researchers pushed back when officials simplified the findings.',
    communicativeFunction: 'You can narrate disagreement with nuance and avoid "he said/she said" monotony.',
    dangerZone: 'Do not report all disagreement as "he told no." Use precise reporting verbs.',
    modelAnswers: [
      'The engineers pushed back against the deadline, arguing that the safety checks had not been completed.',
      'She questioned whether the target was realistic and pushed back when the board presented caution as negativity.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Report the disagreement in 3 sentences using two reporting verbs and push back.', '"This deadline is impossible," the engineer said. "You are being negative," the director replied.'),
      task('task-2', 'Story reconstruction', 'Tell a short meeting story where someone pushed back against a weak claim. Use reported speech.', 'A director claimed the deadline was realistic; an engineer challenged the assumption and explained the safety risk.'),
      task('task-3', 'Sentence combining', 'Combine the exchange into one C1 sentence.', 'The team objected. The manager had ignored testing time. They challenged the schedule.', 'push back'),
    ],
    speakingPrompt: speak('Report a disagreement in which one person pushed back against pressure to accept a bad decision.', ['Use reporting verbs', 'Use push back', 'Show both sides', 'Keep the report neutral']),
  }),
  lesson(74, 'Reporting uncertainty', 'hedge against', {
    structureFunction: 'Report uncertainty, caution, and risk management in a sophisticated way.',
    explanation: 'Reporting uncertainty uses verbs and frames such as suggested, appeared unsure, warned that, expressed concern, and could not confirm whether. It avoids false certainty.',
    lexicalMeaning: 'To protect against a possible risk or loss.',
    lexicalPattern: 'hedge against + risk/loss/uncertainty / hedge by + -ing',
    lexicalExample: 'The company hedged against supply risks by diversifying its suppliers.',
    communicativeFunction: 'You can report cautious positions and explain protective strategies.',
    dangerZone: 'Hedge can mean cautious language or risk protection. Make the meaning clear from context.',
    modelAnswers: [
      'The analysts said they could not confirm whether demand would recover, so they recommended hedging against a further decline.',
      'Management appeared uncertain about the forecast and hedged against that risk by delaying the expansion.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Report the uncertainty more precisely using hedge against.', 'They were not sure what would happen, so they made a backup plan.'),
      task('task-2', 'Precision paraphrase', 'Rewrite in 3 formal sentences. Include one reported uncertain claim and one protective action.', 'A company faces currency risk before an international launch.'),
      task('task-3', 'Error diagnosis', 'Correct the reporting and preposition.', 'They said they were unsure and hedged with the risk by cancelling everything.'),
    ],
    speakingPrompt: speak('Report how a team handled uncertainty and what risk it tried to hedge against.', ['Use reporting uncertainty', 'Use hedge against', 'Mention a protective action', 'Avoid false certainty']),
  }),
  lesson(75, 'Reporting criticism', 'call into question', {
    structureFunction: 'Report criticism in a formal way that focuses on implications, credibility, or validity.',
    explanation: 'Reporting criticism uses verbs such as argued, claimed, warned, criticised, questioned, and called into question. It can be direct without being crude.',
    lexicalMeaning: 'To raise doubts about the truth, quality, reliability, or legitimacy of something.',
    lexicalPattern: 'call into question + reliability/validity/credibility/assumption',
    lexicalExample: 'The missing records call into question the reliability of the audit.',
    communicativeFunction: 'You can report serious criticism while maintaining analytical distance.',
    dangerZone: 'Do not say "call in question"; the fixed phrase is call into question.',
    modelAnswers: [
      'The auditors argued that the missing documents called into question the reliability of the entire review.',
      'Several researchers criticised the sample design, saying it called into question the study\'s broader conclusions.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the reported criticism. Use call into question.', 'The critics said the report calls in question because the data is bad.'),
      task('task-2', 'Controlled production', 'Write 4 sentences reporting criticism of a study, policy, or company statement. Include call into question and one limitation.', 'A report claims a training programme succeeded, but it excluded the employees who dropped out early.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus hedge against from Day 74.', 'The uncertain forecast created doubts, so the company protected itself from risk.'),
    ],
    speakingPrompt: speak('Report criticism that calls into question the credibility of a decision or piece of evidence.', ['Use reporting criticism', 'Use call into question', 'Recycle hedge against', 'Keep the tone formal']),
  }),
  lesson(76, 'Reporting intentions', 'set out to', {
    structureFunction: 'Explain what someone intended to do and compare intention with outcome.',
    explanation: 'Reporting intentions uses intended to, aimed to, sought to, set out to, hoped to, and was designed to. It is especially useful when outcomes differ from intentions.',
    lexicalMeaning: 'To start with the intention or purpose of doing something.',
    lexicalPattern: 'set out to + verb / set out with the aim of + -ing',
    lexicalExample: 'The programme set out to reduce inequality but struggled with implementation.',
    communicativeFunction: 'You can compare stated aims with actual effects in a fair and analytical way.',
    dangerZone: 'Do not use set out to for an accidental result. It refers to intention at the start.',
    modelAnswers: [
      'The policy set out to simplify access to support, but users reported that the new system was harder to navigate.',
      'The founders said they had set out to democratise education, although their pricing model later limited access.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using reported intention and set out to.', 'The charity said its original aim was to make legal advice easier to access.', 'SET'),
      task('task-2', 'Constrained transformation', 'Write 3 sentences comparing intention and outcome. Use set out to and one contrast marker.', 'Context: a reform that created extra bureaucracy.'),
      task('task-3', 'Error diagnosis', 'Correct the structure and clarify intention versus result.', 'The scheme set out reducing costs but accidentally increased them.'),
    ],
    speakingPrompt: speak('Explain a project that set out to solve one problem but produced a more complicated outcome.', ['Use reporting intentions', 'Use set out to', 'Compare aim and result', 'Mention one unintended consequence']),
  }),
  lesson(77, 'Reporting failed plans', 'fall short of', {
    structureFunction: 'Report when outcomes did not meet expectations, promises, standards, or targets.',
    explanation: 'Failed-plan reporting uses failed to, was unable to, did not manage to, fell short of, and proved insufficient. It should specify the standard missed.',
    lexicalMeaning: 'To fail to reach a standard, target, expectation, or amount.',
    lexicalPattern: 'fall short of + target/expectations/standard/what was promised',
    lexicalExample: 'The final proposal fell short of what residents had been promised.',
    communicativeFunction: 'You can criticize results precisely without exaggerating failure.',
    dangerZone: 'Do not say "fall short from." The pattern is fall short of.',
    modelAnswers: [
      'The review concluded that the scheme had fallen short of its stated aim of reaching low-income families.',
      'Although the team delivered a working prototype, it fell short of the reliability standard required for public release.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 3-4 sentences evaluating a plan that partly succeeded but fell short of expectations.', 'Context: a training programme, app launch, or public reform.'),
      task('task-2', 'Forced contrast', 'Contrast partial success with failure to meet the original standard. Use fall short of.', 'Avoid saying it was simply good or bad.'),
      task('task-3', 'Discursive response', 'Respond in 4 sentences.', 'A plan can be useful even if it falls short of its original promise.'),
    ],
    speakingPrompt: speak('Evaluate a project that achieved something but still fell short of what had been promised.', ['Use failed-plan reporting', 'Use fall short of', 'Include one concession', 'Name the standard']),
  }),
  lesson(78, 'Reporting pressure or obligation', 'give in to', {
    structureFunction: 'Report external pressure, internal obligation, and decisions made under constraint.',
    explanation: 'Pressure reporting uses was pressured to, felt compelled to, was expected to, had little choice but to, and gave in to pressure. It clarifies agency.',
    lexicalMeaning: 'To stop resisting pressure, temptation, demands, or persuasion.',
    lexicalPattern: 'give in to + pressure/demands/temptation',
    lexicalExample: 'The council gave in to pressure and delayed the vote.',
    communicativeFunction: 'You can explain constrained decisions without pretending they were fully free.',
    dangerZone: 'Give in is not the same as give up. Give in means yield to pressure; give up means stop trying.',
    modelAnswers: [
      'The minister was pressured to act quickly and eventually gave in to demands for a public inquiry.',
      'Staff said they had given in to unrealistic deadlines because refusing them was treated as a lack of commitment.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Report the pressure and decision in 3 sentences. Use give in to.', 'A team accepted a deadline it considered unrealistic because senior leaders insisted.'),
      task('task-2', 'Story reconstruction', 'Tell a short story where someone resisted pressure at first but later gave in. Show why.', 'A junior analyst initially refused to approve weak figures, then senior managers increased pressure before a board meeting.'),
      task('task-3', 'Sentence combining', 'Combine into a nuanced sentence.', 'The school faced complaints. It changed the policy quickly. The decision was not entirely voluntary.', 'gave in to'),
    ],
    speakingPrompt: speak('Report a decision made under pressure and evaluate whether giving in was justified.', ['Use pressure/obligation reporting', 'Use give in to', 'Explain agency', 'Mention one alternative']),
  }),
  lesson(79, 'Reporting persuasion', 'talk someone into', {
    structureFunction: 'Report how someone was persuaded, convinced, pressured, or encouraged to act.',
    explanation: 'Persuasion reporting uses persuaded, convinced, talked someone into, encouraged, urged, and warned. It should show the reason or pressure behind the change.',
    lexicalMeaning: 'To persuade someone to do something.',
    lexicalPattern: 'talk someone into + -ing / talk someone into + noun',
    lexicalExample: 'The consultant talked the board into delaying the launch.',
    communicativeFunction: 'You can describe influence and persuasion without losing the relationship between speaker, argument, and action.',
    dangerZone: 'Use an object: talk someone into doing something. Do not say "talk into to do."',
    modelAnswers: [
      'The finance director talked the board into postponing the expansion by showing how fragile the revenue forecast was.',
      'She later admitted that she had been talked into accepting a role whose risks had not been fully explained.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Report the persuasion more naturally using talk someone into.', 'He convinced them that they should wait before launching.'),
      task('task-2', 'Diplomatic disagreement', 'Write 3 sentences reporting persuasion that may have crossed into pressure. Use talked into.', 'Context: a junior employee accepting extra work.'),
      task('task-3', 'Error diagnosis', 'Correct the object and verb pattern.', 'The manager talked into the team to accept working late.'),
    ],
    speakingPrompt: speak('Report a situation where someone was talked into a decision they were not initially comfortable with.', ['Use reporting persuasion', 'Use talk someone into', 'Mention the argument used', 'Evaluate whether it was fair']),
  }),
  lesson(80, 'Reporting avoidance', 'get around to', {
    structureFunction: 'Report delayed, avoided, or postponed actions with clear stance.',
    explanation: 'Avoidance reporting uses delayed, postponed, avoided, failed to, kept putting off, and eventually got around to. It often implies criticism or frustration.',
    lexicalMeaning: 'To finally do something after intending, delaying, or postponing it.',
    lexicalPattern: 'get around to + -ing / never get around to + -ing',
    lexicalExample: 'The department never got around to updating the guidance.',
    communicativeFunction: 'You can report procrastination or avoidance without sounding vague.',
    dangerZone: 'Use -ing after get around to: "got around to reviewing", not "got around to review."',
    modelAnswers: [
      'The department admitted that it had never got around to reviewing the policy after the first complaints arrived.',
      'By the time managers finally got around to addressing the issue, staff had already lost confidence in the process.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the avoidance report. Use get around to.', 'They did not get around to review the safety rules and then problems happened.'),
      task('task-2', 'Controlled production', 'Write 4 sentences reporting an avoided task and its consequence. Include one passive reporting structure from Day 15.', 'A department delayed reviewing safety guidance until a complaint made the issue public.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus talked into from Day 79.', 'The team was persuaded to accept a deadline before anyone finally reviewed the risks.'),
    ],
    speakingPrompt: speak('Report a situation where someone failed to get around to an important task until it was too late.', ['Use reporting avoidance', 'Use get around to + -ing', 'Recycle talked into', 'Explain the consequence']),
  }),
  lesson(81, 'Review: inversion + modal perfects', 'boil down to / turn out', {
    structureFunction: 'Combine emphatic word order with careful speculation about past evidence.',
    explanation: 'This review brings together negative-adverbial inversion and modal perfects. Use inversion for emphasis and modal perfects to reason cautiously about past causes.',
    lexicalMeaning: 'Boil down to identifies the core issue; turn out describes what proved to be true or how events developed.',
    lexicalPattern: 'boil down to + whether-clause / turn out to be + adjective/noun',
    lexicalExample: 'The dispute boiled down to trust, and the warning turned out to be accurate.',
    communicativeFunction: 'You can emphasize the real issue while speculating responsibly about what happened.',
    dangerZone: 'Do not sacrifice grammar under review pressure. Inversion still needs auxiliary-subject order; modal perfects still need have + past participle.',
    modelAnswers: [
      'Only after the audit did it become clear that the disagreement boiled down to trust, and the missing records may have turned out to be more important than anyone expected.',
      'Rarely has a minor technical issue turned out to reveal so much about what the organisation really boils down to: accountability.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite using inversion, a modal perfect, and turn out.', 'We only realised later that the warning was probably accurate.', 'ONLY'),
      task('task-2', 'Mixed correction', 'Correct the sentence and upgrade it to C1.', 'Not until the report came out we understood what the problem might of turned out to be.'),
      task('task-3', 'Controlled production', 'Write 3 sentences explaining what a failed project really boiled down to. Include one modal perfect.', 'A digital service launched late, confused users, and revealed a deeper accountability problem.'),
    ],
    speakingPrompt: speak('Analyze a failure whose real cause only became clear later.', ['Use inversion', 'Use one modal perfect', 'Use boil down to or turn out', 'Recycle one contrast marker']),
  }),
  lesson(82, 'Review: conditionals + regret', 'end up / miss out on', {
    structureFunction: 'Connect unreal alternatives, regret, and outcomes across time.',
    explanation: 'This review combines mixed conditionals, third conditionals, and wish/if only forms. Focus on time control and clear consequence.',
    lexicalMeaning: 'End up describes the final result; miss out on describes a lost opportunity or benefit.',
    lexicalPattern: 'end up + -ing / miss out on + opportunity/benefit',
    lexicalExample: 'If we had acted earlier, we might not have ended up missing out on the funding.',
    communicativeFunction: 'You can explain regret and consequence without sounding vague or melodramatic.',
    dangerZone: 'Keep time frames clear. If the cause is past and the result is present, use a mixed conditional; if both are past, use a third conditional.',
    modelAnswers: [
      'If the team had applied earlier, it would not be struggling now and might not have ended up missing out on the grant.',
      'I wish we had taken the warning seriously; by delaying, we ended up missing out on the easiest chance to fix the problem.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 4 sentences about a missed opportunity. Use one conditional, one regret form, and miss out on.', 'A research team delayed applying for funding and lost access to a major international partner.'),
      task('task-2', 'Forced contrast', 'Contrast what happened with what could have happened. Use end up and one unreal conditional.', 'The organisation chose a cheap short-term fix instead of training people properly.'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences.', 'Regret is useful only if it changes future decisions.'),
    ],
    speakingPrompt: speak('Discuss a past choice that led someone to end up missing out on a valuable opportunity.', ['Use conditionals', 'Use a regret form', 'Use end up or miss out on', 'Explain a future lesson']),
  }),
  lesson(83, 'Review: concession + contrast', 'push back / rule out', {
    structureFunction: 'Balance opposing ideas while refusing weak conclusions.',
    explanation: 'This review combines concession clauses, whereas/while, nonetheless, and controlled disagreement. Use them to hold two ideas in tension.',
    lexicalMeaning: 'Push back means challenge; rule out means exclude a possibility.',
    lexicalPattern: 'push back against + claim / rule out + possibility',
    lexicalExample: 'Much as I understand the concern, I would not rule out a trial before reviewing the evidence.',
    communicativeFunction: 'You can challenge claims while sounding fair, nuanced, and strategically flexible.',
    dangerZone: 'Do not combine although with but, and do not say "rule out it." Use "rule it out" or "rule out the possibility."',
    modelAnswers: [
      'Much as I understand the anxiety around automation, I would push back against ruling out every tool before testing its actual effects.',
      'Whereas one side treats the policy as reckless, the other sees it as overdue; nonetheless, neither side should rule out a limited pilot.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite a debate summary using concession, contrast, push back, and rule out.', 'One group fears the reform. Another thinks delay is more dangerous.'),
      task('task-2', 'Story reconstruction', 'Write 4 sentences reporting a meeting where someone pushed back without ruling out compromise.', 'A team debated whether to adopt a controversial AI tool after a pilot produced mixed results.'),
      task('task-3', 'Sentence combining', 'Combine into two C1 sentences.', 'The proposal is risky. The alternative is stagnation. A pilot may still be possible.'),
    ],
    speakingPrompt: speak('Discuss a controversial proposal you would push back against without ruling out entirely.', ['Use concession', 'Use contrast', 'Use push back and rule out', 'Reach a qualified position']),
  }),
  lesson(84, 'Review: passive voice + nominalization', 'carry out / account for', {
    structureFunction: 'Use formal structures to discuss processes, responsibility, evidence, and explanation.',
    explanation: 'This review combines modal passives, passive reporting, causative/passive forms, and nominalization. The goal is formal clarity, not evasiveness.',
    lexicalMeaning: 'Carry out means perform or conduct; account for means explain or take into consideration.',
    lexicalPattern: 'be carried out / carry out research / account for + result/risk',
    lexicalExample: 'A review should be carried out to account for the unexpected variation in outcomes.',
    communicativeFunction: 'You can write or speak in a formal analytical register about investigations and causes.',
    dangerZone: 'Passive voice should not hide responsibility when responsibility matters. Use it to focus attention, not to dodge blame.',
    modelAnswers: [
      'A more rigorous evaluation should be carried out before the results are used to account for national trends.',
      'The failure of implementation cannot be accounted for by funding alone; several oversight errors were carried out at senior level.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite formally using a modal passive, nominalization, carry out, and account for.', 'They need to check the policy properly because the results are confusing.'),
      task('task-2', 'Precision paraphrase', 'Explain the limitation of an investigation in two formal sentences.', 'The review did not consider regional differences.'),
      task('task-3', 'Error diagnosis', 'Correct the passive/modal and preposition errors.', 'A study must carried out to account the difference.'),
    ],
    speakingPrompt: speak('Explain what kind of investigation should be carried out to account for a surprising result.', ['Use passive voice', 'Use nominalization', 'Use carry out and account for', 'Mention one limitation']),
  }),
  lesson(85, 'Review: argumentation + counterargument', 'take issue with / drive home', {
    structureFunction: 'Build a mature argument, respond to opposition, and make the central point memorable.',
    explanation: 'This review combines discourse markers, counterargument, soft disagreement, and persuasive emphasis. Focus on logical movement.',
    lexicalMeaning: 'Take issue with means object to a specific claim; drive home means make a point clear and forceful.',
    lexicalPattern: 'take issue with + claim / drive home + point/fact/lesson',
    lexicalExample: 'I take issue with that assumption, and the evidence drives home why it matters.',
    communicativeFunction: 'You can disagree, develop reasoning, and finish with a clear persuasive takeaway.',
    dangerZone: 'Do not replace reasoning with intensity. Drive the point home by improving the logic, not by repeating yourself.',
    modelAnswers: [
      'I take issue with the claim that speed is neutral; the failure drives home how quickly efficiency becomes dangerous without accountability.',
      'Admittedly, the reform is imperfect, but that does not undermine the point it drives home: the current system is already failing.',
    ],
    tasks: [
      task('task-1', 'Mixed correction', 'Correct and upgrade the argument. Use take issue with and drive home.', 'I disagree with this because it is bad and this proves my point very much.'),
      task('task-2', 'Controlled production', 'Write a 5-sentence argument with one concession, one counterargument, and a final sentence that drives home your point.', 'Argue that speed should not be treated as the main measure of quality in creative or strategic work.'),
      task('task-3', 'Recycling transformation', 'Use today\'s target plus spell out from Day 36.', 'Explain clearly why you object to the central assumption.'),
    ],
    speakingPrompt: speak('Take issue with a popular but weak claim and drive home a stronger alternative view.', ['Use argument markers', 'Use take issue with', 'Use drive home', 'Recycle spell out']),
  }),
  lesson(86, 'Review: storytelling + consequence', 'build up to / backfire', {
    structureFunction: 'Tell a story where pressure develops and a decision produces an unintended result.',
    explanation: 'This review combines narrative sequencing, backgrounding, gradual change, sudden change, and unintended consequence. Focus on chronology and causality.',
    lexicalMeaning: 'Build up to means develop gradually toward a moment; backfire means produce the opposite of the intended result.',
    lexicalPattern: 'build up to + event / strategy backfires',
    lexicalExample: 'The pressure built up to a public apology that then backfired.',
    communicativeFunction: 'You can narrate complex failures where the outcome was not simply accidental.',
    dangerZone: 'Do not list events without showing causality. The listener needs to understand why the outcome happened.',
    modelAnswers: [
      'The tension had been building up to a public confrontation for weeks, and the attempt to control the message backfired immediately.',
      'What looked like a minor communication problem built up to a credibility crisis when the apology backfired online.',
    ],
    tasks: [
      task('task-1', 'Key word transformation', 'Rewrite as a controlled narrative using build up to and backfire.', 'Pressure increased for weeks, and the final announcement had the opposite effect.', 'BACKFIRED'),
      task('task-2', 'Constrained transformation', 'Write a 4-sentence story. Include backgrounding, a turning point, build up to, and backfire.', 'A public apology was meant to calm criticism but made the organisation look more evasive.'),
      task('task-3', 'Error diagnosis', 'Improve the flat storytelling and tense control.', 'There was pressure, then apology, it backfires, people angry.'),
    ],
    speakingPrompt: speak('Tell a story about pressure that built up to a decision which then backfired.', ['Use narrative sequencing', 'Use build up to', 'Use backfire', 'Explain the flawed assumption']),
  }),
  lesson(87, 'Review: academic claims + evidence', 'put forward / bear out', {
    structureFunction: 'Present a cautious claim and evaluate how well the evidence supports it.',
    explanation: 'This review combines academic-style claims, limitations, evidence framing, and implication language. The focus is measured interpretation.',
    lexicalMeaning: 'Put forward means propose a claim; bear out means confirm or support it.',
    lexicalPattern: 'put forward + argument / be borne out by + evidence',
    lexicalExample: 'The hypothesis put forward by the authors is partly borne out by the interviews.',
    communicativeFunction: 'You can make evidence-based claims without overstating what the data shows.',
    dangerZone: 'Do not treat partial support as proof. Evidence can bear out part of a claim while leaving major questions open.',
    modelAnswers: [
      'The authors put forward a persuasive explanation, but it is only partly borne out by the available data.',
      'What the interviews bear out is the need for support, not necessarily the broader theory put forward in the report.',
    ],
    tasks: [
      task('task-1', 'Mini argument', 'Write 4 formal sentences putting forward a claim and explaining whether evidence bears it out. Include one limitation.', 'Topic: whether frequent feedback improves long-term language development.'),
      task('task-2', 'Forced contrast', 'Contrast a claim that is fully supported with one that is only partly borne out. Use put forward.', 'Compare a narrow finding about attendance with a broader claim about educational quality.'),
      task('task-3', 'Discursive response', 'Respond in 4-5 sentences.', 'Evidence is useful only when its limitations are made explicit.'),
    ],
    speakingPrompt: speak('Put forward a cautious claim and explain what kind of evidence would bear it out.', ['Use academic claim language', 'Use put forward', 'Use bear out/borne out', 'Mention limitations']),
  }),
  lesson(88, 'Review: speculation + future forms', 'pan out / play out', {
    structureFunction: 'Speculate about future outcomes while controlling certainty, time, and conditions.',
    explanation: 'This review combines degrees of certainty, trend speculation, future perfect, future perfect continuous, and advanced prediction.',
    lexicalMeaning: 'Pan out means develop successfully or not; play out means unfold over time.',
    lexicalPattern: 'see how it plays out / pan out as expected',
    lexicalExample: 'By next year, we will know how the strategy has played out and whether it has panned out.',
    communicativeFunction: 'You can forecast scenarios with careful timing and probability.',
    dangerZone: 'Avoid confident predictions without conditions. C1 forecasting usually includes likelihood, evidence, and risk.',
    modelAnswers: [
      'By the end of the trial, we will have seen how the policy plays out under pressure and whether the optimistic forecast pans out.',
      'It is unlikely to pan out exactly as planned, but the next six months will show which risks play out in practice.',
    ],
    tasks: [
      task('task-1', 'Narrative transformation', 'Rewrite as an advanced prediction using a future perfect form, pan out, and play out.', 'After the trial, we will know whether the plan worked.'),
      task('task-2', 'Story reconstruction', 'Write 4 sentences comparing two future scenarios. Include one condition and one probability marker.', 'Scenario: a city expands a transport reform after a promising but limited pilot.'),
      task('task-3', 'Sentence combining', 'Combine into a nuanced forecast.', 'The pilot is promising. Scaling may create problems. The outcome is still uncertain.', 'pan out / play out'),
    ],
    speakingPrompt: speak('Predict how a reform may play out over the next year and whether it is likely to pan out.', ['Use future forms', 'Use probability language', 'Use pan out and play out', 'Mention one condition']),
  }),
  lesson(89, 'Review: disagreement + persuasion', 'call out / talk someone into', {
    structureFunction: 'Report persuasion and challenge misleading reasoning with controlled force.',
    explanation: 'This review combines soft disagreement, strong diplomatic disagreement, reported persuasion, and reporting pressure. Focus on stance and tone.',
    lexicalMeaning: 'Call out means criticize directly; talk someone into means persuade someone to act.',
    lexicalPattern: 'call out + claim/behaviour / talk someone into + -ing',
    lexicalExample: 'She called out the weak assumption before anyone could talk the team into accepting it.',
    communicativeFunction: 'You can report influence, pressure, and disagreement without losing nuance.',
    dangerZone: 'Call out can be too confrontational if the situation is minor. Talk someone into requires an object and an -ing verb.',
    modelAnswers: [
      'The analyst called out the unrealistic forecast before the sales team could talk the board into approving the expansion.',
      'I would call out the pressure tactic, especially if a junior employee had been talked into accepting responsibility without authority.',
    ],
    tasks: [
      task('task-1', 'Register upgrade', 'Rewrite as a controlled report of persuasion and disagreement. Use call out and talk someone into.', 'They convinced the team to accept a bad plan, and one person said it was wrong.'),
      task('task-2', 'Diplomatic disagreement', 'Write 4 sentences calling out a misleading argument without sounding aggressive. Include talked into.', 'A manager framed unpaid overtime as "team spirit" and persuaded several junior employees to accept it.'),
      task('task-3', 'Error diagnosis', 'Correct the patterns.', 'The manager talked into them to work late and nobody called out about it.'),
    ],
    speakingPrompt: speak('Report a situation where someone was talked into a poor decision and another person had to call it out.', ['Use reported persuasion', 'Use strong diplomatic disagreement', 'Use call out and talk someone into', 'Evaluate fairness']),
  }),
  lesson(90, 'Final C1 test: integrated grammar and lexical control', '10 advanced lexical chunks from the cycle', {
    structureFunction: 'Demonstrate flexible control of the full 90-day cycle under pressure.',
    explanation: 'This final lesson asks you to integrate at least 10 advanced grammar structures and 10 lexical chunks from the cycle in one coherent argument or monologue.',
    lexicalMeaning: 'A review set drawn from the full cycle: boil down to, rule out, account for, backfire, bear out, cast doubt on, set out, drive home, pan out, and fall short of.',
    lexicalPattern: 'Use each chunk naturally inside argument, narrative, evidence, or prediction.',
    lexicalExample: 'The final answer should not simply list items; it should use them to build a coherent position.',
    communicativeFunction: 'You can prove that the grammar and lexical items are active tools for real communication, not isolated knowledge.',
    dangerZone: 'The main danger is checklist English: forcing structures into unnatural places. Control, coherence, and naturalness matter more than cramming.',
    modelAnswers: [
      'What the debate ultimately boils down to is whether institutions can innovate without letting accountability fall short of their promises.',
      'Had the risks been laid out earlier, the policy might not have backfired so publicly, and the evidence would have done more to bear out the original claim.',
    ],
    tasks: [
      task('task-1', 'Final mixed transformation', 'Rewrite the argument using at least four structures from the cycle and four lexical chunks. Preserve the meaning but upgrade the control.', 'The policy looked good at first, but it failed because leaders ignored evidence, rushed the launch, and did not explain the risks.'),
      task('task-2', 'Integrated correction', 'Correct and upgrade the paragraph. Remove unnatural phrasing and add C1-level linking.', 'If they would have checked the data, the plan did not backfire. But nobody explained the issue and the evidence born out nothing.'),
      task('task-3', 'Controlled production', 'Write 6-8 sentences evaluating a difficult decision. Use at least six grammar structures and six lexical chunks from the cycle. Keep it coherent.', 'Evaluate whether a company should continue a risky product launch after early evidence suggests it may damage user trust.'),
    ],
    speakingPrompt: {
      ...speak('Final test: deliver a 3-minute monologue about a decision, policy, or project that looked promising but produced complicated consequences.', ['Use at least 10 grammar structures', 'Use at least 10 lexical chunks', 'Include argument, evidence, narrative, and prediction', 'Do not sound like a checklist'], 'Speak for about 3 minutes. Your goal is integrated control, not speed.'),
      durationLabel: '3-minute final test',
    },
  }),
]

const recyclingPrompts = [
  'The team avoided the uncomfortable issue, so the plan became weaker.',
  'The evidence looked persuasive at first, but the interpretation was too simple.',
  'A short-term saving created a longer-term credibility problem.',
  'The public explanation sounded confident, but several details were still unclear.',
  'The decision was presented as practical, although the real trade-off was never discussed.',
]

function recyclingSourceDay(day: number, typeCode: TypeCode) {
  if (day === 1) return 1
  if (day <= 4) return 1
  return day - (typeCode === 'E' ? 4 : 3)
}

function makeRecyclingChallenge(seed: LessonSeed, source: LessonSeed, typeCode: TypeCode): Lesson['recyclingChallenge'] {
  const isCentral = typeCode === 'E'
  const prompt = recyclingPrompts[(seed.day - 1) % recyclingPrompts.length]

  if (seed.day === 1) {
    return {
      source: 'Baseline retrieval',
      target: `${seed.targetStructure} + ${seed.targetLexicalItem}`,
      instruction: 'Use today\'s target once more in one precise C1 sentence. The point is retrieval, not length.',
      prompt,
    }
  }

  return {
    source: `Recycle Day ${source.day}`,
    target: `${source.targetStructure} + ${source.targetLexicalItem}`,
    instruction: isCentral
      ? `Central recycling: combine today's ${seed.targetStructure} and "${seed.targetLexicalItem}" with Day ${source.day}'s language. Keep it to two polished C1 sentences.`
      : `Short retrieval: reuse Day ${source.day}'s language in one precise C1 sentence, then stop.`,
    prompt,
  }
}

function requiredLexicalItem(seed: LessonSeed) {
  return seed.targetLexicalItem.length <= 32 ? seed.targetLexicalItem : undefined
}

function makeExtraTasks(seed: LessonSeed, source: LessonSeed, typeCode: TypeCode): Task[] {
  const lexicalItem = seed.targetLexicalItem
  const requiredWord = requiredLexicalItem(seed)

  if (typeCode === 'A') {
    return [
      task(
        'extra-1',
        'Optional accuracy drill',
        `Write two connected C1 sentences. Use ${seed.targetStructure} deliberately and include "${lexicalItem}" naturally.`,
        'A decision looked simple at first, but one hidden constraint changed what the choice really depended on.',
        requiredWord,
      ),
      task(
        'extra-2',
        'Optional error prevention',
        `Write one polished C1 sentence that performs this function: ${seed.communicativeFunction}`,
        `Avoid this danger zone: ${seed.dangerZone}`,
        requiredWord,
      ),
    ]
  }

  if (typeCode === 'B') {
    return [
      task(
        'extra-1',
        'Optional argument extension',
        `Write four sentences: position, concession, challenge, and consequence. Use ${seed.targetStructure} and "${lexicalItem}" to control the argument.`,
        'Claim: A team should delay a popular decision when the evidence is still incomplete.',
        requiredWord,
      ),
      task(
        'extra-2',
        'Optional counterargument',
        `Challenge the weak reasoning without sounding blunt. Make the response match this purpose: ${seed.communicativeFunction}`,
        'Weak reasoning: If a plan is popular, it must be the right choice.',
        requiredWord,
      ),
    ]
  }

  if (typeCode === 'C') {
    return [
      task(
        'extra-1',
        'Optional narrative control',
        `Tell a four-sentence micro-story. Use ${seed.targetStructure} to control focus or sequence, and include "${lexicalItem}" naturally.`,
        'A late discovery changed the result of a meeting that had seemed predictable.',
        requiredWord,
      ),
      task(
        'extra-2',
        'Optional turning-point rewrite',
        `Rewrite the plain event as two polished C1 sentences. Make the turning point clear and avoid this danger zone: ${seed.dangerZone}`,
        'Plain event: The team ignored a warning. Later, the warning became the main issue.',
        requiredWord,
      ),
    ]
  }

  if (typeCode === 'D') {
    return [
      task(
        'extra-1',
        'Optional register upgrade',
        `Rewrite the informal version in a controlled professional register. Use ${seed.targetStructure} and "${lexicalItem}" accurately.`,
        'Informal version: This idea sounds kind of weak, and nobody really explained the risk properly.',
        requiredWord,
      ),
      task(
        'extra-2',
        'Optional diplomatic precision',
        `Write a professional correction that sounds precise rather than blunt. Aim for this function: ${seed.communicativeFunction}`,
        'Context: A colleague has overstated the evidence in a report.',
        requiredWord,
      ),
    ]
  }

  return [
    task(
      'extra-1',
      'Optional consolidation drill',
      `Correct and upgrade the draft. Use today's ${seed.targetStructure} and "${lexicalItem}" in a natural C1 sentence.`,
      'Draft: The plan was good but the evidence was not strong and people ignored the problem.',
      requiredWord,
    ),
    task(
      'extra-2',
      'Optional retrieval bridge',
      `Write two C1 sentences combining today's language with Day ${source.day}'s ${source.targetStructure} and "${source.targetLexicalItem}".`,
      'Context: A decision looked efficient at first but created a credibility problem.',
      requiredWord,
    ),
  ]
}

const seedsByDay = new Map(lessonSeeds.map((seed) => [seed.day, seed]))

export const lessons: Lesson[] = lessonSeeds.map((seed) => {
  const typeCode = typeForDay(seed.day)
  const type = dayTypes[typeCode]
  const source = seedsByDay.get(recyclingSourceDay(seed.day, typeCode)) ?? seed

  return {
    ...seed,
    dayType: type.name,
    typeCode,
    skillLabel: type.skill,
    skillDescription: type.description,
    extraTasks: makeExtraTasks(seed, source, typeCode),
    recyclingChallenge: makeRecyclingChallenge(seed, source, typeCode),
    complete: true,
  }
})

export function getLesson(day: number): Lesson {
  return lessons[Math.min(90, Math.max(1, day)) - 1]
}
