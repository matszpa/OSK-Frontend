import {useEffect, useState} from "react";
import styles from './QuestionList.module.scss'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Question} from "../Question/Question";
import {Link, useNavigate} from "react-router-dom";
import {Button, Modal, Form} from "react-bootstrap";

export const QuestionList = () => {
    const [questionArray, setQuestionArray] = useState([]);
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    const [offset, setOffset] = useState(0);
    const [like, setLike] = useState("");
    useEffect(() => {
        fetch(`http://localhost:8000/questionList?limit=10&offset=${offset}`)
            .then((res) => res.json())
            .then((res) => setQuestionArray(res))
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
    const changePage = (number) => {
        var nextOffset = offset + number;
        setOffset(nextOffset);
        fetch(`http://localhost:8000/questionList?limit=10&offset=${nextOffset}`)
            .then((res) => res.json())
            .then((res) => {
                setQuestionArray(res)
            })
    }
    const handleLikeChange = (e) => {
        fetch(`http://localhost:8000/questionList?limit=10&offset=${offset}&like=${e.target.value}`)
            .then((res) => res.json())
            .then((res) => {
                setQuestionArray(res)
            })
    }
    return (
        <div className={styles.container}>
            <Modal show={showDelete}>
                <Modal.Header>Czy napewno chcesz usunąć to pytanie?</Modal.Header>
                <Modal.Footer><Button onClick={deleteConfirm}>Tak</Button><Button
                    onClick={() => setShowDelete(false)}>Nie</Button></Modal.Footer>
            </Modal>
            <div style={{display: "flex"}}>
                <Link to="/addQuestion"><Button>Dodaj pytanie</Button></Link>
                <Form.Control placeholder="Wyszukaj pytanie" name="like" onChange={handleLikeChange}
                              style={{width: "50%", marginLeft: "60px"}}/>
            </div>

            {questionArray.map((q) => (
                <div key={q.id} style={{marginBottom: "-20px"}}>
                    <hr/>
                    <p className={styles.questionContent}>Identyfikator pytania: {q.id}<span>
                        <DeleteForeverIcon
                            onClick={() => deleteQuestion(q.id)}/>
                    </span>
                    </p>
                    <div style={{maxWidth: "70%", marginLeft: "auto", marginRight: "auto"}}>
                        <Question key={q.id} question={q}/>
                    </div>
                </div>

            ))
            }
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "2rem"}}>
                <Button onClick={() => changePage(-10)}>Poprzednia strona</Button>
                <Button onClick={() => changePage(10)}>Następna strona</Button>
            </div>

        </div>

    )
}