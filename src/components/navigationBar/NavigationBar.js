import styles from './NavigationBar.module.scss';

import {useEffect, useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import {useNavigate} from "react-router-dom";

const NavigationBar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(AuthContext);
    useEffect(() => {

    })
    const logout = () => {
        localStorage.removeItem("token");
        let user = {username: '', role: ''};
        setUser(user)
        navigate("/")
    }
    return (
        <nav className={styles.navHeader}>
            <Link to="/"><img className={styles.logo}
                              src="https://cdn3.iconfinder.com/data/icons/font-awesome-solid/512/car-512.png"/></Link>
            <ul className={styles.nav_link}>
                {user.role === 'STUDENT' && <>
                    <LiLink link="/singleQuestion" text="Jedno pytanie"/>
                    <LiLink link="/exam" text="Test próbny"/>
                    <LiLink link="/training" text={"Szkolenia"}/>
                </>}
                {user.role === 'ADMIN' &&
                    <>
                        {/*<LiLink link="/admin" text="Admin"/>*/}
                        <LiLink link="/qustions" text={"Pytania"}/>
                        <LiLink link="/users" text={"Użytkownicy"}/>
                        <LiLink link="/training" text={"Szkolenia"}/>

                    </>
                }
                {user.role !== "" && <>
                    <LiLink link="/driving" text={"Jazdy"}/>
                    <LiLink link="/profile" text={"Profil"}/>
                </>
                }

                {user.role === '' ?
                    <li>
                        <NavLink to="/login"
                        >Zaloguj</NavLink>
                    </li> :
                    <li onClick={logout}>Wyloguj</li>}

            </ul>
        </nav>
    )
}

export default NavigationBar;

const LiLink = (props) => {
    return (
        <li>
            <NavLink to={props.link} className={({isActive}) => isActive ? styles.active : ""}
            >{props.text}</NavLink>
        </li>
    )
}
// className={({isActive}) => isActive ? styles.active : ""}