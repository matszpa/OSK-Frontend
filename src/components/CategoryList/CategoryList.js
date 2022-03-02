import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Category} from "./Category";
import {Col} from "react-bootstrap";
import styles from './CategoryList.module.scss'
export const CategoryList =()=>{
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8000/categories")
            .then(res=>res.json())
            .then(data=> {
                setCategories(data)
            });
    },[])
    return (
        <div className={styles.wrapper}>
{/*            {categories.map((c)=><li key={c.id}>{c.name}</li>)}*/}
            {categories.map((c)=>
                    <Link key={c.id} to={c.name} >
                <Category key={c.id} name={c.name}/>
            </Link>

            )}
        </div>
    )
}