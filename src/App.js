import React from "react";
import Quiz from "./components/Quiz";
import StartPage from "./components/StartPage";


export default function App() {
   const [quizStarted, setQuizStarted] = React.useState(false)
   
    const startQuiz = () => {
        setQuizStarted(true)
    }

    return (
        <div>
            {quizStarted ? 
            (<Quiz />) : 
            (<StartPage startQuiz={startQuiz}/>)}
        </div>

    )
}

