import {useEffect, useState, useContext} from "react";
import {Button, Table} from "react-bootstrap";
import {Frame} from "../components/HelperComponents/Frame";
import {NewLectureModal} from "../components/LecturePageComponents/NewLectureModal";
import moment from "moment";
import {ChangeLectureStatus} from "../components/LecturePageComponents/ChangeLectureStatus";
import {CancelLectureModal} from "../components/LecturePageComponents/CancelLectureModal";
import AuthContext from "../Context/AuthProvider";

export const LecturePage = () => {
    const {user} = useContext(AuthContext)
    const [lectureList, setLectureList] = useState([])
    const [showAddNew, setShowAddNew] = useState(false)
    const [lecture, setLecture] = useState(null)
    const [cancelLecture, setCancelLecture] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/getLectures", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            }
        })
            .then((res) => res.json())
            .then((res) => setLectureList(res))
    }, [])

    const changePastLectureStatus = (lecture) => {
        setLecture(lecture);
    }
    const changeStatus = (object) => {
        fetch(`http://localhost:8000/changeStatusLectureStatus/${lecture.id}`, {
            method: "PUT",
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
            .then((res) => {
                var array = lectureList;
                array.map((lecture) => lecture.id === res.id ? lecture.status = res.status : lecture);
                setLectureList(array)
                setLecture(null)
            })
    }
    const confirmCancelLecture = () => {
        fetch(`http://localhost:8000/changeStatusLectureStatus/${cancelLecture.id}`, {
            method: "PUT",
            body: JSON.stringify({status: "Odwołany"}),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            var array = lectureList;
            array.map((lecture) => lecture.id === res.id ? lecture.status = res.status : lecture);
            setLectureList(array)
            setCancelLecture(null)
        })


    }
    return (
        <div>
            {user.role === "ADMIN" && <Button onClick={() => setShowAddNew(!showAddNew)}>Dodaj wykład</Button>}

            <NewLectureModal show={showAddNew} cancel={() => setShowAddNew(!showAddNew)}/>
            <CancelLectureModal show={cancelLecture !== null} cancel={() => setCancelLecture(null)}
                                confirmCancelLecture={confirmCancelLecture} lecture={cancelLecture}/>
            <ChangeLectureStatus show={lecture !== null} cancel={() => setLecture(null)} lecture={lecture}
                                 changeStatus={changeStatus}/>
            <h2>Nadchodzące wykłady</h2>
            <Frame>
                <Table>
                    <thead>
                    <tr>
                        <td>Data</td>
                        <td>Kategoria</td>
                        <td>Temat</td>
                        <td>Prowadzący</td>
                        <td>Status</td>
                    </tr>
                    </thead>
                    <tbody>
                    {lectureList.map(lecture => (new Date(lecture.date) > Date.now() &&
                            <tr key={lecture.id}>
                                <td>{moment(lecture.date).format("YYYY-MM-DD HH:mm")}</td>
                                <td>{lecture.licenceCategory.name}</td>
                                <td>{lecture.topic}</td>
                                <td>{lecture.user.firstName} {lecture.user.lastName}</td>
                                <td>{lecture.status}</td>
                                <td style={{whiteSpace: 'nowrap'}}>

                                    {lecture.status === "Zaplanowany" && <>
                                        {(user.role === "ADMIN" || user.role === "INSTRUCTOR") &&
                                            <Button onClick={() => setCancelLecture(lecture)}>Odwołaj
                                                wykład</Button>}</>}
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </Frame>
            <h2>Historia wykładów</h2>
            <Frame>
                <Table>
                    <thead>
                    <tr>
                        <td>Data</td>
                        <td>Kategoria</td>
                        <td>Temat</td>
                        <td>Prowadzący</td>
                        <td>Status</td>
                        <td>Czas trwania</td>
                        {user.role === "STUDENT" && <td>Obecny</td>}
                    </tr>
                    </thead>
                    <tbody>
                    {lectureList.map(lecture => (new Date(lecture.date) < Date.now() &&
                            <tr key={lecture.id}>
                                <td>{moment(lecture.date).format("YYYY-MM-DD HH:mm")}</td>
                                <td>{lecture.licenceCategory.name}</td>
                                <td>{lecture.topic}</td>
                                <td>{lecture.user.firstName} {lecture.user.lastName}</td>
                                <td>{lecture.status}</td>
                                <td>{lecture.duration} godz.</td>
                                {user.role === "STUDENT" &&
                                    <td>{lecture.lecturePresences[0].trainingId ? "Obecny" : "Nieobecny"}</td>}
                                <td style={{whiteSpace: 'nowrap'}}>
                                    {(lecture.status === "Zaplanowany") && <>
                                        {(user.role === "ADMIN" || user.role === "INSTRUCTOR") &&
                                            <Button onClick={() => changePastLectureStatus(lecture)}>
                                                Zmień status</Button>}</>}
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </Table>
            </Frame>
        </div>)
}