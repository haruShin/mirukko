import { useState } from 'react'
import { useTimerStore } from '../store/timerStore'

function Spinner({
  value,
  min,
  max,
  label,
  onChange,
}: {
  value: number
  min: number
  max: number
  label: string
  onChange: (v: number) => void
}) {
  return (
    <div className="spinner">
      <button
        className="spinner-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        ▲
      </button>
      <div className="spinner-value">
        {String(value).padStart(2, '0')}
        <span className="spinner-label">{label}</span>
      </div>
      <button
        className="spinner-btn"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        ▼
      </button>
    </div>
  )
}

export function SettingsScreen() {
  const { durationMinutes, durationSeconds, pin, setDuration, setPin, startTimer } =
    useTimerStore()

  const [minutes, setMinutes] = useState(durationMinutes)
  const [seconds, setSeconds] = useState(durationSeconds)
  const [pinInput, setPinInput] = useState(pin)
  const [showPinEdit, setShowPinEdit] = useState(false)

  const handleChangeMinutes = (v: number) => {
    setMinutes(v)
    setDuration(v, seconds)
  }

  const handleChangeSeconds = (v: number) => {
    setSeconds(v)
    setDuration(minutes, v)
  }

  const canStart = minutes > 0 || seconds > 0

  return (
    <div className="screen settings-screen">
      <div className="settings-header">
        <span className="app-icon">🎬</span>
        <h1 className="app-title">みるっこ</h1>
        <p className="app-subtitle">みる じかんを きめよう</p>
      </div>

      <div className="settings-section">
        <h2 className="section-label">⏱ みる じかん</h2>
        <div className="spinner-row">
          <Spinner value={minutes} min={0} max={99} label="ふん" onChange={handleChangeMinutes} />
          <span className="spinner-colon">:</span>
          <Spinner value={seconds} min={0} max={59} label="びょう" onChange={handleChangeSeconds} />
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-label">
          🔑 あいことば（おやようけ）
          <button
            className="edit-toggle"
            onClick={() => setShowPinEdit(!showPinEdit)}
          >
            {showPinEdit ? '✓' : '✎'}
          </button>
        </h2>
        {showPinEdit ? (
          <div className="pin-edit">
            <input
              type="number"
              className="pin-input"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="すうじを いれてね"
            />
            <button
              className="btn-secondary"
              onClick={() => {
                setPin(pinInput)
                setShowPinEdit(false)
              }}
            >
              ほぞん
            </button>
          </div>
        ) : (
          <p className="pin-display">{'●'.repeat(pin.length)}</p>
        )}
      </div>

      <button className="btn-start" onClick={startTimer} disabled={!canStart}>
        スタート！
      </button>
    </div>
  )
}
