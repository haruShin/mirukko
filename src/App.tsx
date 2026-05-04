import { useTimerStore } from './store/timerStore'
import { SettingsScreen } from './screens/SettingsScreen'
import { TimerScreen } from './screens/TimerScreen'
import { EndingScreen } from './screens/EndingScreen'
import './App.css'

export default function App() {
  const screen = useTimerStore((s) => s.screen)

  return (
    <div className="app">
      {screen === 'settings' && <SettingsScreen />}
      {screen === 'timer' && <TimerScreen />}
      {screen === 'ending' && <EndingScreen />}
    </div>
  )
}
