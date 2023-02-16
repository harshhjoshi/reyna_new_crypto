import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import color from "../../../constants/color";
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import { ExpandDown, ExpandUp, Filter } from "../../../svg-components";
import styles from "./dropdownv2.module.scss";
const DropdownV2 = ({
  title,
  data,
  id,
  handleFilter,
  open,
  handleFilterCallback,
  customClass,
  height,
  width,
  fillColor,
  customClassTitle,
  customClassBody,
  customClassBodyItems,
  customClassBodyItem,
}) => {
  const isMobile = useCheckMobileScreen();
  // const { isDropdown, openDropdown, closeDropdown, value, handleValue } = useGlobalContext()
  const [isDropdown, setIsDropdown] = useState(false);
  const [value, setValue] = useState(-1);
  const openDropdown = (index) => {
    // e.stopPropagation();
    setIsDropdown(true);
  };
  const closeDropdown = (e) => {
    // e.stopPropagation();
    setIsDropdown(false);
  };
  const [filterBy, setFilterBy] = useState(title);
  useEffect(() => {
    setFilterBy(title);
  }, [title]);
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdown && ref.current && !ref.current.contains(e.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [closeDropdown]);
  // const handleFilter = (item) => {
  //   setFilterBy(item);
  //   handleFilterCallback && handleFilterCallback(item);
  // console.log('dropdown data..????', data, isDropdown)
  // };
  useEffect(() => {
    open && openDropdown();
  }, [open]);
  const path = useLocation().pathname;
  // console.log('pathh', path);
  useEffect(() => {
    // console.log('called')
    data.map((item, index) => {
      // console.log('navigate...', item.navigate)
      if (item.navigate === path) {
        setValue(item.id);
      }
    });
  }, [path]);
  return (
    <div
      className={[styles.dropdownContainer, customClass].join(" ")}
      onClick={() => {
        isDropdown ? closeDropdown() : openDropdown();
      }}
      ref={ref}
    >
      {title && (
        <>
          {isMobile ? (
            <Filter fillColor={color.white} />
          ) : (
            <span
              className={[styles.dropdownTitle, customClassTitle].join(" ")}
            >
              {filterBy}
            </span>
          )}
          {isMobile ? null : !isDropdown ? (
            <ExpandDown
              fillColor={fillColor ? fillColor : color.white}
              height={height ? height : isMobile ? 20 : 24}
              width={width ? width : isMobile ? 20 : 24}
              customClass={styles.expandIcon}
            />
          ) : (
            <ExpandUp
              fillColor={fillColor ? fillColor : color.white}
              height={height ? height : isMobile ? 20 : 24}
              width={width ? width : isMobile ? 20 : 24}
              customClass={styles.expandIcon}
            />
          )}
        </>
      )}

      {isDropdown && data && (
        <div className={[styles.dropdownBody, customClassBody].join(" ")}>
          {data &&
            data.map((item, index) => {
              return (
                <div
                  className={[
                    index === value
                      ? styles.dropdownItemsActive
                      : styles.dropdownItems,
                    customClassBodyItems,
                  ].join(" ")}
                  onClick={() => handleFilter(item.navigate)}
                  key={index}
                >
                  {item.icon && <item.icon fillColor={color.blue2} />}
                  <span
                    className={[styles.dropdownItem, customClassBodyItem].join(
                      " "
                    )}
                    key={index}
                  >
                    {item.name}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
export default DropdownV2;
