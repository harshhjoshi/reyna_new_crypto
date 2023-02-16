import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/reyna_logo.png";
import Tooltip from "../../components/tooltip/Tooltip";
import APICall, * as API from "../../constants/API";
import color from "../../constants/color";
import { profileDropdownData } from "../../constants/data";
import { useGlobalContext } from "../../context/context";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import {
  Close,
  Copy,
  MenuWeb,
  SearchIcon,
  Signin,
  Signup,
  User,
  Wallet,
} from "../../svg-components";
import { hanleCopy } from "../../utils/helpers";
import Button from "../buttons/Button";
import DropdownV2 from "../dropdown/dropdownV2/DropdownV2";
import styles from "./header.module.scss";

const Header = () => {
  var access_token = localStorage.getItem("access_token");

  const isMobile = useCheckMobileScreen();
  const navigate = useNavigate();
  const {
    isSidebarOpen,
    openSidebar,
    closeSidebar,
    isDropdown,
    closeDropdown,
    openDropdown,
    showTooltip,
    handleTooltipHover,
    handleTooltipLeave,
  } = useGlobalContext();
  const state = useSelector((state) => state.user);
  var OTPVerified = localStorage.getItem("otpverified");
  // console.log("{OTPVerified:???", OTPVerified);
  const path = useLocation().pathname;
  const ref = useRef();
  const tooltipRef = useRef();
  var WalletAddress = "";
  const handleNavigate = (item) => {
    item && navigate(item);
    handleClose();
  };
  const [open, setOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    openDropdown();
  };
  const handleClose = (item) => {
    setOpen(false);
    item && closeDropdown();
  };

  const APIGETWALLETID = useCallback(async () => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await APICall.get(`${API.GETWALLETS}`, {
      headers: headers,
    })
      .then((response) => {
        if (response.status === 200) {
          setWalletAddress(response.data.data[0].address);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  useEffect(() => {
    APIGETWALLETID();
  }, [APIGETWALLETID]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isDropdown && ref.current && !ref.current.contains(e.target)) {
        // closeDropdown();
        handleClose(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdown, handleClose]);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showTooltip &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target)
      ) {
        handleTooltipLeave();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showTooltip, handleTooltipLeave]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        {state.user && OTPVerified === "true" ? (
          isSidebarOpen ? (
            <Button
              title={<Close fillColor={color.white} height={22} width={21} />}
              customClass={styles.closeButton}
              handleClick={() => closeSidebar()}
            />
          ) : (
            <MenuWeb
              fillColor={color.white}
              width={49}
              height={45}
              fillColorMenu={color.orange}
              customClass={styles.menuIcon}
              handleClick={() => openSidebar()}
            />
          )
        ) : null}
        <img
          src={Logo}
          alt="logo"
          className={styles.logo}
          onClick={() => navigate("/trading")}
        />
      </div>
      <div className={styles.headerRight}>
        <Button
          title={<SearchIcon fillColor={color.white} height={20} width={20} />}
          handleClick={() => {}}
          customClass={styles.searchButton}
        />
        {OTPVerified === "false" ? (
          <>
            <Button
              title={
                isMobile ? (
                  <Signin fillColor={color.white} height={20} width={20} />
                ) : (
                  "SIGN IN"
                )
              }
              handleClick={() => {
                navigate("/signin");
              }}
              customClass={styles.signinButton}
            />
            <Button
              title={
                isMobile ? (
                  <Signup fillColor={color.white} height={20} width={20} />
                ) : (
                  "SIGN UP"
                )
              }
              handleClick={() => {
                navigate("/signup");
              }}
              customClass={styles.signupButton}
            />
          </>
        ) : state.user &&
          state.user.role === "ROLE_User" &&
          OTPVerified === "true" ? (
          <>
            <div ref={tooltipRef}>
              <Button
                title={
                  <Wallet fillColor={color.white} height={20} width={20} />
                }
                customClass={styles.addressButton}
                handleClick={() =>
                  showTooltip ? handleTooltipLeave() : handleTooltipHover()
                }
              />
              {showTooltip && walletAddress && (
                <Tooltip
                  title={walletAddress}
                  customClass={styles.toolTipContainer}
                  subTitle={<Copy fillColor={color.white} />}
                  customClassTitle={styles.toolTipTitle}
                  customClassSubTitle={styles.tooltipSubtitle}
                  handleClick={(text) => {
                    hanleCopy(text);
                    handleTooltipLeave();
                  }}
                />
              )}
            </div>
            <div ref={ref}>
              <Button
                title={<User fillColor={color.white} height={20} width={20} />}
                customClass={styles.userButton}
                handleClick={() => (open ? handleClose(true) : handleOpen())}
              />
              {open && (
                <DropdownV2
                  data={profileDropdownData}
                  open={isDropdown}
                  handleFilter={(item) => handleNavigate(item)}
                  customClass={styles.dropdownConainer}
                  customClassBody={styles.dropdownBody}
                />
              )}
            </div>
          </>
        ) : (
          <>
            {state.user && state.user.role === "ROLE_Admin" ? null : (
              <Button
                title={
                  isMobile ? (
                    <Signin fillColor={color.white} height={20} width={20} />
                  ) : (
                    "SIGN IN"
                  )
                }
                handleClick={() => {
                  navigate("/signin");
                }}
                customClass={styles.signinButton}
              />
            )}

            {state.user && state.user.role === "ROLE_Admin" ? null : (
              <Button
                title={
                  isMobile ? (
                    <Signup fillColor={color.white} height={20} width={20} />
                  ) : (
                    "SIGN UP"
                  )
                }
                handleClick={() => {
                  navigate("/signup");
                }}
                customClass={styles.signupButton}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
