import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Question} from "../components/Question/Question";
import {Button} from "react-bootstrap";
import styles from './SingleQuestion.module.scss'

export const SingleQuestionPage = () => {
    const {Category} = useParams()
    const [question, setQuestion] = useState(null)
    const [selected, setSelected] = useState(null);
    const [message, setMessage] = useState({text: null, correct: false});
    useEffect(() => {
        fetch(`http://localhost:8000/getSingle/${Category}`)
            .then((res) => res.json())
            .then((res) => {
                setQuestion(res.question)
            })
    }, [])
    const sprawdz = () => {
        const yourAnswer = question.answers.findIndex((a) => a.content === selected)
        var data = {
            "question_id": question.id,
            "answer_id": question.answers[yourAnswer].id
        }
        fetch("http://localhost:8000/checkQuestion", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res === true) {
                    setMessage({text: "Brawo! Poprawna odpowiedź", correct: true})
                } else {
                    const correct = question.answers.find((a) => a.id === res)
                    setMessage({
                        text: `Twoja odpowiedz jest błędna, poprawna odpowiedz to: ${correct.content}`,
                        correct: false
                    });
                }
            })
        // const answer = question.answers.find((a) => a.content === selected)
        // if (answer.correct) {
        //     setMessage({text: "Brawo! Poprawna odpowiedź", correct: true})
        // } else {
        //     const correct = question.answers.find(a => a.correct === true)
        //     setMessage({
        //         text: `Twoja odpowiedz jest błędna, poprawna odpowiedz to: ${correct.content}`,
        //         correct: false
        //     });
        // }

    }
    const nextQuestion = () => {
        setMessage({text: null, correct: false});
        setSelected(null);
        setQuestion(null);
        fetch(`http://localhost:8000/getSingle/${Category}`)
            .then((res) => res.json())
            .then((res) => {
                setQuestion(res.question)
            })
    }
    const choseAnswer = (answer) => {
        setSelected(answer);
    }
    return (<div className={styles.container}>
        <h2>Losowe pytanie z kategori: {Category}</h2>
        <hr/>
        {question && <Question selected={choseAnswer} question={question}/>}
        {message.text != null &&
            <div className={styles.message}
                 style={{
                     borderColor: message.correct ? 'green' : 'red'
                 }}>{message.text}</div>}
        <div className={styles.buttons}>
            <Button onClick={sprawdz}>Sprawdz</Button>
            <Button onClick={nextQuestion}>Nastepne pytanie</Button>
        </div>

    </div>)
}