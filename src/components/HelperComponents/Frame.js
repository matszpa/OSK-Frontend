import styles from './Frame.module.scss'

export const Frame = (props) => {
    return (
        <div className={`${styles.frame} ${props?.className}`}>
            {props.children}
        </div>
    )
}