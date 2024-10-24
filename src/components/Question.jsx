import React from "react";
import he from "he"

export default function Question({question, selectedAnswer, onAnswerSelect, correctAnswer, incorrectAnswers, index, isChecked}) {

            const options = React.useMemo(() => {
                return [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)
            }, [correctAnswer, incorrectAnswers]) 
            
            return (
                <div className="question-container">
            <p className="question">
                {he.decode(question)}
            </p>
            <form>
                {options.map((option, i) => {
                    const isSelected = selectedAnswer === option
                    const isCorrect = option === correctAnswer
                     
                    const backgroundColor= isChecked ? isCorrect ? "lightgreen" : isSelected ? "#edbcb9" : '' : ''

                    return(
                    <div key={i}>
                        <input 
                        type="radio" 
                        name={`option-${index}`} 
                        id={`option-${index}-${i}`}
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => onAnswerSelect(option)}
                        />
                        <label 
                        htmlFor={`option-${index}-${i}`}
                        style={{backgroundColor}}>
                            {he.decode(option)}
                        </label>
                    </div>
                )})}

            </form>
        </div>
    )

}
