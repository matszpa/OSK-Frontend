import {useEffect, useState} from "react";
import styles from './QuestionList.module.scss'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {Question} from "../Question/Question";
import {Link, useNavigate} from "react-router-dom";

export const QuestionList = () => {
    const [questionArray, setQuestionArray] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:8000/questionList")
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setQuestionArray(res)
            })
    }, [])
    const deleteQuestion = (id) => {
        console.log(id)
    }
    const edit = (id) => {
        navigate(`/editQuestion/${id}`);
    }
    return (
        <div className={styles.container}>
            <Link to="/addQuestion">Dodaj pytanie</Link>
            {questionArray.map((q) => (
                <div key={q.id}>
                    <hr/>
                    <p className={styles.questionContent}>Identyfikator pytania: {q.id}<span>
                        <DeleteForeverIcon
                            onClick={() => edit(q.id)}/>
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