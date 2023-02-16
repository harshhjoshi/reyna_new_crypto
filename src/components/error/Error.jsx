import styles from "./error.module.scss";
import axios from "axios";
import * as API from "../../constants/API";
import APICall from "../../constants/API";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Error = ({ errorMessage, otp, registeredString }) => {
  // console.log("errorMessage:", registeredString);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Username is already exist
  const RegisteredUser = async () => {
    const headers = {
      signupStr: registeredString,
    };

    await APICall.put(
      `${API.CHECKSIGNUPVERIFY}`,
      {},
      {
        headers: headers,
      }
    )
      .then((response) => {
        // console.log("Response:", response);
        // localStorage.setItem("access_token", response.data);

        navigate("/otpverification", { state: "signup" });

        // dispatch(login(response.data));

        //   setcountryData(response.data);
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.error}>
      {errorMessage}
      {otp && (
        <span className={styles.verifyOTP} onClick={() => RegisteredUser()}>
          Verify OTP
        </span>
      )}
    </div>
  );
};
export default Error;
