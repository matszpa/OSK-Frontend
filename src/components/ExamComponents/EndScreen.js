import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Question} from "../Question/Question";
import {useParams} from "react-router-dom";

export const EndScreen = (props) => {
    const {Category} = useParams()
    const [isQuestionShow, setIsQuestionShow] = useState(false)
    useEffect(() => {
        fetch(`http://localhost:8000/addExamResult`, {
            method: "POST",
            body: JSON.stringify({
                catName: Category,
                scoredPoints: props.points
            }),
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
        })
    }, [])
    return (
        <div>
            <div style={{fontSize: "1.5rem", textAlign: "center", marginBottom: "0rem"}}>{props.points >= 68 ?
                <p>Brawo zdałeś próbny egzamin</p> : <p>Niestety nie udało ci się zdać egzaminu próbnego</p>}
                <p>Liczba punktów z egzaminu: {props.points}</p></div>
            <div style={{display: "flex", justifyContent: "space-between", padding: "5rem"}}>
                <Button onClick={() => props.changeTab("Start")}>Nowy egzamin</Button>
                <Button onClick={() => setIsQuestionShow(!isQuestionShow)}>Pokaz odpowiedzi</Button>
            </div>

            {isQuestionShow && props.questionArray.map((q) => <Question question={q.question} selectCorrect={true}/>)}
        </div>
    )
}