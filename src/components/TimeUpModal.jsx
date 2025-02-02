
function TimeUpModal({ onClose, isTimeUp }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-icon">{isTimeUp ? "⏰" : "🎉"}</div>
        <h2>{isTimeUp ? "Time's Up!" : "Quiz Finished"}</h2>
        <p>
          {isTimeUp
            ? "Your quiz has been automatically submitted."
            : "You've completed the quiz before the time ran out."}
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          View Results
        </button>
      </div>
    </div>
  )
}

export default TimeUpModal

