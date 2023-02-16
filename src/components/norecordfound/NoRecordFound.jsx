import styles from './norecordfound.module.scss'
const NoRecordFound = () => {
    return (
        <div className={styles.norecordFoundContainer}>
            <span className={styles.norecordFoundText}> No Records Found</span>
        </div>
    )
}
export default NoRecordFound;