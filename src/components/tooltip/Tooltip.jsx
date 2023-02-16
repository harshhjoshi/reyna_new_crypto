import styles from "./tooltip.module.scss";
const Tooltip = ({ title, customClass, subTitle, customClassTitle, customClassSubTitle, handleClick }) => {
    return (
        <>
            <div className={[styles.tooltipContainer, customClass].join(" ")}>
                <span className={[styles.tooltipContent, customClassTitle].join(' ')}>{title}</span>
                {
                    subTitle && <span className={[styles.subTitle, customClassSubTitle].join(' ')} onClick={() => handleClick(title)} >{subTitle}</span>
                }
            </div>
        </>
    );
};

export default Tooltip;
