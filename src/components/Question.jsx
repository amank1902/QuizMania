function Question({
  question,
  onAnswer,
  userAnswer,
  currentQuestion,
  totalQuestions,
  onNext,
  onPrevious,
  onMarkForReview,
  isMarkedForReview,
}) {
  return (
    <div className="question">
      <div className="question-header">
        <h2>
          Question {currentQuestion} of {totalQuestions}
        </h2>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }} />
        </div>
      </div>
      <div className="question-content" style={{ maxHeight: 'calc(80vh - 200px)', overflowY: 'auto' }}>
        <div className="question-text">{question.description}</div>
        <div className="options">
          {question.options.map((option, index) => (
            <label key={option.id} className="option">
              <input
                type="radio"
                name="answer"
                value={index}
                checked={userAnswer === index}
                onChange={() => onAnswer(index)}
              />
              <span className="option-text">{option.description}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="question-actions">
        <button className="btn btn-secondary" onClick={onPrevious} disabled={currentQuestion === 1}>
          Previous
        </button>
        <button className={`btn ${isMarkedForReview ? "btn-warning" : "btn-secondary"}`} onClick={onMarkForReview}>
          {isMarkedForReview ? "Unmark for Review" : "Mark for Review"}
        </button>
        <button className="btn btn-primary" onClick={onNext}>
          {currentQuestion === totalQuestions ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  )
}

export default Question