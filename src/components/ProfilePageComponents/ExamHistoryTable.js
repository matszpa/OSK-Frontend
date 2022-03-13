import {Frame} from "../HelperComponents/Frame";
import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import moment from "moment";

export const ExamHistoryTable = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8000/getHistoryForUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token")
            },
        }).then((res) => res.json())
            .then((res) => {
                setData(res)
            })
    })
    return (
        <Frame>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th width="270">Data</th>
                    <th width="170">Kategoria</th>
                    <th>Liczba punktów</th>
                </tr>
                </thead>
                <tbody>
                {data.map(single => <tr key={single.id}>
                    <td>{moment(single.date).format("DD-MM-YYYY HH:MM")}</td>
                    <td>{single.licenceCategory.name}</td>
                    <td>{single.scoredPoints}</td>
                </tr>)}
                </tbody>
            </Table>
        </Frame>
    )
}