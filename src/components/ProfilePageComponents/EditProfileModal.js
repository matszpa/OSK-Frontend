import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

export const EditProfileModal = (props) => {
    const [data, setData] = useState();
    useEffect(() => {
        setData(props.data);
    }, [props.data])
    const changeData = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }
    return (
        <Modal show={props.show}>
            <Modal.Header><h4>Edytuj dane</h4></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Imie</Form.Label>
                    <Form.Control name="firstName" value={data?.firstName} onChange={changeData}/>
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control name="lastName" value={data?.lastName} onChange={changeData}/>
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control type="number" name="phoneNumber" value={data?.phoneNumber} onChange={changeData}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.changeProfile(data)}>Zapisz</Button>
                <Button onClick={props.cancel}>Anuluj</Button>
            </Modal.Footer>
        </Modal>
    )
}