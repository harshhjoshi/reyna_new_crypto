import { useNavigate } from "react-router-dom";
import LogoContainer from "../../components/logo/LogoContainer";
import styles from "./pagenotfound.module.scss";
const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageNotFoundContainer}>
      <LogoContainer />
      <div className={styles.errorText}>Error 404</div>
      <div className={styles.notFoundText}>
        Oops! Page Not Found{" "}
        <span
          className={styles.backtohomeLink}
          onClick={() => navigate("/trading")}
        >
          {" "}
          Back to Home
        </span>
      </div>
    </div>
  );
};
export default PageNotFound;
