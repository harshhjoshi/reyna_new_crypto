import LogoContainer from '../../components/logo/LogoContainer';
import styles from './myprofile.module.scss'
const MyProfile = () => {
    return (
        <div className={styles.comingSoonContainer}>
            <LogoContainer />
            <div className={styles.comingSoonText}>Coming Soon</div>
            <div className={styles.launchingSoon}>Stay tuned we're launching soon</div>
        </div>
    )
}
export default MyProfile;