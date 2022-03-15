import {useEffect, useState} from "react";
import styles from './QuestionList.module.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Question} from "../Question/Question";
import {Link, useNavigate} from "react-router-dom";
import {Button, Modal} from "react-bootstrap";

export const QuestionList = () => {
    const [questionArray, setQuestionArray] = useState([]);
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    useEffect(() => {
        fetch("http://localhost:8000/questionList")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setQuestionArray(res)
            })
    }, [])
    const deleteQuestion = (id) => {
        setShowDelete(true)
        setQuestionId(id);
    }
    const deleteConfirm = () => {
        fetch(`http://localhost:8000/deleteQuestion/${questionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        }).then((res) => res.json())
            .then((res) => setQuestionArray(questionArray.filter((q) => q.id !== res)))
        setShowDelete(false)
    }
    const edit = (id) => {
        navigate(`/editQuestion/${id}`);
    }
    return (
        <div className={styles.container}>
            <Modal show={showDelete}>
                <Modal.Header>Czy napewno chcesz usunąć to pytanie?</Modal.Header>
                <Modal.Footer><Button onClick={deleteConfirm}>Tak</Button><Button
                    onClick={() => setShowDelete(false)}>Nie</Button></Modal.Footer>
            </Modal>
            <Link to="/addQuestion">Dodaj pytanie</Link>
            {questionArray.map((q) => (
                <div key={q.id}>
                    <hr/>
                    <p className={styles.questionContent}>Identyfikator pytania: {q.id}<span>
                        <DeleteForeverIcon
                            onClick={() => deleteQuestion(q.id)}/>
                        <EditIcon
                            onClick={() => edit(q.id)}
                        />
                    </span>
                    </p>
                    <Question key={q.id} question={q}/>
                </div>

            ))
            }
        </div>

    )
}