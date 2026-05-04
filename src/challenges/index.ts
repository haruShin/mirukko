import type { ChallengeLevel } from '../types/challenge'

const level1: ChallengeLevel = {
  id: 'level1_number',
  label: 'すうじ',
  description: 'すうじをタッチしよう',
  extensionMinutes: 5,
  generateQuestion: () => {
    const answer = String(Math.floor(Math.random() * 9) + 1)
    return {
      id: `l1_${Date.now()}`,
      prompt: `「${answer}」を タッチしてね！`,
      answer,
      options: shuffle(['1', '2', '3', '4', '5', '6', '7', '8', '9']).slice(0, 6),
    }
  },
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export const challenges: ChallengeLevel[] = [level1]

export function getChallengeById(id: string): ChallengeLevel | undefined {
  return challenges.find((c) => c.id === id)
}
