import styles from './spinner.module.scss'
const Spinner = ({ customClass }) => {
    return (
        <div className={[styles.spinner, customClass].join(' ')}>
        </div>
    )
}
export default Spinner