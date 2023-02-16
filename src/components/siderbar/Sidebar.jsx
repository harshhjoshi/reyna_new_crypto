import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../constants/color";
import { sidebarLinks } from "../../constants/data";
import { useGlobalContext } from "../../context/context";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import { gotoSignInSignUp, login } from "../../redux/userSlice";
import { ExpandDown, ExpandUp } from "../../svg-components";
import Divider from "../divider/Divider";
import Dropdown from "../dropdown/Dropdown";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const dispatch = useDispatch();

  const {
    isDropdown,
    openDropdown,
    closeDropdown,
    isSidebarOpen,
    closeSidebar,
    handleValue,
    childValue,
    setChildValue,
    // logout,
    // setLogout
  } = useGlobalContext();
  const [value, setValue] = useState(-1);
  let fillColor = color.white;
  let fillColorActive = color.orange;
  const ref = useRef();
  const isMobile = useCheckMobileScreen();
  const navigate = useNavigate();
  const status = useSelector((state) => state.user);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isSidebarOpen && ref.current && !ref.current.contains(e.target)) {
        closeSidebar();
        // console.log('clicked closed sidebar')
        // closeDropdown("outside");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isSidebarOpen, closeSidebar, closeDropdown]);
  const handleNavigate = (item, index) => {
    item && handleActive(index);
    item && navigate(item);
  };
  const Logout = () => {
    closeSidebar();
    navigate("/signin");
    localStorage.removeItem("access_token");
    localStorage.setItem("otpverified", false);
    // setLogout(true)

    dispatch(login(null));
    dispatch(gotoSignInSignUp(true));
  };
  // const path = useLocation().pathname;
  const handleActive = (index) => {
    setValue(index);
    // alert('cliked')
  };
  const path = useLocation().pathname;
  // console.log('path...???', path)
  // const [childValue, setChildValue] = useState(-1)
  useEffect(() => {
    // console.log('called')
    closeSidebar();
    sidebarLinks.map((item, index) => {
      if (item.navigate === path) {
        handleActive(item.id);
        // closeDropdown('from useEffect')
        handleValue(-1);
        setChildValue(-1);
      }
      if (item.dropdown) {
        item.dropdowndata.map((item, index) => {
          if (item.navigate === path) {
            handleActive(item.id);
            openDropdown();
            handleValue(item.id);
            setChildValue(index);
          }
        });
      }
    });
  }, [path]);
  // console.log("isdropdown...??", status.user.role);
  return (
    <div
      className={
        isSidebarOpen
          ? [styles.sidebar, styles.showSidebar].join(" ")
          : styles.sidebar
      }
      ref={ref}
    >
      {sidebarLinks.map((item, index) => {
        return !status.user ? (
          <div key={index}>
            <div
              className={styles.links}
              /* onClick={() => { openDropdown(); handleValue(index); setValue(index) }} */ onClick={() => {
                isDropdown && index === value
                  ? closeDropdown()
                  : openDropdown();
                handleValue(index);
                handleActive(index);
              }}
            >
              <div
                className={styles.linkIconTitle}
                onClick={() => {
                  item.title === "Sign out" && Logout();
                }}
              >
                <item.icon
                  fillColor={index === value ? fillColorActive : fillColor}
                />
                <span
                  className={
                    index === value ? styles.linkNameActive : styles.linkName
                  }
                >
                  {item.title}
                </span>
              </div>
              {item.dropdown ? (
                isDropdown && index === value ? (
                  <ExpandUp
                    fillColor={color.white}
                    height={isMobile ? 20 : 24}
                    width={isMobile ? 20 : 24}
                    customClass={styles.expandIcon}
                  />
                ) : (
                  <ExpandDown
                    fillColor={color.white}
                    height={isMobile ? 20 : 24}
                    width={isMobile ? 20 : 24}
                    customClass={styles.expandIcon}
                  />
                )
              ) : null}
            </div>
            {item.dropdown && (
              <Dropdown
                id={index}
                data={item.dropdowndata}
                handleClick={(navigate) => {
                  handleNavigate(navigate);
                }}
                customClassBody={styles.dropdownBody}
                customClassItem={styles.dropdownItem}
                childValue={childValue}
                setChildValue={setChildValue}
              />
            )}
            <Divider />
          </div>
        ) : status.user.role === "ROLE_User" ? (
          <div key={index}>
            <div
              className={styles.links}
              /* onClick={() => { openDropdown(); handleValue(index); setValue(index) }} */ onClick={() => {
                !item.dropdown
                  ? handleNavigate(item.navigate, index)
                  : isDropdown && index === value
                  ? closeDropdown("from condition")
                  : openDropdown();
                handleValue(index);
                handleActive(item.id);
              }}
            >
              <div
                className={styles.linkIconTitle}
                onClick={() => {
                  item.title === "Sign out" && Logout();
                }}
              >
                <item.icon
                  fillColor={index === value ? fillColorActive : fillColor}
                />
                <span
                  className={
                    index === value ? styles.linkNameActive : styles.linkName
                  }
                >
                  {item.title}
                </span>
              </div>
              {item.dropdown ? (
                isDropdown && index === value ? (
                  <ExpandUp
                    fillColor={color.white}
                    height={isMobile ? 20 : 24}
                    width={isMobile ? 20 : 24}
                    customClass={styles.expandIcon}
                  />
                ) : (
                  <ExpandDown
                    fillColor={color.white}
                    height={isMobile ? 20 : 24}
                    width={isMobile ? 20 : 24}
                    customClass={styles.expandIcon}
                  />
                )
              ) : null}
            </div>
            {item.dropdown && (
              <Dropdown
                id={index}
                data={item.dropdowndata}
                handleClick={(navigate, id) => {
                  handleNavigate(navigate, id);
                }}
                customClassBody={styles.dropdownBody}
                customClassItem={styles.dropdownItem}
                customClassItemActive={styles.dropdownItemActive}
                childValue={childValue}
                setChildValue={setChildValue}
              />
            )}
            <Divider />
          </div>
        ) : index == 3 ? (
          <div key={index}>
            <div
              className={styles.links}
              /* onClick={() => { openDropdown(); handleValue(index); setValue(index) }} */ onClick={() => {
                isDropdown && index === value
                  ? closeDropdown()
                  : openDropdown();
                handleValue(index);
                handleActive(index);
              }}
            >
              <div
                className={styles.linkIconTitle}
                onClick={() => {
                  item.title === "Sign out" && Logout();
                }}
              >
                <item.icon
                  fillColor={index === value ? fillColorActive : fillColor}
                />
                <span
                  className={
                    index === value ? styles.linkNameActive : styles.linkName
                  }
                >
                  {item.title}
                </span>
              </div>
              {item.dropdown ? (
                isDropdown && index === value ? (
                  <ExpandUp
                    fillColor={color.white}
                    height={isMobile ? 20 : 24}
                    width={isMobile ? 20 : 24}
                    customClass={styles.expandIcon}
                  />
                ) : (
                  <ExpandDown
                    fillColor={color.white}
                    height={isMobile ? 20 : 24}
                    width={isMobile ? 20 : 24}
                    customClass={styles.expandIcon}
                  />
                )
              ) : null}
            </div>
            {item.dropdown && (
              <Dropdown
                id={index}
                data={item.dropdowndata}
                handleClick={(navigate) => {
                  handleNavigate(navigate);
                }}
                customClassBody={styles.dropdownBody}
                customClassItem={styles.dropdownItem}
              />
            )}
            <Divider />
          </div>
        ) : null;
      })}
    </div>
  );
};
export default Sidebar;
