import styles from "./kycstatus.module.scss";
import Button from "../buttons/Button";
import { Scan } from "../../svg-components/index";
import color from "../../constants/color";
import { useSelector } from "react-redux";
const KYCStatus = () => {
  const status = useSelector((state) => state.user);
  return (
    <div className={styles.KYCStatusContainer}>
      <Button
        title={<Scan fillColor={color.blue2} />}
        customClass={styles.scanButton}
      />
      <div className={styles.kycStatusTextContainer}>
        <span className={styles.kycStatusText}>KYC Status</span>
        <span className={styles.status}>{status.user ? status.user.kycStatus : 'Pending'}</span>
      </div>
    </div>
  );
};
export default KYCStatus;
