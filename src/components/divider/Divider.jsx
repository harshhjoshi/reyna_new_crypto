import styles from './divider.module.scss'

const Divider = ({ customClass }) => {
    return (
        <hr className={[styles.divider, customClass].join(' ')} />
    )
}
export default Divider;