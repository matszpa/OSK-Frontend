import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Category} from "./Category";
import styles from './CategoryList.module.scss'
import {useNavigate} from "react-router-dom";

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
                if (data.length === 1)
                    navigate(data[0].name)
                setCategories(data)
            });
    }, [])
    return (
        <div className={styles.wrapper}>
            {/*            {categories.map((c)=><li key={c.id}>{c.name}</li>) }*/}
            {categories.map((c) =>
                <Link key={c.id} to={c.name}>
                    <Category key={c.id} name={c.name}/>
                </Link>
            )}
        </div>
    )
}