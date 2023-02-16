import styles from './spanflex.module.scss'
const Spanflex = ({ label, value, customClass, customClassLabel, customClassValue }) => {
    return (
        <div className={[styles.spanFlexContainer, customClass].join(' ')}>
            <span className={[styles.spanFlexLabel, customClassLabel].join(' ')}>
                {label}
            </span>
            <span className={[styles.spanFlexValue, customClassValue].join(' ')}>
                {value}
            </span>
        </div>
    )
}
export default Spanflex;