import {Modal, Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Question} from "../Question/Question";

export const EndScreen = (props) => {
    useEffect(() => {
        console.log("ILOSC PYTANI W END", props.questionArray.length)
    })
    const [isQuestionShow, setIsQuestionShow] = useState(false)
    return (<div>
            <div>{props.points >= 68 ? "Brawo zdałeś" : "Nie zdałes"}</div>
            <p>Liczba punktów z egzaminu: {props.points}</p>
            <Button onClick={() => props.changeTab("Start")}>Nowy egzamin</Button>
            <Button onClick={() => setIsQuestionShow(!isQuestionShow)}>Pokaz odpowiedzi</Button>
            {isQuestionShow && props.questionArray.map((q) => <Question question={q.question} selectCorrect={true}/>)}
        </div>
    )
}