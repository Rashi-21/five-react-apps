import { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0")
}

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [title, setTitle] = useState("Let the countdown begin!")

  const intervalRef = useRef(null)
  
  function startTimer() {
    if (intervalRef.current != null) return 
    setTitle(`You are doing great!`)
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1
        resetTimer()
        return 0
      })
    }, 1000)
  }

  function stopTimer() {
    if (intervalRef.current == null) return
    setTitle("Keep it up!")
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsRunning(false)
  }

  function resetTimer() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle("Ready to go for another round!")
    setTimeLeft(25 * 60)
    setIsRunning(false)
  }

  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime(timeLeft - minutes * 60)

  return (
    <div className='app'>
      <h2>{title}</h2>

      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons'>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
