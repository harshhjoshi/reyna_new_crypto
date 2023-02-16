import { useNavigate } from "react-router-dom";
import ArrowFrame from "../../components/arrowframe/ArrowFrame";
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import Divider from "../../components/divider/Divider";
import LogoContainer from "../../components/logo/LogoContainer";
import color from "../../constants/color";
import { useGlobalContext } from "../../context/context";
import { Hide, View } from "../../svg-components";
import styles from "./resetpassword.module.scss";
import Modal from "../../components/modal/Modal";
import { messages } from "../../constants/messages";
import useForm from "../../hooks/useForm";
import axios from "axios";
import * as API from "../../constants/API";
import Error from "../../components/error/Error";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import useReference from "../../hooks/useReference";
import APICall from "../../constants/API";

const ResetPassword = () => {
  const reset_password_token = window.location.href.split("=");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const {
    isModalOpen,
    openModal,
    passwordType,
    confirmPasswordType,
    passwordTypeText,
    passwordTypePassword,
    placeholder,
  } = useGlobalContext();
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     openModal();
  // }
  const ref = useReference();
  const { handleSubmit, handleChange, handleFocus, data, errors, handleBlur } =
    useForm({
      ref: ref,
      validations: {
        password: {
          required: {
            value: true,
            message: "Please enter password",
          },
          custom: {
            isValid: (value) =>
              value && value.length >= 8 && value.length <= 16 ? true : false,
            message: "Password must be between 8 to 16 characters",
          },
        },
        confirmpassword: {
          required: {
            value: true,
            message: "Please enter confirm password",
          },
          custom: {
            isValid: (value) => value && value === data.password,
            message: "Password and confirm password must be same",
          },
        },
      },
      onSubmit: () => {
        ResetPasswordAPI(data);
      },
      // navigate: '/checkmail',
      // state: 'checkmail'
    });

  const ResetPasswordAPI = async (data) => {
    setLoading(true);

    const headers = {
      "Content-Type": "application/json",
    };
    const ResetParams = JSON.stringify({
      password: data.password,
      resetToken: reset_password_token[1],
    });

    await APICall.put(`${API.RESET_PASSWORD}`, ResetParams, {
      headers: headers,
    })
      .then((response) => {
        if (response.data === true) {
          openModal();
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);

        setError(err.response.data.messages.toString());
      });
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(null);
      }, 10000);
  }, [error]);

  return !isModalOpen ? (
    <div className={styles.resetPasswordContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.resetPasswordFormContainer}>
          <div className={styles.resetPasswordForm}>
            <LogoContainer />
            <div className={styles.setNewPasswordText}>Set new password</div>
            <div className={styles.setNewPasswordTitle}>
              Your new password must be different to previously used passwords.
            </div>
            <Divider customClass={styles.divider} />
            <form
              className={styles.resetPasswordFormBody}
              onSubmit={handleSubmit}
            >
              <div className={styles.formFields}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type={passwordType}
                  className={styles.inputField}
                  value={data.password}
                  onChange={handleChange("password")}
                  onBlur={(e) => handleBlur(e, "password")}
                  placeholder={placeholder.password}
                  onFocus={(e) => handleFocus(e)}
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
              <div className={styles.formFields}>
                <label htmlFor="confirmpassword" className={styles.label}>
                  Confirm Password
                </label>
                <input
                  type={confirmPasswordType}
                  className={styles.inputField}
                  value={data.confirmpassword}
                  onChange={handleChange("confirmpassword")}
                  placeholder={placeholder.confirmpassword}
                  onFocus={(e) => handleFocus(e)}
                  onBlur={(e) => handleBlur(e, "confirmpassword")}
                  ref={ref.confirmpassword}
                />
                {confirmPasswordType === "password" ? (
                  <Hide
                    fillColor={color.grey1}
                    customClass={styles.view}
                    handleClick={() => passwordTypeText("confirm")}
                  />
                ) : (
                  <View
                    fillColor={color.grey1}
                    customClass={styles.view}
                    handleClick={() => passwordTypePassword("confirm")}
                  />
                )}
                {errors.confirmpassword && (
                  <div className={styles.error}>{errors.confirmpassword}</div>
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
  ) : (
    <Modal
      status="success"
      message={messages.sucsess.resetpassword}
      destination="/signin"
    />
  );
};
export default ResetPassword;
