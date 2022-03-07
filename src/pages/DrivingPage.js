import {Button, Form, Modal} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {DrivingForm} from "../components/DrivingPageComponents/DrivingForm";
import {DrivingTable} from "../components/DrivingPageComponents/DrivingTable";
import AuthContext from "../Context/AuthProvider";
import {format} from "date-fns";
import {Frame} from "../components/HelperComponents/Frame";

export const DrivingPage = () => {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const {user} = useContext(AuthContext);
    const [upcoingDriving, setUpcomingDriving] = useState([]);
    const [pastDriving, setPastDriving] = useState([]);
    const [selectedDriving, setSelectedDriving] = useState(null)
    const [cancelDriving, setCancelDriving] = useState(null)
    useEffect(() => {
            fetch("http://localhost:8000/drivingList", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                }
            })
                .then((res) => res.json())
                .then((res) => {
                    var upcoming = [];
                    var past = [];
                    res.filter((single) => new Date(single.day).getTime() > Date.now() ? upcoming.push(single) : past.push(single)
                    )
                    setPastDriving(past);
                    setUpcomingDriving(upcoming);
                })
        },
        []
    )

    const editDriving = (driving) => {
        setSelectedDriving(driving);
    }
    const onchangeStatus = (e) => {
        setSelectedDriving({...selectedDriving, [e.target.name]: e.target.value})
    }
    const confirmStatusChange = () => {
        fetch(`http://localhost:8000/changeStatus/${selectedDriving.id}`, {
            method: "PUT",
            body: JSON.stringify(selectedDriving),
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            }
        })
            .then((res) => res.json())
            .then((res) => setPastDriving(pastDriving.map(d => {
                if (d.id === res.id) {
                    d.comment = res.comment;
                    d.status = res.status
                    return d;
                }
                return d;
            })))
        setSelectedDriving(null)
    }
    const handleCancelDriving = (driving) => {
        setCancelDriving(driving);
    }
    const confirmCancelDriving = () => {
        fetch(`http://localhost:8000/cancelDriving/${cancelDriving.id}`, {
            method: "DELETE",
        }).then((res) => res.json())
            .then(res => {
                var tmp = upcoingDriving.filter((d) => d.id !== res ? d : "");
                setUpcomingDriving(tmp);
                setCancelDriving(null)
            })
    }
    return (
        <div>
            {(!isFormOpen && user.role === 'ADMIN') && <><Button onClick={() => setIsFormOpen(!isFormOpen)}>Utworz
                jazdy</Button>
            </>}
            {isFormOpen ?
                <DrivingForm close={() => window.location.reload(false)} cancel={() => setIsFormOpen(false)}/> : <>
                    <h2>Nadchodzące jazdy</h2>
                    <Frame>
                        <DrivingTable list={upcoingDriving} text="Anuluj" buttonClick={handleCancelDriving}/>
                    </Frame>

                    <hr style={{marginTop: "40px"}}/>
                    <h2>Zrealizowane jazdy</h2>
                    <Frame>
                        <DrivingTable list={pastDriving} text="Zmień status" buttonClick={editDriving}/>
                    </Frame>
                </>
            }
            <Modal show={selectedDriving}>
                <Modal.Header>Zmień status</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Status jazd</Form.Label>
                        <Form.Control as="select" defaultValue={selectedDriving ? selectedDriving.status : ""}
                                      name="status"
                                      onChange={onchangeStatus}>
                            <option value="Nowa">Nowa</option>
                            <option value="Zrealizowana">Zrealizowana</option>
                            <option value="Anulowana">Anulowana</option>
                        </Form.Control>
                        <Form.Label>Komentarz</Form.Label>
                        <Form.Control as="textarea" name="comment"
                                      value={selectedDriving ? selectedDriving.comment : ""}
                                      onChange={onchangeStatus}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={confirmStatusChange}>Zatwierdz</Button>
                    <Button onClick={() => setSelectedDriving(null)}>Anuluj</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={cancelDriving !== null}>
                <Modal.Header>Czy napewno chcesz anulować jazdy?</Modal.Header>
                <Modal.Body>
                    {cancelDriving !== null ? <div>
                        Data:
                        <p>{format(new Date(cancelDriving.day), 'dd/MM/yyyy')} o godzinie: {cancelDriving.hour}</p>
                        Kursant:
                        <p>{cancelDriving.training.user.firstName} {cancelDriving.training.user.lastName}</p>
                    </div> : ""}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={confirmCancelDriving}>Zatwierdz</Button>
                    <Button onClick={() => setCancelDriving(null)}>Anuluj</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}