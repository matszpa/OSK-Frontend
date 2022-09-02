import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import moment from "moment";

export const NewLectureModal = (props) => {
    const [instructorList, setInstructorList] = useState([])
    const [categories, setCategories] = useState([]);
    const [newLectureData, setNewLectureData] = useState({
        date: null,
        instructorId: null,
        categoryId: null,
        topic: "",
    })
    useEffect(() => {
        fetch("http://localhost:8000/categories")
            .then((res) => res.json())
            .then((res) => setCategories(res));

    }, [])
    const getInstructors = (e) => {
        setNewLectureData({...newLectureData, [e.target.name]: parseInt(e.target.value)})
        fetch(`http://localhost:8000/instructors/${e.target.value}`)
            .then((res) => res.json())
            .then((res) => setInstructorList(res));
    }
    const handleChangeInstructor = () => {

    }

    const formOnChange = (e) => {
        setNewLectureData({...newLectureData, [e.target.name]: e.target.value})
    }
    const formSubmit = (e) => {
        fetch("http://localhost:8000/addNewLecture", {
            method: "POST",
            body: JSON.stringify(newLectureData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            window.location.reload(false)
        })

    }
    return (
        <Modal show={props.show}>
            <Modal.Header>Tworzenie wykładu</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Data wykładu</Form.Label>
                    <Form.Control type="datetime-local" name="date"
                        // min={moment().format("YYYY-MM-DD[T]HH:mm")}
                                  defaultValue={moment().format("YYYY-MM-DD[T]HH:mm")}
                                  onChange={formOnChange}/>
                    <Form.Label>Kategoria</Form.Label>
                    <Form.Control as="select" name="categoryId" onChange={getInstructors}>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Form.Control>
                    <Form.Label>Wybierz instruktora</Form.Label>
                    <Form.Control as="select" name="instructorId" onChange={formOnChange}>
                        <option selected disabled>Intruktorzy</option>
                        {instructorList.map((i) => <option key={i.id} value={i.id}>{i.firstName} {i.lastName}</option>)}
                    </Form.Control>
                    <Form.Label>Temat wykładu</Form.Label>
                    <Form.Control as="textarea" name="topic" onChange={formOnChange}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={formSubmit}>Zatwiedź</Button>
                <Button onClick={props.cancel}>Anuluj</Button>
            </Modal.Footer>
        </Modal>
    )
}