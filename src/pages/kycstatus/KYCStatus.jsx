import LogoContainer from '../../components/logo/LogoContainer';
import styles from './kycstatus.module.scss'
const KYCStatus = ({ status }) => {
    return (
        <div className={styles.comingSoonContainer}>
            <LogoContainer />
            <div className={styles.comingSoonText}>Your KYC is {status}</div>
            {/* <div className={styles.launchingSoon}>Stay tuned we're launching soon</div> */}
        </div>
    )
}
export default KYCStatus;