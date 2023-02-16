import { useState } from 'react';
// import { useGlobalContext } from '../../../context/context';
import Tooltip from '../../tooltip/Tooltip';
import styles from './statusbutton.module.scss'
const StatusButton = ({ status, customClass, customClassStatus, id }) => {
    // const { openModal, showTooltip, handleTooltipLeave, handleTooltipHover, value } = useGlobalContext();
    const [showTooltip, setShowTooltip] = useState(false);
    const [value, setValue] = useState(0);
    const handleTooltipHover = (id) => {
        setValue(id);
        setShowTooltip(true)
    };

    const handleTooltipLeave = () => {
        setValue(-1)
        setShowTooltip(false);
    };

    return (
        <button className={[styles.statusButton, customClass].join(' ')} onMouseOver={() => status === 'Rejected' ? handleTooltipHover(id) : {}} onMouseLeave={() => status === 'Rejected' ? handleTooltipLeave(id) : {}}>
            {status}
            {/* {
                showTooltip && status === 'Rejected' && id === value && <Tooltip title='Reason' subTitle='Re-Upload Driving Licence' customClassTitle={styles.tooltipTitle} customClass={styles.tooltip} />
            } */}
        </button>
    )
}
export default StatusButton;