function Sidebar({ questions, currentQuestion, userAnswers, reviewFlags, goToQuestion }) {
  return (
    <div className="sidebar">
      <h3>Question Overview</h3>
      <div className="question-list">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`question-button ${index === currentQuestion ? "current" : ""} ${
              userAnswers[index] !== null ? "answered" : ""
            } ${reviewFlags[index] ? "review" : ""}`}
            onClick={() => goToQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className="progress-indicator">
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(userAnswers.filter((answer) => answer !== null).length / questions.length) * 100}%` }}
          ></div>
        </div>
        <p>
          {userAnswers.filter((answer) => answer !== null).length} of {questions.length} answered
        </p>
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color current"></span> Current
        </div>
        <div className="legend-item">
          <span className="legend-color answered"></span> Answered
        </div>
        <div className="legend-item">
          <span className="legend-color review"></span> Marked for Review
        </div>
        <div className="legend-item">
          <span className="legend-color"></span> Unanswered
        </div>
      </div>
    </div>
  )
}

export default Sidebar

