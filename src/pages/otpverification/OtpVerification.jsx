import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import Divider from "../../components/divider/Divider";
import LogoContainer from "../../components/logo/LogoContainer";
import styles from "./otpverification.module.scss";
import Modal from "../../components/modal/Modal";
import { useGlobalContext } from "../../context/context";
import { messages } from "../../constants/messages";
import ArrowFrame from "../../components/arrowframe/ArrowFrame";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as API from "../../constants/API";
import Spinner from "../../components/spinner/Spinner";
import Error from "../../components/error/Error";
import APICall from "../../constants/API";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { gotoSignInSignUp, logout } from "../../redux/userSlice";

const OtpVerification = () => {
  const navigate = useNavigate();
  let otpArray = new Array(6).fill("");
  const [value, setValue] = useState([]);
  const [otp, setOtp] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const access_token = localStorage.getItem("access_token");
  const [counter, setCounter] = useState(160);
  const [loading, setLoading] = useState(null);
  const [attemts, setAttemts] = useState(1);
  const dispatch = useDispatch();
  const Users = useSelector((state) => state.user);
  // console.log("Users access_token without OTP:", access_token);
  var OTPVerified = localStorage.getItem("otpverified");
  // localStorage.setItem("access_token", Users.user);

  // localStorage.setItem("access_token", Users.user.token);
  // const navigate = useNavigate();
  const {
    isModalOpen,
    openModal,
    modalMessage,
    modalDestination,
    setModalMessage,
    setModalDestination,
  } = useGlobalContext();
  const source = useLocation().state;
  const [focus, setFocus] = useState(false);

  const handleOtpChange = (e, index) => {
    if (e.key !== "Backspace") {
      let temp = [...value];
      temp[index] = e.target.value;
      setValue(temp);
      if (e.target.nextSibling && focus) {
        e.target.nextSibling.focus();
      }
    } else {
    }
    // console.log('change');
  };
  const handleDelete = (e, i) => {
    if (e.key === "Backspace" && e.target.previousSibling) {
      // value.pop()
      // console.log('1. value > ', value, i);
      // e.target.previousSibling.value = "";
      // let temp = [...value];
      // temp.splice(i, 1); // [value.length - 1] = '';
      // setValue(temp);
      setTimeout(() => {
        e.target.previousSibling.focus();
      }, 1);
      return;
    }
    if (e.key === "Backspace" && i === 0) {
      setFocus(false);
    } else {
      setFocus(true);
    }
    // console.log('delete');
  };

  useEffect(() => {
    // if (OTPVerified === "true") {
    //   navigate("/trading");
    // }
  });

  useEffect(() => {
    setOtp(value.join(""));
    
  }, [value]);
  // console.log('Value',value.join(""));
  const validations = {
    otp: {
      required: {
        value: true,
        message: "Please enter valid OTP code.",
      },
      custom: {
        isValid: (value) => (value && value.length === 6 ? true : false),
        message: "Please enter valid OTP code.",
      },
    },
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};
    for (const key in validations) {
      const value = otp;
      const validation = validations[key];
      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      }

      const pattern = validation?.pattern;
      if (pattern?.value && !RegExp(pattern.value).test(value)) {
        valid = false;
        newErrors[key] = pattern.message;
      }

      const custom = validation?.custom;
      if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        newErrors[key] = custom.message;
      }
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    } else {
      // navigate(options.navigate, { state: options.state })
      OTPVerification();
    }
    setErrors({});
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(null);
      }, 10000);
  }, [error]);

  useEffect(() => {
    const setModalContext = () => {
      return source === "signup"
        ? (setModalMessage(messages.sucsess.register),
          setModalDestination("/signin"))
        : source === "signin"
        ? (setModalMessage(messages.sucsess.signin),
          setModalDestination("/uploadkycdocuments"))
        : null;
    };
    setModalContext();
  }, [setModalDestination, setModalMessage, source]);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const ResetPasswordTimer = () => {
    setCounter(160);

    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  };

  const OTPVerification = async () => {
    setLoading(true);
    var data = value.join("");
    // var data = "715526";
    console.log("encrypted> OTP Test: " , value.join(""));

    var key = CryptoJS.enc.Latin1.parse("1234567812345678");
    var iv = CryptoJS.enc.Latin1.parse("1234567812345678");
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });

    console.log("Users.user.token : ", Users.user.token);
    const OTP = encrypted.toString();
    const headers = {
      Authorization: `Bearer ${Users.user.token}`,
      "Content-Type": "application/json",
      otp: OTP,
      isSignupOTP: source === "signup" ? true : false,
    };

    console.log("encrypted> OTP: ", headers);

    await APICall.put(`${API.VALIDATE_OTP} `, {}, { headers })
      .then((response) => {
        // console.log("access_token:<<", Users.user);
        console.log("response:>>", response);

        if (response.data === true) {
          openModal();
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
        setLoading(false);

        if (attemts >= 3) {
          dispatch(logout())
          dispatch(gotoSignInSignUp(true))
          navigate("/signin");
        } else {
          setAttemts(attemts + 1);

          setLoading(false);
          setValue([]);

          setError(err.response.data.messages.toString());
        }
      });
  };

  const ResendOtpApiCall = async () => {
    setLoading(true);
    console.log("source : ", source);

    const headers = {
      Authorization: `Bearer ${Users.user.token}`,
      "Content-Type": "application/json",
    };
    await APICall.post(`${API.RESEND_OTP}`, {}, { headers })
      .then((response) => {
        try {
          if (response.data === true) {
            // dispatch(login(response.data));
            // localStorage.setItem("access_token", response.data.token);
            ResetPasswordTimer();
            setLoading(false);
            // navigate("/otpverification", { state: "signin" });
          }
        } catch (err) {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.messages.toString());
      });
  };

  return !isModalOpen ? (
    <div className={styles.otpVerificationContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.otpVerificationFormContainer}>
          <div className={styles.otpVerificationForm}>
            <LogoContainer />
            <div className={styles.otpVerificationText}>OTP Verification</div>
            <div className={styles.otpVerificationTitle}>
              Please enter otp verification code
            </div>
            <form
              className={styles.otpVerificationFormBody}
              onSubmit={(e) => handleVerifyOtp(e)} /* onSubmit={handleSubmit} */
            >
              <div className={styles.otpFieldBoxContainer}>
                {otpArray.map((item, index) => {
                  return (
                    <input
                      className={styles.otpFieldBox}
                      type="text"
                      // name="otp"
                      maxLength="1"
                      key={index}
                      value={value[index]}
                      // value={data.otp}
                      onChange={(e) => handleOtpChange(e, index)}
                      // onChange={handleChange(`otp`)}
                      // onFocus={(e) => e.target.select()}
                      onKeyDown={(e) => handleDelete(e, index)}
                      autoFocus={index === 0 ? true : false}
                      // required
                    />
                  );
                })}
              </div>
              {errors.otp && <div className={styles.error}>{errors.otp}</div>}
              {error && <Error errorMessage={error} />}

              <FilledButton
                type="submit"
                title="Verify"
                custonClass={styles.verifyButton}
              />
            </form>
            <div className={styles.otpStatusTimeLine}>
              <span className={styles.attemptsCount}>
                {" "}
                {attemts} / 3 attempts{" "}
              </span>
              {counter <= 0 ? null : (
                <span className={styles.secondsRemaining}>
                  {" "}
                  - {counter} seconds remaining{" "}
                </span>
              )}
            </div>
            <Divider customClass={styles.divider} />
            {counter <= 0 ? (
              <div className={styles.didNotReceivedCode}>
                <span className={styles.receiveCodeText}>
                  If you don't receive a code!
                </span>
                <span
                  onClick={() => ResendOtpApiCall()}
                  className={styles.resendLink}
                >
                  Resend
                </span>
              </div>
            ) : null}

            {source === "signin" && (
              <div className={styles.warning}>
                <b>Warning</b> : After <b>Three consecutive</b> unsuccessful
                login attempts, your account will be disabled.
              </div>
            )}
          </div>
        </div>
      )}
      <ArrowFrame />
    </div>
  ) : (
    <Modal
      status="success"
      message={modalMessage}
      destination={modalDestination}
    />
  );
};
export default OtpVerification;
