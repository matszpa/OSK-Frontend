import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export const ChangeLectureStatus = (props) => {
    const [statusList, setStatusList] = useState([]);
    const [isExecuted, setIsExecuted] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [presentList, setPresentList] = useState([])
    const [lectureChange, setLectureChange] = useState({
        status: null,
        duration: 0
    })
    useEffect(() => {
        fetch("http://localhost:8000/lectureStatusList")
            .then(res => res.json())
            .then(res => setStatusList(res))

    }, [])
    const formSubmit = () => {
        var array = studentList.map((s) => {
            var isPresent = false;
            presentList.some((id) => id === s.id ? isPresent = true : isPresent = false)
            return {
                lectureId: props.lecture.id,
                trainingId: s.id,
                isPresent
            };
        })
        if (isExecuted) {
            fetch("http://localhost:8000/postPresence", {
                method: "POST",
                body: JSON.stringify({presenceList: array}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }

        props.changeStatus(lectureChange);
    }
    const selectChange = (e) => {
        setLectureChange({...lectureChange, [e.target.name]: e.target.value})
        if (e.target.value === "Ukończony") {
            setIsExecuted(true)
            fetch(`http://localhost:8000/getTrainingListForLecture/${props.lecture.categoryId}`)
                .then(res => res.json())
                .then(res => {
                    setStudentList(res)
                });
        }
    }
    const presentCheckboxChange = (e) => {
        let trainingId = parseInt(e.target.id);
        let newArray = presentList
        console.log(newArray)
        if (newArray.includes(trainingId)) {
            newArray = newArray.filter(e => e !== trainingId);
        } else {
            newArray = [...newArray, trainingId];
        }
        setPresentList(newArray);

    }
    const formChange = (e) => {
        setLectureChange({...lectureChange, [e.target.name]: parseFloat(e.target.value)})
    }
    return (
        <Modal show={props.show} size="lg">
            <Modal.Header><h4>Zmień status wykładu</h4></Modal.Header>
            <Modal.Body>
                <Form.Label>Wybierz status</Form.Label>
                <Form.Control as="select" name="status" onChange={selectChange} style={{width: "40%"}}>
                    {statusList.map((s => <option key={s} value={s}>{s}</option>))}
                </Form.Control>
                {isExecuted && <>
                    <Form.Label>Wprowadz czas trwania wykładu w godzinach</Form.Label>
                    <Form.Control style={{width: "20%"}} type="number" step="0.1" defaultValue={0}
                                  name="duration"
                                  onChange={formChange}/>
                    <h5 className={"mt-3"}>Zaznacz liste uczestników</h5>
                    <div>
                        {studentList.map(student =>
                            <Form.Check type="checkbox"
                                        key={student.id}
                                        id={student.id}
                                        checked={presentList.some(item => item === student.id)}
                                        onChange={presentCheckboxChange}
                                        label={`${student.user.firstName} ${student.user.lastName}`}/>
                        )}
                    </div>

                </>}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={formSubmit}>Zatwierdź</Button>
                <Button onClick={props.cancel}>Anuluj</Button>
            </Modal.Footer>
        </Modal>
    )
}