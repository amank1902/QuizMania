// import { useState, useEffect } from "react"
// import Confetti from "react-confetti"

// function Results({ questions, userAnswers, onRestart, correctMarks, negativeMarks }) {
//   const calculateScore = () => {
//     return userAnswers.reduce((score, answer, index) => {
//       const correctAnswerIndex = questions[index].options.findIndex((option) => option.is_correct)
//       if (answer === correctAnswerIndex) {
//         return score + correctMarks
//       } else if (answer !== null) {
//         return score - negativeMarks
//       }
//       return score
//     }, 0)
//   }

//   const score = calculateScore()
//   const totalQuestions = questions.length
//   const maxScore = totalQuestions * correctMarks
//   const percentage = Math.round((score / maxScore) * 100)
//   const [showConfetti, setShowConfetti] = useState(true)

//   useEffect(() => {
//     const timer = setTimeout(() => setShowConfetti(false), 5000)
//     return () => clearTimeout(timer)
//   }, [])

//   const getGrade = (percentage) => {
//     if (percentage >= 90) return { text: "Excellent!", color: "#4CAF50" }
//     if (percentage >= 70) return { text: "Good Job!", color: "#2196F3" }
//     if (percentage >= 50) return { text: "Keep Practicing!", color: "#FF9800" }
//     return { text: "Need Improvement", color: "#f44336" }
//   }

//   const grade = getGrade(percentage)

//   return (
//     <div className="results-container">
//       {showConfetti && <Confetti />}
//       <div className="results">
//         <div className="results-header">
//           <h2>Quiz Results</h2>
//           <p className="grade" style={{ color: grade.color }}>
//             {grade.text}
//           </p>
//         </div>

//         <div className="score-summary">
//           <div className="score-circle" style={{ borderColor: grade.color }}>
//             <div className="score-content">
//               <span className="score-percentage">{percentage}%</span>
//               <span className="score-text">
//                 {score.toFixed(2)} / {maxScore}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="stats-grid">
//           <div className="stat-item">
//             <span className="stat-label">Total Questions</span>
//             <span className="stat-value">{totalQuestions}</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Correct Answers</span>
//             <span className="stat-value">
//               {
//                 userAnswers.filter(
//                   (answer, index) => answer === questions[index].options.findIndex((opt) => opt.is_correct),
//                 ).length
//               }
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Wrong Answers</span>
//             <span className="stat-value">
//               {
//                 userAnswers.filter(
//                   (answer, index) =>
//                     answer !== null && answer !== questions[index].options.findIndex((opt) => opt.is_correct),
//                 ).length
//               }
//             </span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Unanswered</span>
//             <span className="stat-value">{userAnswers.filter((answer) => answer === null).length}</span>
//           </div>
//         </div>

//         <div className="results-details">
//           <h3>Detailed Summary</h3>
//           <div className="summary-list">
//             {questions.map((question, index) => {
//               const userAnswerIndex = userAnswers[index]
//               const correctAnswerIndex = question.options.findIndex((option) => option.is_correct)
//               const isCorrect = userAnswerIndex === correctAnswerIndex
//               const userAnswer = userAnswerIndex !== null ? question.options[userAnswerIndex].description : "Unanswered"
//               const correctAnswer = question.options[correctAnswerIndex].description

//               return (
//                 <div key={index} className={`summary-item ${isCorrect ? "correct" : "incorrect"}`}>
//                   <div className="question-header">
//                     <h4>Question {index + 1}</h4>
//                     <span className={`status ${isCorrect ? "correct" : "incorrect"}`}>
//                       {isCorrect ? "Correct" : "Incorrect"}
//                     </span>
//                   </div>
//                   <p className="question-text">{question.description}</p>
//                   <div className="answer-grid">
//                     <div className="answer-item">
//                       <span className="answer-label">Your Answer:</span>
//                       <span className={`answer-value ${userAnswerIndex === null ? "unanswered" : ""}`}>
//                         {userAnswer}
//                       </span>
//                     </div>
//                     <div className="answer-item">
//                       <span className="answer-label">Correct Answer:</span>
//                       <span className="answer-value correct">{correctAnswer}</span>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>

//         <button className="btn btn-primary restart-button" onClick={onRestart}>
//           Restart Quiz
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Results

import { useState, useEffect } from "react"
import Confetti from "react-confetti"

function Results({ questions, userAnswers, onRestart, finalScore, totalQuestions }) {
  const maxScore = totalQuestions * 4
  const percentage = Math.round((finalScore / maxScore) * 100)

  const getGrade = (percentage) => {
    if (percentage >= 90) return { text: "Excellent!", color: "#4CAF50" }
    if (percentage >= 70) return { text: "Good Job!", color: "#2196F3" }
    if (percentage >= 50) return { text: "Keep Practicing!", color: "#FF9800" }
    return { text: "Need Improvement", color: "#f44336" }
  }

  const grade = getGrade(percentage)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="results-container">
      {showConfetti && <Confetti />}
      <div className="results">
        <div className="results-header">
          <h2>Quiz Results</h2>
          <p className="grade" style={{ color: grade.color }}>
            {grade.text}
          </p>
        </div>

        <div className="score-summary">
          <div className="score-circle" style={{ borderColor: grade.color }}>
            <div className="score-content">
              <span className="score-percentage">{percentage}%</span>
              <span className="score-text">
                {finalScore} / {maxScore}
              </span>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Questions</span>
            <span className="stat-value">{totalQuestions}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Correct Answers</span>
            <span className="stat-value">
              {
                userAnswers.filter(
                  (answer, index) => answer === questions[index].options.findIndex((opt) => opt.is_correct),
                ).length
              }
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wrong Answers</span>
            <span className="stat-value">
              {
                userAnswers.filter(
                  (answer, index) =>
                    answer !== null && answer !== questions[index].options.findIndex((opt) => opt.is_correct),
                ).length
              }
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Unanswered</span>
            <span className="stat-value">{userAnswers.filter((answer) => answer === null).length}</span>
          </div>
        </div>

        <div className="results-details">
          <h3>Detailed Summary</h3>
          <div className="summary-list">
            {questions.map((question, index) => {
              const userAnswerIndex = userAnswers[index]
              const correctAnswerIndex = question.options.findIndex((option) => option.is_correct)
              const isCorrect = userAnswerIndex === correctAnswerIndex
              const userAnswer = userAnswerIndex !== null ? question.options[userAnswerIndex].description : "Unanswered"
              const correctAnswer = question.options[correctAnswerIndex].description

              return (
                <div key={index} className={`summary-item ${isCorrect ? "correct" : "incorrect"}`}>
                  <div className="question-header">
                    <h4>Question {index + 1}</h4>
                    <span className={`status ${isCorrect ? "correct" : "incorrect"}`}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  <p className="question-text">{question.description}</p>
                  <div className="answer-grid">
                    <div className="answer-item">
                      <span className="answer-label">Your Answer:</span>
                      <span className={`answer-value ${userAnswerIndex === null ? "unanswered" : ""}`}>
                        {userAnswer}
                      </span>
                    </div>
                    <div className="answer-item">
                      <span className="answer-label">Correct Answer:</span>
                      <span className="answer-value correct">{correctAnswer}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <button className="btn btn-primary restart-button" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  )
}

export default Results

