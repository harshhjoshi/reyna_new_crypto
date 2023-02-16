import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowFrame from "../../components/arrowframe/ArrowFrame";
import Divider from "../../components/divider/Divider";
import LogoContainer from "../../components/logo/LogoContainer";
import color from "../../constants/color";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import { Email } from "../../svg-components";
import styles from "./checkemail.module.scss";
const CheckMail = (state) => {
  const isMobile = useCheckMobileScreen();
  const navigate = useNavigate();
  const checkemail = localStorage.getItem("check_email");

  //check_email
  useEffect(() => {
    setTimeout(() => {
      navigate("/signin");
    }, 5000);
  }, [navigate]);
  return (
    <div className={styles.checkEmailContainer}>
      <div className={styles.checkEmailContentContainer}>
        <div className={styles.checkEmailContent}>
          <LogoContainer />
          <div className={styles.checkYourEmailText}>Check your email</div>
          <Divider customClass={styles.divider} />
          <div className={styles.checkMessageBody}>
            <Email
              fillColor={color.blue1}
              height={isMobile ? 198 : 80}
              width={isMobile ? 198 : 80}
            />
            <div className={styles.checkMessageContainer}>
              <div className={styles.sentPasswordLink}>
                We have sent a password link to{" "}
                <div className={styles.emailId}>{checkemail}</div>
              </div>
              {/* <div className={styles.didnotReceiveEmail}>
                Didn't receive the email?{" "}
                <span className={styles.resendLink}>Click to resend</span>{" "}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <ArrowFrame />
    </div>
  );
};
export default CheckMail;
