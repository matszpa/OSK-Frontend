import styles from './NavigationBar.module.scss';

import {useEffect, useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {LecturePage} from "../../pages/LecturePage";
import logoBorder from './logoBorder.png'

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
                              alt="logo"
                              src={logoBorder}/></Link>
            <ul className={styles.nav_link}>
                {/*{user.role === 'STUDENT' && <>*/}
                {/*    /!*<LiLink link="/singleQuestion" text="Jedno pytanie"/>*!/*/}
                {/*    /!*<LiLink link="/exam" text="Test próbny"/>*!/*/}
                {/*    <li className={styles.dropdownActivate}>*/}
                {/*        Teoria*/}
                {/*        <div className={styles.dropdown}>*/}
                {/*            <div><Link to="/exam">Próbny egzamin</Link></div>*/}
                {/*            <div><Link to="/singleQuestion">Losowe pytanie</Link></div>*/}
                {/*        </div>*/}
                {/*    </li>*/}
                {/*    <LiLink link="/training" text={"Szkolenia"}/>*/}
                {/*</>}*/}

                <ProtectedLink role={["STUDENT"]} link="/exam" text={"Próbny egzamin"}/>
                <ProtectedLink role={["ADMIN"]} link="/qustions" text={"Pytania"}/>
                <ProtectedLink role={["ADMIN", "INSTRUCTOR", "STUDENT"]} link="/lecture" text={"Wykłady"}/>
                <ProtectedLink role={["ADMIN"]} link="/users" text={"Użytkownicy"}/>
                <ProtectedLink role={["ADMIN", "STUDENT"]} link="/training" text={"Szkolenia"}/>
                <ProtectedLink role={["ADMIN", "INSTRUCTOR", "STUDENT"]} link="/driving" text={"Jazdy"}/>
                <ProtectedLink role={["ADMIN", "INSTRUCTOR", "STUDENT"]} link="/profile" text={"Profil"}/>
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

const ProtectedLink = (props) => {
    const {user} = useContext(AuthContext);
    return (
        <>
            {props?.role.includes(user.role) ?
                <LiLink link={props.link} text={props.text}/>
                : <></>}
        </>
    )
}
// className={({isActive}) => isActive ? styles.active : ""}