import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Screen = 'settings' | 'timer' | 'ending'

interface TimerState {
  durationMinutes: number
  durationSeconds: number
  remainingSeconds: number
  isRunning: boolean
  pin: string
  screen: Screen
  extensionsUsedToday: number
  maxExtensionsPerDay: number

  setDuration: (minutes: number, seconds: number) => void
  setPin: (pin: string) => void
  startTimer: () => void
  tick: () => void
  resetTimer: () => void
  addExtension: (minutes: number) => void
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      durationMinutes: 30,
      durationSeconds: 0,
      remainingSeconds: 30 * 60,
      isRunning: false,
      pin: '1234',
      screen: 'settings',
      extensionsUsedToday: 0,
      maxExtensionsPerDay: 2,

      setDuration: (minutes, seconds) =>
        set({
          durationMinutes: minutes,
          durationSeconds: seconds,
          remainingSeconds: minutes * 60 + seconds,
        }),

      setPin: (pin) => set({ pin }),

      startTimer: () =>
        set((state) => ({
          isRunning: true,
          remainingSeconds: state.durationMinutes * 60 + state.durationSeconds,
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
          remainingSeconds: state.durationMinutes * 60 + state.durationSeconds,
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
        durationMinutes: state.durationMinutes,
        durationSeconds: state.durationSeconds,
        pin: state.pin,
        maxExtensionsPerDay: state.maxExtensionsPerDay,
      }),
    }
  )
)
