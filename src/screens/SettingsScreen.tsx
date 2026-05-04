import { useState } from 'react'
import { useTimerStore } from '../store/timerStore'

const PRESET_MINUTES = [10, 15, 20, 30, 45, 60]

export function SettingsScreen() {
  const { totalMinutes, pin, setTotalMinutes, setPin, startTimer } = useTimerStore()
  const [pinInput, setPinInput] = useState(pin)
  const [showPinEdit, setShowPinEdit] = useState(false)

  const handleStart = () => {
    startTimer()
  }

  return (
    <div className="screen settings-screen">
      <div className="settings-header">
        <span className="app-icon">🎬</span>
        <h1 className="app-title">みるっこ</h1>
        <p className="app-subtitle">みる じかんを きめよう</p>
      </div>

      <div className="settings-section">
        <h2 className="section-label">⏱ みる じかん</h2>
        <div className="preset-grid">
          {PRESET_MINUTES.map((m) => (
            <button
              key={m}
              className={`preset-btn ${totalMinutes === m ? 'active' : ''}`}
              onClick={() => setTotalMinutes(m)}
            >
              {m}
              <span className="preset-unit">ふん</span>
            </button>
          ))}
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
              maxLength={6}
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

      <button className="btn-start" onClick={handleStart}>
        スタート！
      </button>
    </div>
  )
}
