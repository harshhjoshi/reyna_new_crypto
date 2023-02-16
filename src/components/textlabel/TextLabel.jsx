import styles from './textlabel.module.scss'
const TextLabel = ({ label, address, customClass, customClassLabel, customClassBox, customClassAddress }) => {
    return (
        <div className={[styles.textLabelContainer, customClass].join(' ')}>
            <span className={[styles.labelText, customClassLabel].join(' ')}>
                {label}
            </span>
            <div className={[styles.textLabelBox, customClassBox].join(' ')}>
                <span className={[styles.textLabelAddress, customClassAddress].join(' ')}>{address}</span>
            </div>
        </div>
    )
}
export default TextLabel;