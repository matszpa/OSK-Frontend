import styles from './Message.module.scss'

export const Message = (props) => {

    return (
        <>
            {
                props.text !== "" ?
                    <div className={styles.message}>
                        {props.text}
                    </div> : <div></div>
            }
        </>
    )
}