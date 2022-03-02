import {Col, Card} from "react-bootstrap";
import styles from './Category.module.scss'

export const Category = (props) => {
    return (
            <Card className={styles.cardStyle}>
                <Card.Img variant="top" src="https://thumbs.dreamstime.com/b/online-testa-wektor-97658656.jpg"/>
                <Card.Body className={styles.singleCat}>
                    <Card.Title>Kategoria {props.name}</Card.Title>
                </Card.Body>
            </Card>

    )
}