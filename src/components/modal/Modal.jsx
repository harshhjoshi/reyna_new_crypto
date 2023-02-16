import styles from "./modal.module.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import LogoContainer from "../logo/LogoContainer";
import { Success, Fail } from "../../svg-components";
import color from "../../constants/color";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import ArrowFrame from "../arrowframe/ArrowFrame";

const Modal = ({ message, status, destination }) => {
  const { isModalOpen, closeModal,setIsModalOpen } = useGlobalContext();
  const navigate = useNavigate();
  const isMobile = useCheckMobileScreen();
  // console.log("Modal destination:>>", destination);

  useEffect(() => {
    
    setTimeout(() => {
      // setIsModalOpen(false)
      localStorage.setItem("otpverified", true);
      // setLogout(false)
      closeModal();
      destination && navigate(destination);
    }, 3000);
  }, [closeModal, destination, navigate]);
  return (
    isModalOpen && (
      <div className={styles.modalContainer}>
        <div className={styles.modalBody}>
          <div className={styles.modalContentContainer}>
            <LogoContainer />
            <div className={styles.modalContent}>
              {status === "success" ? (
                <Success
                  fillColor={color.green1}
                  height={isMobile ? 198 : 80}
                  width={isMobile ? 198 : 80}
                />
              ) : (
                <Fail
                  fillColor={color.red1}
                  height={isMobile ? 198 : 80}
                  width={isMobile ? 198 : 80}
                />
              )}
              <div
                className={
                  status === "success"
                    ? styles.successMessage
                    : styles.failureMessage
                }
              >
                {message}
              </div>
            </div>
          </div>
        </div>
        <ArrowFrame />
      </div>
    )
  );
};
export default Modal;
