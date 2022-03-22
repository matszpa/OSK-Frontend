import styles from './ProfilePage.module.scss'
import {useEffect, useState} from "react";
import {Frame} from "../components/HelperComponents/Frame";
import {Button, Form} from 'react-bootstrap'
import {Message} from "../components/HelperComponents/Message";
import EditIcon from '@mui/icons-material/Edit';
import {EditProfileModal} from "../components/ProfilePageComponents/EditProfileModal";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';

const PasswordSchema = yup.object().shape({
    old_password: yup.string().required("Podaj stare hasło"),
    new_password: yup.string().min(8, 'Minimalna długość hasła to 8 znaków').required("Podaj nowe hasło"),
    repeat_password: yup.string().oneOf([yup.ref("new_password"), null], "Podane hasła się nie zgadzają!"),
})

const EmailSchema = yup.object().shape({
    email: yup.string().email("Podaj poprawny email").required("To pole jest wymagane"),
    reapet_email: yup.string().oneOf([yup.ref("email"), null], "Podane emaile się nie zgadzają!"),
    password: yup.string().required("Hasło jest wymagane"),
})
export const ProfilePage = () => {
    const {
        register: passwordRegister,
        handleSubmit: passwordHandleSumbit,
        formState: {errors: errorsPassword}
    } = useForm({
        resolver: yupResolver(PasswordSchema),
    });
    const {
        register: emailRegister,
        handleSubmit: emailHandleSumbit,
        formState: {errors: errorsEmail}
    } = useForm({
        resolver: yupResolver(EmailSchema),
    });
    const [userData, setUserData] = useState(null)
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
        fetch("http://localhost:8000/changePassword", {
            method: "PUT",
            body: JSON.stringify({
                old_password: e.old_password,
                new_password: e.new_password
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

    }
    const changeEmail = (e) => {
        console.log(e)
        fetch("http://localhost:8000/changeEmail", {
            method: "PUT",
            body: JSON.stringify({
                password: e.password,
                new_email: e.email
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
                <Frame className={styles.profileFrame}>
                    <h4>Zmień hasło</h4>
                    <div>
                        <Form onSubmit={passwordHandleSumbit(changePassword)} style={{width: "100%"}}>
                            <Form.Control name="old_password" type="password"
                                          {...passwordRegister('old_password')}
                                          placeholder="Stare hasło"/>
                            <p className={"text-danger"}>{errorsPassword.old_password?.message}</p>
                            <Form.Control name="new_password" type="password"
                                          {...passwordRegister('new_password')}
                                          placeholder="Nowe hasło"/>
                            <p className={"text-danger"}>{errorsPassword.new_password?.message}</p>
                            <Form.Control name="repeat_password" type="password"
                                          {...passwordRegister('repeat_password')}
                                          placeholder="Potwierdz nowe hasło"/>
                            <p className={"text-danger"}>{errorsPassword.repeat_password?.message}</p>
                            <Button type="submit">Potwierdz</Button>
                        </Form>

                    </div>
                </Frame>
                <Frame className={styles.profileFrame}>
                    <h4>Zmień Email</h4>
                    <div>
                        <Form onSubmit={emailHandleSumbit(changeEmail)}>
                            <Form.Control name="email" type="text"
                                          {...emailRegister('email')}
                                          placeholder="Nowy email"/>
                            <p className={"text-danger"}>{errorsEmail.email?.message}</p>
                            <Form.Control name="reapet_email" type="text"
                                          {...emailRegister('reapet_email')}
                                          placeholder="Powtórz email"/>
                            <p className={"text-danger"}>{errorsEmail.reapet_email?.message}</p>
                            <Form.Control name="password" type="password"
                                          {...emailRegister('password')}
                                          placeholder="Twoje hasło"/>
                            <p className={"text-danger"}>{errorsEmail.password?.message}</p>
                            <Button type="submit">Potwierdz</Button>
                        </Form>
                    </div>
                </Frame>
            </div>
            <Message text={message}/>
        </div>
    )
}