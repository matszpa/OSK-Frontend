import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import styles from '../components/AdminPageComponents/AdminContent.module.scss'
import {useNavigate} from "react-router-dom";
import {Frame} from "../components/HelperComponents/Frame";

export const AddNewUser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: null,
        email: "",
        role: null,
        categories: []
    });
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            });

    }, [])
    const changeUser = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
    const checkbox = (event) => {
        let catId = parseInt(event.target.id)
        let newArray = [...user.categories, catId];
        if (user.categories.includes(catId)) {
            newArray = newArray.filter(e => e !== parseInt(event.target.id));
        }
        setUser({
            ...user,
            categories: newArray
        });
    }
    const submit = (e) => {
        e.preventDefault()
        console.log(user)
        fetch("http://localhost:8000/newUser", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => navigate("/users"))
    }
    return (
        <div style={{width: "70%", margin: "auto"}}>
            <Frame>
                <h3>Wprowadz dane uzytkownika</h3>
                <Form onSubmit={submit} style={{width: "100%"}}>
                    <Form.Group>
                        <Form.Label>Imie</Form.Label>
                        <Form.Control value={user.firstName} name="firstName" type="input" onChange={changeUser}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control value={user.lastName} name="lastName" type="input" onChange={changeUser}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number telefonu</Form.Label>
                        <Form.Control value={user.phoneNumber} name="phoneNumber" type="number" onChange={changeUser}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Adres e-mail</Form.Label>
                        <Form.Control value={user.email} name="email" as="input" onChange={changeUser}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Wybierz role</Form.Label>
                        <Form.Control name="role" value={user.role} as="select" onChange={changeUser}>
                            <option disabled selected>Wybierz typ użytkownika</option>
                            <option value="STUDENT">Kursant</option>
                            <option value="INSTRUCTOR">Instruktor</option>
                        </Form.Control>
                    </Form.Group>
                    {user.role === "INSTRUCTOR" &&
                        <Form.Group className="mb-1">
                            <Form.Label>Wybierz kategorie dla instruktora</Form.Label>
                            <Row>
                                {categories.map((c) => (
                                    <Col sm={4} lg={1} key={c.id}>
                                        <Form.Check type="checkbox"
                                                    checked={user.categories.some((item) => item === c.id)}
                                                    nome="categories"
                                                    label={c.name}
                                                    id={c.id}

                                                    onChange={checkbox}/>
                                    </Col>))}
                            </Row>
                        </Form.Group>
                    }
                    <div className={"mt-4"} style={{"display": "flex", justifyContent: "space-between"}}>
                        <Button type="submit">Dodaj</Button>
                        <Button onClick={() => navigate("/users")}>Anuluj</Button>
                    </div>

                </Form>
            </Frame>

        </div>
    )
}