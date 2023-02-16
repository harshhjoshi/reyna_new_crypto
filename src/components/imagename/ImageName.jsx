import Spanflex from '../spanflex/Spanflex';
import styles from './imagename.module.scss'
const ImageName = ({ image, label, value }) => {
    return (
        <div className={styles.coinNameImageContainer}>
            {
                image && <div className={styles.imageContainer}>
                    <img src={image} alt={value} className={styles.coinImage} />
                </div>
            }
            <Spanflex label={label} value={value} />
        </div>
    )
}
export default ImageName;