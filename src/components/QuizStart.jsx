function QuizStart({ onStart, description, topic, duration, questionsCount }) {
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="quiz-start">
      <h2>{topic}</h2>
      <p className="description">{description}</p>
      <div className="quiz-info">
        <div className="info-item">
          <span className="info-label">Duration</span>
          <span className="info-value">{duration} minutes</span>
        </div>
        <div className="info-item">
          <span className="info-label">Questions</span>
          <span className="info-value">{questionsCount}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Date</span>
          <span className="info-value">{formattedDate}</span>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={onStart}
        style={{ width: "100%", maxWidth: "300px", margin: "0 auto", display: "block" }}
      >
        Start Quiz
      </button>
    </div>
  )
}

export default QuizStart

