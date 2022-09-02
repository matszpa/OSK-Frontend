import {Button, Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import styles from '../components/AdminPageComponents/AdminContent.module.scss'
import {useNavigate} from "react-router-dom";
import {Frame} from "../components/HelperComponents/Frame";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required("Imie jest wymagane"),
    lastName: yup.string().required("Nazwisko jest wymagane"),
    phoneNumber: yup.number("Wprowadz numer").typeError('Numer jest wymagany').positive("Numer nie moze byc ujemny").integer("Liczba musi byc całkowita"),
    email: yup.string().email("To nie jest email").required("Email jest wymagany"),
    role: yup.string().required("Rola jest wymagana"),
})

export const AddNewUser = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const [message, setMessage] = useState("");
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
        setUser({...user, [e.target.name]: e.target.value})
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
        fetch("http://localhost:8000/newUser", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.message) {
                    setMessage(res.message)
                } else {
                    navigate("/users")
                }
            })
    }
    return (
        <div style={{width: "70%", margin: "auto"}}>
            <Frame>
                <h3>Wprowadz dane uzytkownika</h3>
                <Form onSubmit={handleSubmit(submit)} style={{width: "100%"}}>
                    <Form.Group>
                        <Form.Label>Imie</Form.Label>
                        <Form.Control name="firstName" type="input" id="firstName"
                                      {...register('firstName')}
                                      onChange={changeUser}/>

                        <p className={"text-danger"}>{errors.firstName?.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control name="lastName" type="input"
                                      {...register('lastName')}
                                      onChange={changeUser}/>
                        <p className={"text-danger"}>{errors.lastName?.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Number telefonu</Form.Label>
                        <Form.Control name="phoneNumber" type="number"
                                      {...register('phoneNumber')}
                                      onChange={changeUser}/>
                        <p className={"text-danger"}>{errors.phoneNumber?.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Adres e-mail</Form.Label>
                        <Form.Control name="email" as="input"
                                      {...register('email')}
                                      onChange={changeUser}/>
                        <p className={"text-danger"}>{errors.email?.message}</p>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Wybierz role</Form.Label>
                        <Form.Control name="role" value={user.role} as="select"
                                      {...register('role')}
                                      onChange={changeUser}>
                            <option disabled selected>Wybierz typ użytkownika</option>
                            <option value="STUDENT">Kursant</option>
                            <option value="INSTRUCTOR">Instruktor</option>
                        </Form.Control>
                        <p className={"text-danger"}>{errors.role?.message}</p>
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
                    {message !== "" && <p className="alert-danger">{message}</p>}
                    <div className={"mt-4"} style={{"display": "flex", justifyContent: "space-between"}}>
                        <Button type="submit">Dodaj</Button>
                        <Button onClick={() => navigate("/users")}>Anuluj</Button>
                    </div>

                </Form>
            </Frame>

        </div>
    )
}