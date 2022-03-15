import styles from './ProfilePage.module.scss'
import {useContext, useEffect, useState} from "react";
import {Frame} from "../components/HelperComponents/Frame";
import {Button, Form} from 'react-bootstrap'
import {Message} from "../components/HelperComponents/Message";
import EditIcon from '@mui/icons-material/Edit';
import {EditProfileModal} from "../components/ProfilePageComponents/EditProfileModal";

export const ProfilePage = () => {
    const [userData, setUserData] = useState(null)
    const [password, setPassword] = useState(null)
    const [emailChange, setEmailChange] = useState({
        email: "",
        repeat_email: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const [showEdit, setShowEdit] = useState(false)
    const hideMessage = () => {
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }
    useEffect(() => {
        fetch("http://localhost:8000/userInfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json())
            .then((res) => setUserData(res))
            .catch((err) => console.log(err))
    }, [])
    const changePassword = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/changePassword", {
            method: "PUT",
            body: JSON.stringify({
                old_password: password.old_password,
                new_password: password.new_password
            }),
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setMessage(res.message)
                    setPassword(null);
                } else {
                    setMessage(res.message)
                }
            })

    }
    const changeEmail = (e) => {
        e.preventDefault()
        fetch("http://localhost:8000/changeEmail", {
            method: "PUT",
            body: JSON.stringify({
                password: emailChange.password,
                new_email: emailChange.email
            }),
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json())
            .then((res) => {
                if (res.status === 200) {
                    setMessage(res.message)
                } else {
                    setMessage(res.message)
                }
            })
        hideMessage();

    }
    const handleChange = (e) => {
        setPassword({...password, [e.target.name]: e.target.value})
    }
    const handleEmailChange = (e) => {
        setEmailChange({...emailChange, [e.target.name]: e.target.value})
    }
    const changeProfile = (data) => {
        fetch("http://localhost:8000/changeProfileData", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json())
            .then((res) => {
                console.log(res)
                setUserData(res);
                setShowEdit(false)
            })
    }
    return (
        <div className={styles.profilePage}>
            <Frame className={styles.frameStyles}>
                <h3>Twoje dane <EditIcon style={{marginLeft: "2rem", marginBottom: "0.5rem", cursor: "pointer"}}
                                         onClick={() => setShowEdit(true)}/></h3>
                <div>{userData?.firstName} {userData?.lastName}</div>
                <div><span>Numer telefonu:</span> {userData?.phoneNumber}</div>
                <div><span>Adres email:</span> {userData?.email}</div>
            </Frame>
            <EditProfileModal show={showEdit} data={userData}
                              changeProfile={changeProfile}
                              cancel={() => setShowEdit(false)}/>
            <div className={styles.bottomDiv}>
                <Frame>
                    <h4>Zmień hasło</h4>
                    <div>
                        <Form onSubmit={changePassword}>
                            <Form.Control name="old_password" type="password"
                                          onChange={handleChange}
                                          placeholder="Stare hasło"/>
                            <Form.Control name="new_password" type="password" onChange={handleChange}
                                          placeholder="Nowe hasło"/>
                            <Form.Control name="repeat_password" type="password" onChange={handleChange}
                                          placeholder="Potwierdz nowe hasło"/>
                            <Button type="submit">Potwierdz</Button>
                        </Form>

                    </div>
                </Frame>
                <Frame>
                    <h4>Zmień Email</h4>
                    <div>
                        <Form onSubmit={changeEmail}>
                            <Form.Control name="email" value={emailChange.email} type="text"
                                          onChange={handleEmailChange}
                                          placeholder="Nowy email"/>
                            <Form.Control name="reapet_email" type="text" onChange={handleEmailChange}
                                          value={emailChange.repeat_email}
                                          placeholder="Powtórz email"/>
                            <Form.Control name="password" type="password" onChange={handleEmailChange}
                                          value={emailChange.password}
                                          placeholder="Twoje hasło"/>
                            <Button type="submit">Potwierdz</Button>
                        </Form>
                    </div>
                </Frame>
            </div>
            <Message text={message}/>
        </div>
    )
}