import {Link} from "react-router-dom";
import styles from './NotFound.module.scss'
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';

export const NotFound = () => {

    return (
        <div className={styles.notFoundContainer}>
            <h2>Nie znaleziono strony</h2>
            <DesktopAccessDisabledIcon className={styles.icon}/>
            <Link to="/">Wróć na strone główną</Link>
        </div>
    )
}