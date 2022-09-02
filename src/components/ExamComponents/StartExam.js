import {Button} from "react-bootstrap";

export const StartExam = (props) => {
    return (<div style={{textAlign: "center", fontSize: "1.5rem"}}>
            <p>Egzamin składa się z 32 pytań.</p>
            <p>Część podstawowa składa się z 20 pytań na które należy udzielić odpowiedzi Tak lub Nie </p>
            <p>Druga część zawiera 12 pytań specjalistycznych i 3 pełne odpowiedzi</p>
            <Button onClick={() => props.changeTab("StartExam")}>Naciśnij przysk aby rozpocząć</Button>
        </div>

    )
}