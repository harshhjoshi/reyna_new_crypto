import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowFrame from "../../components/arrowframe/ArrowFrame";
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import Divider from "../../components/divider/Divider";
import Error from "../../components/error/Error";
import LogoContainer from "../../components/logo/LogoContainer";
import Spinner from "../../components/spinner/Spinner";
import APICall, * as API from "../../constants/API";
import color from "../../constants/color";
import { useGlobalContext } from "../../context/context";
import useForm from "../../hooks/useForm";
import useReference from "../../hooks/useReference";
import { gotoSignInSignUp, login } from "../../redux/userSlice";
import { Hide, View } from "../../svg-components";
import styles from "./signin.module.scss";

const SignIn = () => {
  const { passwordType, passwordTypeText, passwordTypePassword, placeholder } =
    useGlobalContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [stored_username, setStored_username] = useState("");
  // const stored_username = '';
  const [stored_password, setStored_password] = useState("");
  // const stored_password = '';
  const [stored_rememberme, setRememberme] = useState(false);
  const ref = useReference();

  useEffect(() => {
    const stored_username = localStorage.getItem("username");
    const stored_password = localStorage.getItem("password");
    const stored_rememberme = localStorage.getItem("rememberme");

    if (stored_username) {
      data.username = stored_username;
    }

    if (stored_password) {
      data.password = stored_password;
    }

    if (stored_rememberme) {
      data.rememberme = stored_rememberme;
    }
    setStored_username(data.username);
    setStored_password(data.password);
    setRememberme(data.rememberme);
  }, []);

  const [loading, setLoading] = useState(null);
  const { handleSubmit, handleChange, handleFocus, data, errors, handleBlur } =
    useForm({
      ref: ref,
      initialValues: { username: stored_username, password: stored_password },
      validations: {
        username: {
          required: {
            value: true,
            message: "Please enter username",
          },
          custom: {
            isValid: (value) =>
              value && value.length >= 3 && value.length <= 25 ? true : false,
            message: "Username must be between 3 to 25 characters",
          },
        },
        password: {
          required: {
            value: true,
            message: "Please enter password",
          },
          custom: {
            isValid: (value) =>
              value && value.length >= 8 && value.length <= 16 ? true : false,
            message: "password must be between 8 to 16 characters",
          },
        },
      },
      onSubmit: () => LoginOTPVerify(data),
    });

  const LoginOTPVerify = async (data) => {
    if (data.rememberme === true) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);
      localStorage.setItem("rememberme", data.rememberme);
    } else {
      localStorage.setItem("username", "");
      localStorage.setItem("password", "");
      localStorage.setItem("rememberme", "");
    }
    var username = data.username;

    var data = data.password;
    var key = CryptoJS.enc.Latin1.parse("1234567812345678");
    var iv = CryptoJS.enc.Latin1.parse("1234567812345678");
    var encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    console.log("encrypted>sss: ");
    var password = encrypted.toString();
    const signIN = JSON.stringify({
      username: username,
      password: password,
    });
    console.log("encrypted password>: ", password);

    const headers = {
      "Content-Type": "application/json",
    };
    setLoading(true);
    await APICall.post(API.SIGN_IN, signIN, { headers: headers })
      .then((response) => {
        setLoading(true);
        console.log("Data", response);
        try {
          if (response.data.status === true) {
            setLoading(false);

            if (response.data.role === "ROLE_Admin") {
              console.log("In Admmin");

              dispatch(login(response.data));
              dispatch(gotoSignInSignUp(false));

              localStorage.setItem("otpverified", true);

              navigate("/userkycverification");
              console.log("response.data.role 1", response.data.role);
            } else {
              console.log("In User", response.data);

              navigate("/otpverification", { state: "signin" });
              localStorage.setItem("otpverified", false);
              dispatch(login(response.data));
              dispatch(gotoSignInSignUp(false));
            }
            // localStorage.setItem("access_token", response.data.token);

            //otpverified
          } else {
            console.log("Response:", "Going in Error:");
          }
        } catch (err) {
          console.log("response.data.role 1", err);

          setLoading(false);
          setError(err.response);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("response.data.role 1", err);

        setError(err.response.data.messages.toString());
      });
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(null);
      }, 10000);
  }, [error]);

  return (
    <div className={styles.mainContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.signinFormContainer}>
          <div className={styles.signinForm}>
            <LogoContainer />
            <div className={styles.signInText}>Sign in</div>
            <div className={styles.signInTitle}>Sign in to your account</div>
            <Divider customClass={styles.divider} />
            {error && <Error errorMessage={error} />}
            <form className={styles.signInFormBody} onSubmit={handleSubmit}>
              <div className={styles.formFields}>
                <label
                  htmlFor="username"
                  className={styles.label}
                  value={data.username}
                  onChange={handleChange("username")}
                >
                  Username
                </label>
                <input
                  type="text"
                  className={styles.inputField}
                  value={data.username}
                  onChange={handleChange("username")}
                  placeholder={placeholder.username}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e, "username")}
                  ref={ref.username}
                />
                {errors.username && (
                  <div className={styles.error}>{errors.username}</div>
                )}
              </div>
              <div className={styles.formFields}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type={passwordType}
                  className={styles.inputField}
                  value={data.password}
                  onChange={handleChange("password")}
                  placeholder={placeholder.password}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e, "password")}
                  ref={ref.password}
                />
                {passwordType === "password" ? (
                  <Hide
                    fillColor={color.grey1}
                    customClass={styles.view}
                    handleClick={() => passwordTypeText("password")}
                  />
                ) : (
                  <View
                    fillColor={color.grey1}
                    customClass={styles.view}
                    handleClick={() => passwordTypePassword("password")}
                  />
                )}
                {errors.password && (
                  <div className={styles.error}>{errors.password}</div>
                )}
              </div>
              <div className={styles.rememberMeForgotPassword}>
                <div className={styles.rememberMeContainer}>
                  <input
                    // defaultChecked={remember_me}
                    onChange={handleChange("rememberme")}
                    type="checkbox"
                    checked={data.rememberme}
                    style={{ cursor: "pointer", outline: "none" }}
                  />
                  <span className={styles.rememberMe}>Remember Me</span>
                </div>
                {data.username === "adminUser" ? null : (
                  <span
                    className={styles.forgotPassword}
                    onClick={() => navigate("/forgotpassword")}
                  >
                    Forgot Password
                  </span>
                )}
              </div>
              <FilledButton
                type="submit"
                title="Sign in"
                custonClass={styles.signInButton}
              />
            </form>
            <div className={styles.dontHaveAccountContainer}>
              <span className={styles.dontHaveAccount}>
                Don't have an account yet?
              </span>
              <span
                className={styles.signUp}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </div>
          </div>
        </div>
      )}

      {/* </div> */}
      <ArrowFrame />
    </div>
  );
};

export default SignIn;
