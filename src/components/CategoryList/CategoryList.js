import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from './CategoryList.module.scss'
import {useNavigate} from "react-router-dom";
import {ExamHistoryTable} from "../ExamComponents/ExamHistoryTable";

export const CategoryList = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/categoryListForStudent", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: localStorage.getItem("token"),
            },
        })
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            });
    }, [])
    return (
        <div>
            <div className={styles.wrapper}>
                <h2>Dostępne kategorie</h2>

                <ul>
                    {categories.map((c) =>
                        <Link key={c.id} to={c.name}>
                            <li key={c.id}>Kategoria {c.name}</li>
                        </Link>)
                    }
                </ul>
            </div>

            <div className={"mt-2 mb-2"}>
                <h2>Historia rozwiązanych egzaminów</h2>
                <ExamHistoryTable/>
            </div>
        </div>

    )
}