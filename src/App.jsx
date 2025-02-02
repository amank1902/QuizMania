
import { useState, useEffect, useCallback } from "react"
import QuizStart from "./components/QuizStart"
import Question from "./components/Question"
import Results from "./components/Results"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Sidebar from "./components/Sidebar"
import Timer from "./components/Timer"
import TimeUpModal from "./components/TimeUpModal"
import "./App.css"

function App() {
  const [quizData, setQuizData] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [reviewFlags, setReviewFlags] = useState([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizEnded, setQuizEnded] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [finalScore, setFinalScore] = useState(0)

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        console.log("Fetching quiz data from API...")
        const response = await fetch("https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log("Quiz data fetched successfully:", data)

        setQuizData(data)
        setUserAnswers(new Array(data.questions.length).fill(null))
        setReviewFlags(new Array(data.questions.length).fill(false))
        setTimeRemaining(data.duration * 60)
      } catch (e) {
        console.error("Error fetching quiz data:", e)
        setError("Failed to load quiz data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchQuizData()
  }, [])

  const calculateScore = useCallback(() => {
    if (!quizData) return 0

    return userAnswers.reduce((score, answer, index) => {
      if (answer === null || quizData.questions[index] === undefined) return score
      const correctAnswerIndex = quizData.questions[index].options.findIndex((option) => option.is_correct)
      return answer === correctAnswerIndex ? score + 4 : score - 1
    }, 0)
  }, [userAnswers, quizData])

  const endQuiz = useCallback(() => {
    console.log("Quiz ended")
    setQuizEnded(true)
    setFinalScore(calculateScore())
    setShowTimeUpModal(timeRemaining === 0)
  }, [timeRemaining, calculateScore])

  useEffect(() => {
    let timer
    if (quizStarted && !quizEnded && timeRemaining > 0) {
      console.log("Timer started")
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            endQuiz()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => {
      if (timer) {
        console.log("Timer cleared")
        clearInterval(timer)
      }
    }
  }, [quizStarted, quizEnded, timeRemaining, endQuiz])

  const startQuiz = () => {
    console.log("Quiz started")
    setQuizStarted(true)
  }

  const handleAnswer = (answer) => {
    console.log(`Answer selected for question ${currentQuestion + 1}:`, answer)
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answer
    setUserAnswers(newAnswers)
  }

  const goToNextQuestion = () => {
    if (quizData && currentQuestion + 1 < quizData.questions.length) {
      console.log(`Moving to question ${currentQuestion + 2}`)
      setCurrentQuestion(currentQuestion + 1)
    } else {
      endQuiz()
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      console.log(`Moving to question ${currentQuestion}`)
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const markForReview = () => {
    console.log(`Toggling review flag for question ${currentQuestion + 1}`)
    const newReviewFlags = [...reviewFlags]
    newReviewFlags[currentQuestion] = !newReviewFlags[currentQuestion]
    setReviewFlags(newReviewFlags)
  }

  const goToQuestion = (index) => {
    console.log(`Jumping to question ${index + 1}`)
    setCurrentQuestion(index)
  }

  const restartQuiz = () => {
    console.log("Restarting quiz")
    if (!quizData) return

    setCurrentQuestion(0)
    setUserAnswers(new Array(quizData.questions.length).fill(null))
    setReviewFlags(new Array(quizData.questions.length).fill(false))
    setQuizStarted(false)
    setQuizEnded(false)
    setTimeRemaining(quizData.duration * 60)
    setShowTimeUpModal(false)
    setFinalScore(0)
  }

  if (loading) {
    return <div className="loading">Loading quiz data...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="App">
      <Header />
      <main className="container">
        {!quizStarted && !quizEnded && (
          <QuizStart
            onStart={startQuiz}
            description={quizData.description}
            topic={quizData.topic}
            duration={quizData.duration}
            questionsCount={quizData.questions.length}
          />
        )}
        {quizStarted && !quizEnded && (
          <div className="quiz-container">
            <Sidebar
              questions={quizData.questions}
              currentQuestion={currentQuestion}
              userAnswers={userAnswers}
              reviewFlags={reviewFlags}
              goToQuestion={goToQuestion}
            />
            <div className="quiz-content">
              <Timer timeRemaining={timeRemaining} />
              <Question
                question={quizData.questions[currentQuestion]}
                onAnswer={handleAnswer}
                userAnswer={userAnswers[currentQuestion]}
                currentQuestion={currentQuestion + 1}
                totalQuestions={quizData.questions.length}
                onNext={goToNextQuestion}
                onPrevious={goToPreviousQuestion}
                onMarkForReview={markForReview}
                isMarkedForReview={reviewFlags[currentQuestion]}
              />
            </div>
          </div>
        )}
        {quizEnded && (
          <Results
            questions={quizData.questions}
            userAnswers={userAnswers}
            onRestart={restartQuiz}
            finalScore={finalScore}
            totalQuestions={quizData.questions.length}
          />
        )}
        {showTimeUpModal && <TimeUpModal onClose={() => setShowTimeUpModal(false)} isTimeUp={timeRemaining === 0} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
