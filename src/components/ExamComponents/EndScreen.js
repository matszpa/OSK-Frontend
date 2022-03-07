import {Button} from "react-bootstrap";
import {useState} from "react";
import {Question} from "../Question/Question";

export const EndScreen = (props) => {
    const [isQuestionShow, setIsQuestionShow] = useState(false)
    return (<div>
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