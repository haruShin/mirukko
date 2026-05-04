import { useEffect, useState } from 'react'
import { useTimerStore } from '../store/timerStore'

const EMOJIS = ['⭐', '🌟', '✨', '🎉', '🎊', '💫', '🌈', '❤️', '🎈', '🍭']

interface Particle {
  id: number
  emoji: string
  left: number
  delay: number
  duration: number
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  }))
}

export function EndingScreen() {
  const { resetTimer } = useTimerStore()
  const [particles] = useState(() => createParticles(20))

  useEffect(() => {
    // フェーズ2でここに延長チャレンジへの遷移を追加
  }, [])

  return (
    <div className="screen ending-screen">
      <div className="particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <div className="ending-content">
        <div className="ending-character">🌟</div>
        <h1 className="ending-title">おしまい！</h1>
        <p className="ending-message">
          きょうも よく みたね！
          <br />
          えらかったよ！
        </p>

        <div className="ending-buttons">
          {/* フェーズ2：延長チャレンジボタン（現在は非活性） */}
          <button className="btn-extend" disabled>
            もう すこし みる
            <span className="btn-extend-note">（じゅんびちゅう）</span>
          </button>

          <button className="btn-finish" onClick={resetTimer}>
            おわり 👋
          </button>
        </div>
      </div>
    </div>
  )
}
