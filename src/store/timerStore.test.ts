import { describe, it, expect, beforeEach } from 'vitest'
import { useTimerStore } from './timerStore'

beforeEach(() => {
  useTimerStore.setState({
    durationMinutes: 30,
    durationSeconds: 0,
    remainingSeconds: 1800,
    isRunning: false,
    pin: '1234',
    screen: 'settings',
    extensionsUsedToday: 0,
    maxExtensionsPerDay: 2,
  })
})

describe('setDuration', () => {
  it('分と秒から remainingSeconds を計算する', () => {
    useTimerStore.getState().setDuration(1, 30)
    expect(useTimerStore.getState().remainingSeconds).toBe(90)
  })

  it('0分0秒を設定できる', () => {
    useTimerStore.getState().setDuration(0, 0)
    expect(useTimerStore.getState().remainingSeconds).toBe(0)
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

  it('remainingSeconds が durationMinutes*60 + durationSeconds になる', () => {
    useTimerStore.setState({ durationMinutes: 1, durationSeconds: 30 })
    useTimerStore.getState().startTimer()
    expect(useTimerStore.getState().remainingSeconds).toBe(90)
  })
})

describe('tick', () => {
  it('remainingSeconds を 1 減らす', () => {
    useTimerStore.getState().startTimer()
    useTimerStore.getState().tick()
    expect(useTimerStore.getState().remainingSeconds).toBe(1799)
  })

  it('0 になったら screen が ending になる', () => {
    useTimerStore.setState({ remainingSeconds: 1, isRunning: true, screen: 'timer' })
    useTimerStore.getState().tick()
    expect(useTimerStore.getState().screen).toBe('ending')
    expect(useTimerStore.getState().isRunning).toBe(false)
  })

  it('残り 0 秒を下回らない', () => {
    useTimerStore.setState({ remainingSeconds: 1, isRunning: true, screen: 'timer' })
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
    useTimerStore.getState().addExtension(5)
    expect(useTimerStore.getState().extensionsUsedToday).toBe(1)
  })
})
