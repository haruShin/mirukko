import { useEffect, useRef } from 'react'
import { useTimerStore } from '../store/timerStore'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function getWarningLevel(remainingSeconds: number): 'normal' | 'soon' | 'urgent' {
  if (remainingSeconds <= 60) return 'urgent'
  if (remainingSeconds <= 300) return 'soon'
  return 'normal'
}

export function TimerScreen() {
  const { remainingSeconds, totalMinutes, isRunning, tick, resetTimer } = useTimerStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevWarningRef = useRef<'normal' | 'soon' | 'urgent'>('normal')

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current = setInterval(() => tick(), 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, tick])

  const warning = getWarningLevel(remainingSeconds)
  const progress = remainingSeconds / (totalMinutes * 60)

  if (warning !== prevWarningRef.current) {
    prevWarningRef.current = warning
  }

  return (
    <div className={`screen timer-screen timer-${warning}`}>
      <div className="timer-character">
        {warning === 'urgent' ? '😮' : warning === 'soon' ? '😊' : '😄'}
      </div>

      {warning === 'soon' && (
        <div className="warning-banner soon">
          もうすぐ おしまいだよ！
        </div>
      )}
      {warning === 'urgent' && (
        <div className="warning-banner urgent">
          あと すこし！ 💫
        </div>
      )}

      <div className="timer-display">
        <span className="timer-value">{formatTime(remainingSeconds)}</span>
      </div>

      <div className="progress-bar-wrap">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <button className="btn-stop" onClick={resetTimer}>
        やめる
      </button>
    </div>
  )
}
