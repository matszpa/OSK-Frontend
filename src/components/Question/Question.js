import {useEffect, useState} from "react";
import styles from './Question.module.scss'
import ReactPlayer from "react-player";

export const Question = (props) => {
    const [answer, setSelectedAnswer] = useState(null);
    const [isMP4, setIsMP4] = useState(false);

    useEffect(() => {
        setSelectedAnswer(null)
        setIsMP4(false)
    }, [])

    useEffect(() => {
        if (props.question.image) {
            if (props.question.image.indexOf(".mp4") > -1) setIsMP4(true);
        }
    }, [props])


    const change = (value) => {
        setSelectedAnswer(value);
        props.selected(value);
    }
    return (
        <div className={styles.question}>
            <h5>{props.question.question}</h5>
            <div className={styles.media}>
                {(props.question.image && isMP4) ?
                    (<ReactPlayer
                        className={styles.video}
                        controls
                        onStart={() => console.log('onStart')}
                        url={props.question.image}/>) : ""
                }
                {(props.question.image && !isMP4) && (<img src={props.question.image} alt="Brak zdjecia"/>)}
            </div>

            {props.question.answers.map((a) => (
                <div>
                    {!props.selectCorrect ?
                        <div className={styles.answers}>
                            <div onClick={() => change(a.content)}>
                                <input
                                    type="radio"
                                    value={a.content}
                                    checked={answer === a.content}
                                /> {a.content}
                            </div>
                        </div> :
                        <div className={styles.check}>
                            <div
                                className={(a.selected ? (a.correct ? styles.correct : styles.wrong) : (a.correct ? styles.correct : ""))}>
                                <input
                                    type="radio"
                                    value={a.content}
                                    checked={a.selected}
                                /> {a.content}
                            </div>
                        </div>}
                </div>
            ))}
        </div>)
}