import { describe, it, expect, beforeEach } from 'vitest'
import { useTimerStore } from './timerStore'

beforeEach(() => {
  useTimerStore.setState({
    totalMinutes: 30,
    remainingSeconds: 1800,
    isRunning: false,
    pin: '1234',
    screen: 'settings',
    extensionsUsedToday: 0,
    maxExtensionsPerDay: 2,
  })
})

describe('startTimer', () => {
  it('screen を timer に変更する', () => {
    useTimerStore.getState().startTimer()
    expect(useTimerStore.getState().screen).toBe('timer')
  })

  it('isRunning が true になる', () => {
    useTimerStore.getState().startTimer()
    expect(useTimerStore.getState().isRunning).toBe(true)
  })

  it('remainingSeconds が totalMinutes * 60 にリセットされる', () => {
    useTimerStore.setState({ totalMinutes: 10 })
    useTimerStore.getState().startTimer()
    expect(useTimerStore.getState().remainingSeconds).toBe(600)
  })
})

describe('tick', () => {
  it('remainingSeconds を 1 減らす', () => {
    useTimerStore.getState().startTimer()
    useTimerStore.getState().tick()
    expect(useTimerStore.getState().remainingSeconds).toBe(1799)
  })

  it('0 になったら screen が ending になる', () => {
    useTimerStore.setState({ totalMinutes: 1, remainingSeconds: 1, isRunning: true, screen: 'timer' })
    useTimerStore.getState().tick()
    expect(useTimerStore.getState().screen).toBe('ending')
    expect(useTimerStore.getState().isRunning).toBe(false)
  })

  it('残り 0 秒を下回らない', () => {
    useTimerStore.setState({ totalMinutes: 1, remainingSeconds: 1, isRunning: true, screen: 'timer' })
    useTimerStore.getState().tick()
    expect(useTimerStore.getState().remainingSeconds).toBe(0)
  })
})

describe('resetTimer', () => {
  it('screen を settings に戻す', () => {
    useTimerStore.setState({ screen: 'ending' })
    useTimerStore.getState().resetTimer()
    expect(useTimerStore.getState().screen).toBe('settings')
  })

  it('isRunning が false になる', () => {
    useTimerStore.setState({ isRunning: true })
    useTimerStore.getState().resetTimer()
    expect(useTimerStore.getState().isRunning).toBe(false)
  })
})

describe('addExtension', () => {
  it('remainingSeconds が指定分だけ増える', () => {
    useTimerStore.setState({ remainingSeconds: 60, screen: 'ending' })
    useTimerStore.getState().addExtension(5)
    expect(useTimerStore.getState().remainingSeconds).toBe(360)
  })

  it('screen が timer に戻る', () => {
    useTimerStore.setState({ screen: 'ending' })
    useTimerStore.getState().addExtension(5)
    expect(useTimerStore.getState().screen).toBe('timer')
  })

  it('extensionsUsedToday が 1 増える', () => {
    useTimerStore.setState({ extensionsUsedToday: 0 })
    useTimerStore.getState().addExtension(5)
    expect(useTimerStore.getState().extensionsUsedToday).toBe(1)
  })
})
