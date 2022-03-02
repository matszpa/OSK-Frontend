import {Button} from "react-bootstrap";

export const StartExam = (props) => {
    return (
        <Button onClick={() => props.changeTab("StartExam")}>Rozpocznij</Button>
    )
}