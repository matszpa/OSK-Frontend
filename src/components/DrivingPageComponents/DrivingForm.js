import {Button, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {format} from "date-fns";
import moment from 'moment';

export const DrivingForm = (props) => {
    const [instructorList, setInstructorList] = useState([])
    const [categories, setCategories] = useState([])
    const [hours, setHours] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const today = new Date();
    const [newDriving, setNewDriving] = useState({
        // day: new Date().toISOString().substr(0, 10),
        day: moment().add(1, 'days').toISOString().substr(0, 10),
        categoryId: null,
        instructorId: null,
        drivingList: []
    })
    useEffect(() => {
        console.log(today)
        fetch("http://localhost:8000/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            });
    }, [])
    const getInstructors = (e) => {
        setNewDriving({...newDriving, [e.target.name]: e.target.value})
        fetch(`http://localhost:8000/instructors/${e.target.value}`)
            .then((res) => res.json())
            .then((res) => setInstructorList(res));
    }
    const getStudents = (hour) => {
        fetch(`http://localhost:8000/getAvalibleStudents/${newDriving.categoryId}?hour=${hour}&day=${newDriving.day}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setStudentList(res)
            });
    }
    const handleChangeInstructor = (e) => {
        fetch(`http://localhost:8000/getAvalibleHoursForInstructor/${e.target.value}?day=${newDriving.day}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setHours(res)
            });
        setNewDriving({...newDriving, [e.target.name]: e.target.value})
    }
    const handleChange = (e) => {
        setNewDriving({...newDriving, [e.target.name]: e.target.value})
    }

    const addDrivingToList = (e, hour) => {
        var driving = {
            trainingId: parseInt(e.target.value),
            hour: hour
        }
        var newDrivingList = newDriving.drivingList;
        if (newDriving.drivingList.some(obj => obj.hour === hour)) {
            newDrivingList.filter((singleDriving) => singleDriving.hour === hour ? singleDriving.trainingId = parseInt(e.target.value) : singleDriving)
        } else {
            newDrivingList.push(driving);
        }
        setNewDriving({...newDriving, drivingList: newDrivingList})
    }

    const sendNewDriving = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/addDriving", {
            method: "POST",
            body: JSON.stringify(newDriving),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => props.close())
    }
    return (
        <div>
            <Form onSubmit={sendNewDriving}>
                <Form.Group>
                    <Form.Label>Wybierz date</Form.Label>
                    <Form.Control name="day" type="date" onChange={handleChange}
                                  defaultValue={newDriving.day}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Wybierz kategorie</Form.Label>
                    <Form.Control as="select" name="categoryId" onChange={getInstructors}>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Wybierz instruktora</Form.Label>
                    <Form.Control as="select" name="instructorId" onChange={handleChangeInstructor}>
                        <option selected disabled>Intruktorzy</option>
                        {instructorList.map((i) => <option key={i.id} value={i.id}>{i.firstName} {i.lastName}</option>)}
                    </Form.Control>
                </Form.Group>

                <Table>
                    <thead>
                    <tr>
                        <th>Godzina</th>
                        <th>Kursant</th>
                    </tr>
                    </thead>
                    <tbody>

                    {hours.map((hour, i) =>
                        (hour !== false ?
                            <tr key={i}>
                                <td key={hour}>{hour}</td>
                                <td>
                                    <Form.Control as="select" onClick={() => getStudents(hour)}
                                                  onChange={(event) => addDrivingToList(event, hour)}>
                                        <option selected disabled>Wybierz kursanta</option>
                                        {studentList.length > 0 ? studentList.map((s) =>
                                            <option
                                                key={s.id}
                                                value={s.id}>{s.user.firstName} {s.user.lastName} Rozpoczął: {format(new Date(s.startDate), 'dd/MM/yyyy')} Wyjeżdżone
                                                godziny: {s.drivingHours}</option>) : ""}
                                    </Form.Control>
                                </td>
                            </tr> : "")
                    )}
                    </tbody>
                </Table>
                <div style={{'display': 'flex', 'justify-content': 'space-between'}}>
                    <Button type="submit">Utworz jazdy</Button>
                    <Button onClick={props.cancel} variant="danger">Anuluj</Button>
                </div>

            </Form>
        </div>

    )
}