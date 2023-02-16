import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../constants/color";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import styles from "./tab.module.scss";
const Tab = ({
  tabs,
  dataStatus,
  setDataStatus,
  customClass,
  customClassName,
  customClassTab,
}) => {
  const [value, setValue] = useState(0);
  const path = useLocation().pathname;
  const navigate = useNavigate();
  const isMobile = useCheckMobileScreen();
  const ref = useRef();
  // const [scroll, setScroll] = useState(ref ? ref.current.scrollLeft : 0);
  const handleNavigate = (item, index, status) => {
    // item && setValue(index);
    setValue(index);
    item && navigate(item);
    status && setDataStatus && setDataStatus(status);
    // index === 3 && isMobile && setScroll(scroll + 20);
  };
  useEffect(() => {
    // console.log('called')
    tabs.map((item, index) => {
      if (item.navigate === path.split("/")[2]) {
        setValue(item.id);
      }
    });
  }, [path]);
  useEffect(() => {
    tabs.map((item) => {
      if (item.name === dataStatus) {
        setValue(item.id);
      }
    });
  }, [dataStatus]);
  return (
    <div className={[styles.tabContainer, customClass].join(" ")} ref={ref}>
      {tabs &&
        tabs.map((item, index) => {
          return (
            <div
              key={index}
              className={[
                index === value ? styles.tabsActive : styles.tabs,
                customClassTab,
              ].join(" ")}
              onClick={() => handleNavigate(item.navigate, index, item.name)}
            >
              {item.icon && (
                <item.icon
                  fillColor={index === value ? color.orange : color.grey1}
                />
              )}
              <span className={[styles.tab, customClassName].join(" ")}>
                {item.name}
              </span>
            </div>
          );
        })}
    </div>
  );
};
export default Tab;
