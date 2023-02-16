import { useNavigate } from "react-router-dom";
import ArrowFrame from "../../components/arrowframe/ArrowFrame";
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import Divider from "../../components/divider/Divider";
import LogoContainer from "../../components/logo/LogoContainer";
import useForm from "../../hooks/useForm";
import styles from "./forgotpassword.module.scss";
import axios from "axios";
import * as API from "../../constants/API";
import Error from "../../components/error/Error";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import { useGlobalContext } from "../../context/context";
import useReference from "../../hooks/useReference";
import APICall from "../../constants/API";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { placeholder } = useGlobalContext();

  // const handleForgotPassword = (e) => {
  //     e.preventDefault();
  //     navigate('/checkmail');
  // }
  const ref = useReference();
  const { handleSubmit, handleChange, data, errors, handleFocus, handleBlur } =
    useForm({
      ref: ref,
      validations: {
        email: {
          required: {
            value: true,
            message: "Please enter your email",
          },
          pattern: {
            value: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
            message: "please enter valid email",
          },
        },
      },
      onSubmit: () => ForgotPasswordAPI(data),
      // navigate: '/checkmail',
      // state: 'checkmail'
    });

  const ForgotPasswordAPI = async (data) => {
    const headers = {
      "Content-Type": "application/json",
    };
    setLoading(true);
    await APICall.put(`${API.FORGOT_PASSWORD + data.email}`, {
      headers: headers,
    })
      .then((response) => {
        if (response.data === true) {
          localStorage.setItem("check_email", data.email);

          navigate("/checkmail", { state: "checkmail" });
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);

        setError(err.response.data.messages.toString());
        // setError(err.response.data.messagesMap.Username)
      });
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(null);
      }, 10000);
  }, [error]);

  return (
    <div className={styles.forgotPasswordContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.forgotPasswordFormContainer}>
          <div className={styles.forgotPasswordForm}>
            <LogoContainer />
            <div className={styles.forgotPasswordText}>Forgot Password?</div>
            <div className={styles.forgotPasswordTitle}>
              No worries, we'll send you reset instructions.
            </div>
            <Divider customClass={styles.divider} />
            <form
              className={styles.forgotPasswordFormBody}
              /* onSubmit={(e) => handleForgotPassword(e)} */ onSubmit={
                handleSubmit
              }
            >
              <div className={styles.formFields}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  className={styles.inputField}
                  value={data.email}
                  onChange={handleChange("email")}
                  placeholder={placeholder.email}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e, "email")}
                  ref={ref.email}
                />
                {errors.email && (
                  <div className={styles.error}>{errors.email}</div>
                )}
              </div>
              {error && <Error errorMessage={error} />}
              <FilledButton
                type="submit"
                title="Reset Password"
                custonClass={styles.resetButton}
              />
            </form>
            <div className={styles.backToLogin}>
              <span className={styles.backToText}>Back to</span>
              <span
                className={styles.signInText}
                onClick={() => navigate("/signin")}
              >
                Sign in
              </span>
            </div>
          </div>
        </div>
      )}
      <ArrowFrame />
    </div>
  );
};
export default ForgotPassword;
