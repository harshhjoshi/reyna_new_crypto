import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import color from '../../constants/color';
import { useGlobalContext } from '../../context/context';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { ExpandDown } from '../../svg-components';
import styles from './dropdown.module.scss'
const Dropdown = ({ id, data, customClass, customClassHead, customClassBody, title, handleClick, customClassItem, customClassItemActive, childValue, setChildValue }) => {
    const isMobile = useCheckMobileScreen();
    const { isDropdown, openDropdown, closeDropdown, value, handleValue } = useGlobalContext();
    const ref = useRef();
    // console.log('Value', value)
    // console.log('id', id);
    // const [childValue, setChildValue] = useState(-1) 
    return (
        <div className={[styles.dropdownContainer, customClass].join(' ')} ref={ref} >
            {
                title &&
                <div className={[isDropdown && id === value ? styles.dropdownOpen : styles.dropdownHead, customClassHead].join(' ')} onClick={() => { isDropdown ? closeDropdown() : openDropdown(); handleValue(id) }} >
                    <span className={styles.dropdownTitle}>
                        {title}
                    </span>
                    <ExpandDown fillColor={color.grey1} height={isMobile ? 20 : 24} width={isMobile ? 20 : 24} customClass={styles.expandIcon} />
                </div>
            }
            {
                isDropdown && id === value && <div className={[customClassBody, styles.dropdownBody].join(' ')} >
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className={[index === childValue ? customClassItemActive : customClassItem, styles.dropdownItem].join(' ')} onClick={() => { handleClick && handleClick(item.navigate, item.id); setChildValue(index) }} >{item.name}</div>
                            )
                        })
                    }

                </div>
            }

        </div>
    )
}
export default Dropdown;