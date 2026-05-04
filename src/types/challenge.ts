export interface ChallengeQuestion {
  id: string
  prompt: string
  answer: string
  options?: string[]
}

export interface ChallengeLevel {
  id: string
  label: string
  description: string
  extensionMinutes: number
  generateQuestion: () => ChallengeQuestion
}
