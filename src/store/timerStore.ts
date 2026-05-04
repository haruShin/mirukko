import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Screen = 'settings' | 'timer' | 'ending'

interface TimerState {
  totalMinutes: number
  remainingSeconds: number
  isRunning: boolean
  pin: string
  screen: Screen
  extensionsUsedToday: number
  maxExtensionsPerDay: number

  setTotalMinutes: (m: number) => void
  setPin: (pin: string) => void
  startTimer: () => void
  tick: () => void
  resetTimer: () => void
  addExtension: (minutes: number) => void
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      totalMinutes: 30,
      remainingSeconds: 30 * 60,
      isRunning: false,
      pin: '1234',
      screen: 'settings',
      extensionsUsedToday: 0,
      maxExtensionsPerDay: 2,

      setTotalMinutes: (m) =>
        set({ totalMinutes: m, remainingSeconds: m * 60 }),

      setPin: (pin) => set({ pin }),

      startTimer: () =>
        set((state) => ({
          isRunning: true,
          remainingSeconds: state.totalMinutes * 60,
          screen: 'timer',
          extensionsUsedToday: 0,
        })),

      tick: () =>
        set((state) => {
          const next = state.remainingSeconds - 1
          if (next <= 0) {
            return { remainingSeconds: 0, isRunning: false, screen: 'ending' }
          }
          return { remainingSeconds: next }
        }),

      resetTimer: () =>
        set((state) => ({
          remainingSeconds: state.totalMinutes * 60,
          isRunning: false,
          screen: 'settings',
        })),

      addExtension: (minutes) =>
        set((state) => ({
          remainingSeconds: state.remainingSeconds + minutes * 60,
          isRunning: true,
          screen: 'timer',
          extensionsUsedToday: state.extensionsUsedToday + 1,
        })),
    }),
    {
      name: 'mirukko-storage',
      partialize: (state) => ({
        totalMinutes: state.totalMinutes,
        pin: state.pin,
        maxExtensionsPerDay: state.maxExtensionsPerDay,
      }),
    }
  )
)
