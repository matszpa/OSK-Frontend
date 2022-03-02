import {Button, Form} from "react-bootstrap";
import {useState, useContext} from "react";
import styles from './LoginPage.module.scss'
import AuthContext from "../Context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {Message} from "../components/HelperComponents/Message";

export const LoginPage = () => {
    const {setUser} = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const hideMessage = () => {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }
    const login = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.message)
                    throw new Error(res.message)
                localStorage.setItem("token", res.token);
                const role = res.userInfo.role
                setUser({userInfo: res.userInfo, role: role})
            }).then(() => {
            navigate('/')
        }).catch((err) => {
            setMessage(err.message)
            hideMessage();
        })


    }
    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    return (
        <div className={styles.loginContainer}>
            <Form onSubmit={login}>
                <Form.Group>
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control name="email" type="text" onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control name="password" type="password" onChange={handleChange}/>
                </Form.Group>
                <Button type="submit">Zaloguj</Button>
            </Form>
            <Message text={message}/>
        </div>

    )
}