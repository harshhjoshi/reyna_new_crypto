import styles from './filledbutton.module.scss'
const FilledButton = ({ icon, type, title, custonClass, custonClassTitle, handleClick }) => {
    return (
        <button type={type} className={[styles.button, custonClass].join(' ')} onClick={() => handleClick ? handleClick() : {}}>
            {
                icon && icon
            }
            <span className={[styles.title, custonClassTitle].join(' ')}>{title}</span>
        </button>
    )
}
export default FilledButton