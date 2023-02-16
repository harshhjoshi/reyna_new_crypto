import styles from './button.module.scss'
const Button = ({ title, handleClick, customClass, customClassText }) => {
    return (
        <button className={[styles.button, customClass].join(' ')} onClick={() => handleClick()}>
            <span className={[styles.buttonText, customClassText].join(' ')}>{title}</span>
        </button>
    )
}
export default Button;