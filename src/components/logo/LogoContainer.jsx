import logo from "../../assets/images/rayna_full.png";
import styles from "./logocontainer.module.scss";
const LogoContainer = ({ customClass }) => {
  return (
    <div className={[styles.logoContainer, customClass].join(" ")}>
      <img src={logo} style={{ width: "18%", height: "30%" }} alt="logo" />
    </div>
  );
};
export default LogoContainer;
