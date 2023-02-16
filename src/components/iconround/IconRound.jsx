import color from '../../constants/color';
import styles from './iconround.module.scss'
const IconRound = ({ customClass, Icon, bgColor }) => {
    return (
        <div className={[customClass, styles.iconRoundContainer].join(' ')} style={{ background: bgColor }}>
            <Icon fillColor={color.white} />
            {/* {Icon} */}
        </div>
    )
}
export default IconRound;