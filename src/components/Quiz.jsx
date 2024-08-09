import React, { useCallback, useEffect } from "react";
import Question from "./Question";

export default function Quiz() {
    const [questions, setQuestions] = React.useState([])
    const [selectedAnswers, setSelectedAnswers] = React.useState([])
    const [score, setScore] = React.useState(null)
    const [isChecked, setIsChecked] = React.useState(false)

    useEffect(() => {
        getNewQuestions()
    }, [])
    

    function getNewQuestions() {
            fetch ("https://opentdb.com/api.php?amount=10&category=12")
                .then(response => response.json())
                .then(data => {
                    console.log(data.results)
                    setQuestions(data.results)
            }) 
            .catch(error => console.error("Error fetching questions"))
        }

    useEffect(() => {
        if (questions && questions.length > 0) {
            setSelectedAnswers(Array(questions.length).fill(null));
        }
    }, [questions]);
    

    const handleAnswerSelect = useCallback((questionIndex, answer) => {
        setSelectedAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers]
            updatedAnswers[questionIndex] = answer
            return updatedAnswers
        })
    }, [])

    const checkAnswers = () => {
        let calculatedScore = 0
        selectedAnswers.forEach((answer, index) => {
            if(answer === questions[index].correct_answer) {
                calculatedScore ++
            }
        })
        setScore(calculatedScore)
        setIsChecked(true)
    }

    const handlePlayAgain = () => {
        getNewQuestions()
        setIsChecked(false)
        setScore(0)
    }

    return (
        <div>
            <svg className="blob-top" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFAD1" d="M50.9,-47.3C58.6,-30.8,52.6,-10.1,46.8,8.8C40.9,27.7,35.4,44.8,23.6,51.3C11.9,57.7,-6,53.6,-21.4,45.7C-36.8,37.8,-49.9,26.1,-57.4,8.6C-64.9,-8.8,-67,-31.9,-56.5,-49C-46,-66,-23,-77,-0.7,-76.4C21.6,-75.8,43.1,-63.7,50.9,-47.3Z" transform="translate(100 100)" />
            </svg>
            <section className="quiz-container">
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((question, index) => (
                    <div>

                        <Question 
                        key={index}
                        index={index}
                        question={question.question}
                        correctAnswer={question.correct_answer}
                        incorrectAnswers={question.incorrect_answers}
                        type={question.type}
                        selectedAnswer = {selectedAnswers[index]}
                        onAnswerSelect = {(answer) => handleAnswerSelect(index, answer)}
                        isChecked = {isChecked}
                        />

                    </div>
                ))
                ) : (
                    <p>Loading questions...</p>
                )}

                {isChecked && <p>You scored {score}/10 correct answers</p>}
                <button 
                    id="check-answer-btn" 
                    className="btn"
                    onClick={isChecked ? handlePlayAgain : checkAnswers}>
                    {isChecked ? "Play Again" : "Check answers"}
                </button>
            </section>
        <svg className="blob-bottom" viewBox="0 0 148 118" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M-5.55191 4.90596C35.9614 1.77498 82.2425 -9.72149 112.306 19.1094C145.581 51.0203 155.282 102.703 142.701 147.081C130.767 189.18 93.7448 220.092 51.8208 232.476C16.5281 242.902 -15.4332 218.605 -49.1007 203.738C-85.3375 187.737 -133.641 182.993 -145.741 145.239C-158.358 105.868 -132.269 64.5881 -103.064 35.3528C-77.7328 9.99541 -41.2727 7.60006 -5.55191 4.90596Z" fill="#DEEBF8"/>
        </svg>

    </div>
    )
}