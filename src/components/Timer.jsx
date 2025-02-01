function Timer({ timeRemaining }) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLastMinute = timeRemaining <= 60

  return (
    <div className={`timer ${isLastMinute ? "timer-warning" : ""}`}>
      Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  )
}

export default Timer

