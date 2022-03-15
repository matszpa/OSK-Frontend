import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Question} from "../Question/Question";
import {Button} from "react-bootstrap";

export const Exam = (props) => {
    const {Category} = useParams()
    const [questionArray, setQuestionArray] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [idArray, setIdArray] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/exam/${Category}`)
            .then((res) => res.json())
            .then((res) => {
                setQuestionArray(res);
                setCurrentQuestion(res[0]);
            });
    }, [])

    const choseAnswer = (answer) => {
        setSelectedAnswer(answer);

    }
    const nextQuestion = (e) => {
        // if (e.target.innerHTML === "Zakończ")
        //     props.changeTab("End")

        // const isCorrect = currentQuestion.question.answers.find((a) => a.content === selectedAnswer)
        const currenctQIndex = questionArray.findIndex(q => q.question.id === currentQuestion.question.id)
        var array = questionArray;
        array[currenctQIndex].question.answers.map((a) => a.content === selectedAnswer ? a.selected = true : a.selected = false)
        setQuestionArray(array)
        // if (isCorrect.correct) {
        //     props.changePoints(currentQuestion.question.points);
        // }
        var tmp = idArray;
        var answer = currentQuestion.question.answers.find((q) => q.content === selectedAnswer);
        tmp.push({
            "question_id": currentQuestion.question.id,
            "answer": answer.id
        })
        setIdArray(tmp);
        if (currenctQIndex < questionArray.length - 1) {

            setCurrentQuestion(questionArray[currenctQIndex + 1])

        } else {
            props.setQuestions(questionArray);
            props.checkAnswers(idArray, questionArray);

        }
    }
    return (

        <div>
            <h3>Egzamin</h3>
            {currentQuestion &&
                <Question selected={choseAnswer} question={currentQuestion.question}/>
            }
            <Button
                onClick={nextQuestion}>{questionArray[questionArray.length - 1] === currentQuestion ?
                "Zakończ" : "Nastepne pytanie"}
            </Button>

        </div>
    )
}