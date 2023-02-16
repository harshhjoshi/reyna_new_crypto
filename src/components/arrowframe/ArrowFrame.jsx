import styles from './arrowframe.module.scss'
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen"
import Frame from '../../assets/images/ArrowFrame.png'

const ArrowFrame = ({ customClass }) => {
    const isMobile = useCheckMobileScreen();
    return (
        isMobile && <div>
            <img src={Frame} alt="arrow-frame" className={[styles.arrowFrame, customClass].join(' ')} />
        </div>
    )
}
export default ArrowFrame;