import {useState, useEffect, useContext} from "react";
import {format} from "date-fns";
import AuthContext from "../../Context/AuthProvider";
import {Button} from "@mui/material";
import {Table} from "react-bootstrap";

export const DrivingTable = (props) => {

    const {user} = useContext(AuthContext);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <td>Data</td>
                    <td>Godzina</td>
                    <td>Instruktor</td>
                    <td>Kategoria</td>
                    <td>Kursant</td>
                    <td>Status</td>
                    <td>Komentarz</td>
                </tr>
                </thead>
                <tbody>
                {props.list.map((d) => <tr key={d.id}>
                    <td>{format(new Date(d.day), 'dd/MM/yyyy')}</td>
                    <td>{d.hour}</td>
                    <td>{d.user.firstName} {d.user.lastName}</td>
                    <td>{d.training.licenceCategory.name}</td>
                    <td>{d.training.user.firstName} {d.training.user.lastName}</td>
                    <td>{d.status}</td>
                    <td>{d.comment}</td>
                    {(((user.role === 'ADMIN') || (user.role === 'INSTRUCTOR')) && (props.text === "Zmień status") && (d.status === 'Nowa')) ?
                        <td><Button onClick={(e) => props.buttonClick(d)}>{props.text}</Button></td> : ""}
                    {(((user.role === 'ADMIN') || (user.role === 'INSTRUCTOR')) && (props.text === "Anuluj") && (d.status === 'Nowa')) ?
                        <td><Button onClick={(e) => props.buttonClick(d)}>{props.text}</Button></td> : ""}
                </tr>)}
                </tbody>
            </Table>
        </div>
    )
}