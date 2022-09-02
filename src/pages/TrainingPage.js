import {useEffect, useState, useContext} from "react";
import {Button, Form, Table, Modal} from "react-bootstrap";
import {format} from 'date-fns';
import AuthContext from "../Context/AuthProvider";
import {PDFDownloadLink} from "@react-pdf/renderer";
import TrainingReport from "../components/PDFComponents/TrainingReport";
import {Frame} from "../components/HelperComponents/Frame";

export const TrainingPage = () => {
    const {user} = useContext(AuthContext)
    // const [trainingList, setTrainingList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userList, setUserList] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTraining, setNewTraining] = useState({})
    const [newPay, setNewPay] = useState({show: false, id: null, value: 0});
    const [endTrainingObject, setEndTrainingObject] = useState(null)
    const [reportData, setReportData] = useState(null)

    const [trainingList, setTrainingList] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            });
        fetch("http://localhost:8000/allTrainings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then(res => setTrainingList(res))

    }, [])
    const change = (e) => {
        fetch(`http://localhost:8000/getTrainingInCategory/${e.target.value}`)
            .then(res => res.json())
            .then(data => {
                setTrainingList(data)
            });
    }
    const choseCat = (e) => {
        fetch(`http://localhost:8000/userTrainingList/${e.target.value}`)
            .then(res => res.json())
            .then(data => {
                setUserList(data)
            });
    }
    const openModal = () => {
        setIsFormOpen(true)
    }
    const handleModalChange = (e) => {
        setNewTraining({...newTraining, [e.target.name]: +e.target.value});
    }
    const addTraining = () => {
        setIsFormOpen(false)
        fetch("http://localhost:8000/addTraining",
            {
                method: "POST",
                body: JSON.stringify(newTraining),
                headers: {
                    "Content-Type": "application/json",
                },

            })
            .then((res) => res.json())
            .then((res) => setTrainingList([...trainingList, res]))
    }
    const handlechangePayAmount = (e) => {
        setNewPay({...newPay, value: e.target.value})
    }
    const changePayAmount = () => {
        fetch(`http://localhost:8000/addPay/${newPay.id}`, {
            method: "POST",
            body: JSON.stringify({pay: parseInt(newPay.value)}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then(res => {
                var tmp = trainingList.map((t) => {
                    if (t.id === res.id) {
                        t.paid = res.paid;
                        return t;
                    } else return t;
                });
                setTrainingList(tmp)
                setNewPay({show: false, id: null, value: 0})
            })
    }
    const endTraining = () => {
        fetch(`http://localhost:8000/endTraining/${endTrainingObject.id}`)
            .then((res) => res.json())
            .then(res => {
                var tmp = trainingList.map((t) => {
                    if (t.id === res.id) {
                        t.endDate = res.endDate;
                        return t;
                    } else return t;
                });
                setTrainingList(tmp)
            })
        setEndTrainingObject(null);
    }
    const getDataForReport = (id) => {
        fetch(`http://localhost:8000/getDataForReport/${id}`)
            .then((res) => res.json())
            .then((res) => setReportData(res))
    }
    return (
        <div>
            {(!isFormOpen && user.role === "ADMIN") && <div style={{display: "flex"}}>
                <Form style={{'width': '200px'}}>
                    <Form.Control as="select" name="category" onChange={change}>
                        <option disabled selected>Wszystkie kategorie</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </Form.Control>
                </Form>
                <Button onClick={openModal} className={"mb-4 ms-4"}>Utwórz szkolenie</Button>

            </div>}
            <Modal show={isFormOpen}>
                <Modal.Header><h4>Utwórz szkolenie</h4></Modal.Header>
                <Modal.Body>
                    <Form style={{marginBottom: '2rem'}}>
                        <Form.Group>
                            <Form.Label>Kategoria</Form.Label>
                            <Form.Control as="select" name="categoryId" onChange={(e) => {
                                handleModalChange(e);
                                choseCat(e)
                            }}>
                                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Wybierz kursanta</Form.Label>
                            <Form.Control as="select" name="studentId" onChange={handleModalChange}>
                                {userList.map((u) => <option key={u.id}
                                                             value={u.id}>{u.firstName} {u.lastName}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Data rozpoczecia szkolenia</Form.Label>
                            <Form.Control name="startDate" type="date"
                                          onChange={(e) => setNewTraining({
                                              ...newTraining,
                                              [e.target.name]: e.target.value
                                          })}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kwota wpłacona</Form.Label>
                            <Form.Control name="paid" type="number" step="0.1" onChange={handleModalChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Całkowity koszt szkolenia</Form.Label>
                            <Form.Control name="totalCost" type="number" onChange={handleModalChange}/>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer><Button onClick={addTraining}>Dodaj</Button><Button
                    onClick={() => setIsFormOpen(!isFormOpen)}>Anuluj</Button></Modal.Footer>
            </Modal>

            <h3 className={"mt-3"}> Aktualne szkolenia:</h3>
            <Frame>
                <Table style={{whiteSpace: "nowrap"}}>
                    <thead>
                    <tr>
                        <th>Kursant</th>
                        <th>Kategoria</th>
                        <th>Rozpoczecie szkolenia</th>
                        <th>Wyjeżdzone godziny</th>
                        <th>Ile wpłacono</th>
                        <th>Koszt szkolenia</th>
                    </tr>
                    </thead>

                    <tbody>
                    {trainingList.map(t => (t.endDate === null &&
                        <tr key={t.id}>
                            <td>{t.user.firstName} {t.user.lastName}</td>
                            <td>{t.licenceCategory.name}</td>
                            <td>{format(new Date(t.startDate), 'dd/MM/yyyy')}</td>
                            {/*<td>{t.endDate ? format(new Date(t.endDate), 'dd/MM/yyyy') : ""}</td>*/}
                            <td>{t.drivingHours}</td>
                            <td>{t.paid} zł</td>
                            <td>{t.totalCost} zł</td>
                            {user.role === "ADMIN" && <>
                                <td><Button onClick={() => setNewPay({...newPay, id: t.id, show: true})}>Dodaj
                                    Wpłate</Button></td>
                                <td><Button onClick={() => {
                                    setEndTrainingObject(t)
                                }}>Zakończ szkolenie</Button></td>
                            </>}

                        </tr>)
                    )}
                    </tbody>
                </Table>
            </Frame>


            <h3 className={"mt-3"}>Zakończone szkolenia:</h3>
            <Frame>
                <Table>
                    <thead>
                    <tr>
                        <th>Kursant</th>
                        <th>Kategoria</th>
                        <th>Rozpoczecie szkolenia</th>
                        <th>Koniec szkolenia</th>
                        <th>Wyjeżdzone godziny</th>
                        <th>Ile wpłacono</th>
                        <th>Koszt szkolenia</th>
                    </tr>
                    </thead>

                    <tbody>
                    {trainingList.map(t => (t.endDate !== null &&
                        <tr key={t.id}>
                            <td>{t.user.firstName} {t.user.lastName}</td>
                            <td>{t.licenceCategory.name}</td>
                            <td>{format(new Date(t.startDate), 'dd/MM/yyyy')}</td>
                            <td>{t.endDate ? format(new Date(t.endDate), 'dd/MM/yyyy') : ""}</td>
                            <td>{t.drivingHours}</td>
                            <td>{t.paid} zł</td>
                            <td>{t.totalCost} zł</td>
                            <td>
                                <Button onClick={() => getDataForReport(t.id)}>Generuj Raport</Button>
                            </td>
                        </tr>)
                    )}
                    </tbody>
                </Table>
            </Frame>


            <ModalCustom show={newPay.show} text="Dodaj wpłate" buttons={[{text: "Dodaj", action: changePayAmount}, {
                text: "Anuluj",
                action: () => setNewPay({show: false, value: 0, id: null})
            }]}>
                <Form>
                    <Form.Group>
                        <Form.Label>Wpisz kwotę jaka została wpłacona</Form.Label>
                        <Form.Control type="number" name="payed" onChange={handlechangePayAmount}/>
                    </Form.Group>
                </Form>
            </ModalCustom>
            <ModalCustom show={endTrainingObject !== null ? true : false} text="Kończenie szkolenia"
                         buttons={[{text: "Zakończ", action: endTraining}, {
                             text: "Anuluj",
                             action: () => setEndTrainingObject(null)
                         }]}>
                <p>{endTrainingObject?.user.firstName} {endTrainingObject?.user.lastName}</p>
                Wyjeżdzone godziny w szkoleniu:{endTrainingObject?.drivingHours}
            </ModalCustom>
            <ModalCustom show={reportData !== null} text="Pobierz raport zakończonego szkolenia"
                         buttons={[{
                             text: "Zamknij", action: () => {
                                 setReportData(null)
                             }
                         }]}>
                <div style={{marginLeft: "150px"}}>
                    <PDFDownloadLink document={<TrainingReport data={reportData}/>}
                                     fileName={`${reportData?.user?.firstName}${reportData?.user?.lastName}.pdf`}>
                        {({loading}) =>
                            loading ? <p>Trwa generowanie raportu</p> :
                                <Button> Zapisz raport</Button>
                        }
                    </PDFDownloadLink></div>
            </ModalCustom>
        </div>
    )
}

const ModalCustom = (props) => {
    return (
        <Modal show={props.show}>
            <Modal.Header><h4>{props.text}</h4></Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>{props.buttons?.map((b) => <Button onClick={b.action}>{b.text}</Button>)}</Modal.Footer>
        </Modal>
    )
}


