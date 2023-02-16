import styles from './list.module.scss'
const List = ({ data, active, customClass, customClassItem }) => {
    return (
        <ul className={[active ? styles.list : styles.listDeactive, customClass].join(' ')}>
            {
                data.map((item, index) => {
                    return (
                        <li key={index} className={[styles.listItem, customClassItem].join(' ')}>{item.name}</li>
                    )
                })
            }
        </ul>
    )
}
export default List;