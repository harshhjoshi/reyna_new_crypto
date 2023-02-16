import styles from './number.module.scss'
const Number = ({ active, number, customClass, customClassNumber }) => {
    return (
        <div className={styles.numberContainer}>
            <div className={[customClass, active ? styles.numberRound : styles.numberRoundDeactive].join(' ')}>
                <span className={[customClassNumber, styles.number].join(' ')}>{number}</span>
            </div>
        </div>
    )
}
export default Number