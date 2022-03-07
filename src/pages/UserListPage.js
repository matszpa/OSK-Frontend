import {useEffect, useState} from "react";
import styles from '../components/AdminPageComponents/AdminContent.module.scss'
import {Button, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Frame} from "../components/HelperComponents/Frame";

export const UserListPage = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8000/allUsers")
            .then((res) => res.json())
            .then((res) => {
                setUsers(res)
            })
    }, [])
    const addnew = () => {
        navigate("addNewUser")
    }
    return (
        <div className={styles.adminContainer}>
            <Button className={"mb-4"} onClick={addnew}>Dodaj nowego użytkownika</Button>
            <h3>Lista użytkowników</h3>
            <Frame>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Telefon</th>
                        <th>E-mail</th>
                        <th>Rola</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(u =>
                        <tr key={u.id}>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.phoneNumber}</td>
                            <td>{u.email}</td>
                            <td>{u.role === "STUDENT" ? "Kursant" : "Instruktor"}</td>

                        </tr>
                    )}
                    </tbody>
                </Table>
            </Frame>

        </div>
    )
}