import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import Divider from "../../components/divider/Divider";
import Error from "../../components/error/Error";
import LogoContainer from "../../components/logo/LogoContainer";
import Spinner from "../../components/spinner/Spinner";
import UploadFile from "../../components/uploadfile/UploadFile";
import APICall, * as API from "../../constants/API";
import color from "../../constants/color";
import { validImageFileType } from "../../constants/data";
import { useGlobalContext } from "../../context/context";
import useForm from "../../hooks/useForm";
import useReference from "../../hooks/useReference";
import { gotoSignInSignUp, login } from "../../redux/userSlice";
import { Camera, Hide, View } from "../../svg-components";
import { FileInMBValidate } from "../../utils/helpers";
import styles from "./signup.module.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [countryData, setcountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [registeredString, setRegistredString] = useState("");
  let maxFileSize = 2;
  // const [counytr_ISO2, setcounytr_ISO2] = useState("");
  const {
    passwordType,
    confirmPasswordType,
    passwordTypeText,
    passwordTypePassword,
    placeholder,
  } = useGlobalContext();
  const dispatch = useDispatch();

  // const handleSignup = (e) => {
  //     e.preventDefault();
  //     navigate('/otpverification', { state: 'signup' })
  // }
  const ref = useReference();
  const {
    handleSubmit,
    handleChange,
    handleFocus,
    data,
    setData,
    errors,
    setErrors,
    handleBlur,
    click,
  } = useForm({
    initialValues: { state: "", city: "" },
    ref: ref,
    validations: {
      // uploadfile: {
      //   required: {
      //     value: true,
      //     message: "Profile picture is required",
      //   },
      //   custom: {
      //     isValid: (value) => {
      //       if (value) {
      //         const format = value.type;
      //         const size = FileInMBValidate(value.size);
      //         const valid =
      //           validImageFileType.includes(format) && size <= maxFileSize
      //             ? true
      //             : false;
      //         return valid;
      //       }
      //     },
      //     message:
      //       "Only JPEG,PNG or JPG images are allowed and Maximum size of 2MB",
      //   },
      // },
      firstname: {
        required: {
          value: true,
          message: "Please enter firstname",
        },
        // pattern: {
        //   value: "^[A-Za-z]*$",
        //   message: "Numbers and special characters are not allowed",
        // },
      },
      lastname: {
        required: {
          value: true,
          message: "Please enter lastname",
        },
        // pattern: {
        //   value: "^[A-Za-z]*$",
        //   message: "Numbers and special characters are not allowed",
        // },
      },
      username: {
        required: {
          value: true,
          message: "Please enter username",
        },
        // pattern: {
        //     value: '^[A-Za-z]*$',
        //     message: "You're not allowed to...",
        // },
        custom: {
          isValid: (value) =>
            value && value.length >= 3 && value.length <= 25 ? true : false,
          message: "Username must be between 3 to 25 characters",
        },
      },
      otpfield: {
        required: {
          value: true,
          message: "Please enter either Email id or Mobile No",
        },
        pattern: {
          value:
            /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/,
          message: "Please enter either Email id or Mobile No",
        },
        // pattern: {
        //     value: /^(\+[\d]{1,5}|0)?[7-9]\d{9}$/,
        //     message: "Please enter email or mobile",
        // },
        // custom: {
        //   isValid: (value) => (value && value.length === 10 ? true : false),
        //   message: "Mobile number must of 10 digit",
        // },
      },
      password: {
        required: {
          value: true,
          message: "Please enter password",
        },
        pattern: {
          value:
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
          message:
            "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
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
      email: {
        required: {
          value: true,
          message: "Please enter your email address",
        },
        pattern: {
          value:
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          message: "Please enter valid email address",
        },
      },
      mobile: {
        required: {
          value: true,
          message: "Please enter mobile number",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Please enter numbers only",
        },
        custom: {
          isValid: (value) =>
            value && value.length >= 8 && value.length <= 12 ? true : false,
          message: "Mobile number must be between 8 to 12 digits",
        },
      },
      address1: {
        required: {
          value: true,
          message: "Please enter address",
        },
      },
      countrycode: {
        required: {
          value: true,
          message: "Please enter country code",
        },
        pattern: {
          value: /^\+?(\d+)/,
          message: "Please enter proper country code",
        },
      },
      country: {
        required: {
          value: true,
          message: "Please select country",
        },
      },
      state: {
        // required: {
        //   value: true,
        //   message: "Please select state",
        // },
      },
      city: {
        // required: {
        //   value: true,
        //   message: "Please select city",
        // },
      },
      areacode: {
        required: {
          value: true,
          message: "Please enter areacode",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Please enter numbers only",
        },
      },
      occupation: {
        required: {
          value: true,
          message: "Please enter occupation",
        },
      },
      checkbox: {
        required: {
          value: true,
          message: "Please agree the terms and conditions",
        },
      },
    },
    isSubmit: isSubmit,
    setIsSubmit: setIsSubmit,
    onSubmit: () => RegisterOtpVerify(data),
    // onSubmit: () => navigate('/otpverification', { state: 'signup' }),
    // navigate: '/otpverification',
    // state: 'signup',
  });

  useEffect(() => {
    const callCountryAPI = async () => {
      const headers = {
        "X-CSCAPI-KEY":
          "aGhHVVg5V2RGVmx4RE1ieGFTRDYyQUFvN0RFZGs4OHJENEU4V1pHVQ==",
      };
      await APICall.get("https://api.countrystatecity.in/v1/countries", {
        headers: headers,
      })
        .then((response) => {
          setcountryData(response.data);
        })
        .catch((err) => {});
    };

    const callStateAPI = () => {
      console.log("data.state", data.city);
      setCityData([]);
      //data.country
      const headers = {
        "X-CSCAPI-KEY":
          "aGhHVVg5V2RGVmx4RE1ieGFTRDYyQUFvN0RFZGs4OHJENEU4V1pHVQ==",
      };
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${data.country}/states`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          setStateData(response.data);
        })
        .catch((err) => {});
    };

    const callCityAPI = () => {
      console.log("data.state:", data.state);
      //data.country
      const headers = {
        "X-CSCAPI-KEY":
          "aGhHVVg5V2RGVmx4RE1ieGFTRDYyQUFvN0RFZGs4OHJENEU4V1pHVQ==",
      };
      axios
        .get(
          `https://api.countrystatecity.in/v1/countries/${data.country}/states/${data.state}/cities`,
          {
            headers: headers,
          }
        )
        .then((response) => {
          setCityData(response.data);
        })
        .catch((err) => {});
    };

    callCountryAPI();
    data.country && callStateAPI();
    data.state && callCityAPI();
  }, [data.country, data.state]);

  const RegisterOtpVerify = async (data) => {
    const signup_body = JSON.stringify({
      firstName: data.firstname,
      lastName: data.lastname,
      username: data.username,
      otpSendingOn: data.otpfield,
      password: data.password,
      email: data.email,
      phoneNumber: data.mobile,
      addressLine1: data.address1,
      addressLine2: data.address2,
      countryCode: data.countrycode,
      countryId: data.country,
      stateId: isNaN(Number(data.state)) === true ? 0 : data.state,
      cityId: data.city,
      country: "All",
      state: "",
      city: "",
      areaCode: data.areacode,
      occupation: data.occupation,
    });
    const headers = {
      "Content-Type": "application/json",
    };

    if (data?.uploadfile) {
      if (errors?.uploadfile === "") {
        await APICall.post(API.SIGN_UP, signup_body, {
          headers: headers,
        })
          .then((response) => {
            if (response != undefined) {
              dispatch(login(response.data));
              dispatch(gotoSignInSignUp(false));

              setLoading(true);
              data.uploadfile &&
                !errors.uploadfile &&
                upload_ProfilePic(response.data, data);
              setLoading(false);
            } else {
              console.log("err in catch 23456");
            }
          })
          .catch((err) => {
            console.log("Error? 2", err);

            setLoading(false);

            setError(err.response.data.messages.toString());
            //setRegistredString
            if (
              err.response.data.messages.toString() ===
              "Username is already exist"
            ) {
              setRegistredString(data.username);
            } else if (
              err.response.data.messages.toString() ===
              "Username is already exist,Mobile number is already exist"
            ) {
              console.log("Username is already exist,Mobile number ");

              setRegistredString(data.username);
            } else if (
              err.response.data.messages.toString() === "Email is already exist"
            ) {
              console.log("Username is already exist,Mobile number ");

              setRegistredString(data.email);
            } else if (
              err.response.data.messages.toString() ===
              "Mobile number is already exists"
            ) {
              console.log("mobile is alread");

              setRegistredString(data.mobile);
            }
          });
      }
    } else {
      console.log("Getting in this");
      await APICall.post(API.SIGN_UP, signup_body, {
        headers: headers,
      })
        .then((response) => {
          console.log("Datas:>>", response.data);

          dispatch(login(response.data));
          dispatch(gotoSignInSignUp(false));

          setLoading(true);
          data.uploadfile &&
            !errors.uploadfile &&
            upload_ProfilePic(response.data, data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error:", err);
          setLoading(false);
          setError(err.response.data.messages.toString());
          //setRegistredString
          if (
            err.response.data.messages.toString() ===
            "Username is already exist"
          ) {
            setRegistredString(data.username);
          } else if (
            err.response.data.messages.toString() ===
            "Username is already exist,Mobile number is already exist"
          ) {
            console.log("Username is already exist,Mobile number ");

            setRegistredString(data.username);
          } else if (
            err.response.data.messages.toString() === "Email is already exist"
          ) {
            console.log("Username is already exist,Mobile number ");

            setRegistredString(data.email);
          } else if (
            err.response.data.messages.toString() ===
            "Mobile number is already exists"
          ) {
            console.log("mobile is alread");

            setRegistredString(data.mobile);
          }
        });
    }
  };

  const upload_ProfilePic = async (datas, data) => {
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${datas.token}`,
      "Content-Type": "multipart/form-data",
    };
    var bodyFormData = new FormData();

    bodyFormData.append("file", data.uploadfile);
    await APICall.post(API.upload_ProfilePic, bodyFormData, { headers })
      .then((response) => {
        console.log("Datas:>>", response);
        if (response.data === true) {
          localStorage.setItem("otpverified", false);
          localStorage.setItem("access_token", datas.token);

          navigate("/otpverification", { state: "signup" });

          setLoading(false);
        }
      })
      .then((err) => {
        setLoading(false);
        setError(err.response.data.messages);
      });
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(null);
      }, 10000);
  }, [error]);
  // console.log("image..???", data.uploadfile);
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (isSubmit) {
      if (data?.uploadfile) {
        const value = data?.uploadfile;
        const format = value.type;
        const size = FileInMBValidate(value.size);
        if (validImageFileType.includes(format) && size <= maxFileSize) {
          setErrors({ ...errors, uploadfile: "" });
        } else {
          // setData({...data,uploadfile:null});
          console.log("errors..??", errors);
          setErrors({
            ...errors,
            uploadfile:
              "Only JPEG,PNG or JPG images are allowed and Maximum size of 2MB",
          });
          // alert('upload proper image');
        }
      }
    }
  }, [data.uploadfile, isSubmit, click]);
  return (
    <div className={styles.signupContainer}>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.signupFormContainer}>
          <div className={styles.signUpForm}>
            <LogoContainer />
            <div className={styles.signUpText}>Sign Up</div>
            <div className={styles.signUpTitle}>
              Sign up for FREE by filling in the form below.
            </div>
            <Divider customClass={styles.divider} />
            <form className={styles.signUpFormBody} onSubmit={handleSubmit}>
              <div className={styles.uploadPhotoContainer}>
                <div className={styles.uploadPhotoLeft}>
                  <div
                    className={
                      errors.uploadfile && !data.uploadfile
                        ? styles.cameraCircleRed
                        : styles.cameraCircle
                    }
                    onClick={() => handleClick()}
                  >
                    {data.uploadfile &&
                    validImageFileType.includes(data.uploadfile.type) ? (
                      <img
                        src={URL.createObjectURL(data.uploadfile)}
                        alt="profile pic"
                        className={styles.profileImage}
                      />
                    ) : (
                      <Camera
                        fillColor={
                          errors.uploadfile && !data.uploadfile
                            ? color.red1
                            : color.grey
                        }
                      />
                    )}
                  </div>
                  <div className={styles.profilePicture}>Profile Picture</div>
                </div>
                <UploadFile
                  value={data.uploadfile ? data.uploadfile.name : ""}
                  handleFileChange={handleChange("uploadfile")}
                  ref1={hiddenFileInput}
                  handleClick={() => handleClick()}
                />
              </div>
              {errors.uploadfile && (
                <div className={styles.error}>{errors.uploadfile}</div>
              )}
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="firstname" className={styles.label}>
                    First Name
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.firstname}
                    onChange={handleChange("firstname")}
                    // onBlur={(e) => handleBlur(e, "firstname")}
                    ref={ref.firstname}
                    placeholder={placeholder.firstname}
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, "firstname")}
                  />
                  {errors.firstname && (
                    <div className={styles.error}>{errors.firstname}</div>
                  )}
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="lastname" className={styles.label}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    ref={ref.lastname}
                    value={data.lastname}
                    onChange={handleChange("lastname")}
                    onBlur={(e) => handleBlur(e, "lastname")}
                    placeholder={placeholder.lastname}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.lastname && (
                    <div className={styles.error}>{errors.lastname}</div>
                  )}
                </div>
              </div>
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="username" className={styles.label}>
                    Username
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.username}
                    ref={ref.username}
                    onChange={handleChange("username")}
                    onBlur={(e) => handleBlur(e, "username")}
                    placeholder={placeholder.username}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.username && (
                    <div className={styles.error}>{errors.username}</div>
                  )}
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="otp" className={styles.label}>
                    OTP Verification {"(Email or Mobile No)"}
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    placeholder={placeholder.otpfield}
                    ref={ref.otpfield}
                    value={data.otpfield}
                    onChange={handleChange("otpfield")}
                    onBlur={(e) => handleBlur(e, "otpfield")}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.otpfield && (
                    <div className={styles.error}>{errors.otpfield}</div>
                  )}
                </div>
              </div>
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <input
                    type={passwordType}
                    className={styles.inputField}
                    value={data.password}
                    ref={ref.password}
                    placeholder={placeholder.password}
                    onFocus={(e) => handleFocus(e)}
                    onChange={handleChange("password")}
                    onBlur={(e) => handleBlur(e, "password")}
                  />
                  {errors.password ? (
                    <div className={styles.error}>{errors.password}</div>
                  ) : (
                    <div className={styles.info}>
                      {" "}
                      Minimum 8 characters, at least one uppercase letter, one
                      lowercase letter, one number and one special character.
                    </div>
                  )}
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
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="confirmpassword " className={styles.label}>
                    Confirm Password
                  </label>
                  <input
                    type={confirmPasswordType}
                    className={styles.inputField}
                    value={data.confirmpassword}
                    ref={ref.confirmpassword}
                    onChange={handleChange("confirmpassword")}
                    placeholder={placeholder.confirmpassword}
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e, "confirmpassword")}
                  />
                  {errors.confirmpassword && (
                    <div className={styles.error}>{errors.confirmpassword}</div>
                  )}
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
                </div>
              </div>
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.email}
                    ref={ref.email}
                    onChange={handleChange("email")}
                    onBlur={(e) => handleBlur(e, "email")}
                    placeholder={placeholder.email}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.email && (
                    <div className={styles.error}>{errors.email}</div>
                  )}
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="mobile" className={styles.label}>
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.mobile}
                    onChange={handleChange("mobile")}
                    onBlur={(e) => handleBlur(e, "mobile")}
                    ref={ref.mobile}
                    placeholder={placeholder.mobile}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.mobile && (
                    <div className={styles.error}>{errors.mobile}</div>
                  )}
                </div>
              </div>
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="address1" className={styles.label}>
                    Address Line1
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.address1}
                    ref={ref.address1}
                    onChange={handleChange("address1")}
                    placeholder={placeholder.address}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.address1 && (
                    <div className={styles.error}>{errors.address1}</div>
                  )}
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="address2" className={styles.label}>
                    Address Line2 (Optional)
                  </label>
                  <input type="text" className={styles.inputField} />
                </div>
              </div>
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="countrycode" className={styles.label}>
                    Country Code
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.countrycode}
                    onChange={handleChange("countrycode")}
                    onBlur={(e) => handleBlur(e, "countrycode")}
                    ref={ref.countrycode}
                    placeholder={placeholder.countrycode}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.countrycode && (
                    <div className={styles.error}>{errors.countrycode}</div>
                  )}
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="country" className={styles.label}>
                    Country
                  </label>
                  {/* <Dropdown data={countryData} id={0} title={data.country ? data.country : 'Select Country'} name='country' handleClick={handleChange} /> */}
                  <select
                    className={styles.selectField}
                    onChange={handleChange("country")}
                    onBlur={(e) => handleBlur(e, "country")}
                    ref={ref.country}
                    // value="select value"
                  >
                    {countryData.map((item, index) => {
                      return index == 0 ? (
                        <option value="0" key={index}>
                          Select Country
                        </option>
                      ) : (
                        <option value={item.id} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.country && (
                    <div className={styles.error}>{errors.country}</div>
                  )}
                </div>
              </div>

              {stateData.length <= 0 && cityData.length <= 0 ? null : (
                <div className={styles.formFieldsContainer}>
                  {stateData.length <= 0 ? (
                    (null && data.country) !== 0
                  ) : (
                    <div className={styles.formFields}>
                      <label htmlFor="state" className={styles.label}>
                        State
                      </label>
                      <select
                        className={styles.selectField}
                        onChange={handleChange("state")}
                        ref={ref.state}
                      >
                        <option value="">Select State</option>
                        {stateData.map((item, index) => {
                          return (
                            <option key={item.id} value={item.iso2}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                  {cityData.length <= 0 &&
                  stateData.length <= 0 ? null : cityData.length <= 0 ? (
                    (null && data.state) !== 0
                  ) : (
                    // <div className={styles.formFieldsContainer}>
                    <div className={styles.formFields}>
                      <label htmlFor="city" className={styles.label}>
                        City
                      </label>{" "}
                      <select
                        className={styles.selectField}
                        onChange={handleChange("city")}
                        ref={ref.city}
                      >
                        <option value="">Select City</option>
                        {cityData.map((item, index) => {
                          return (
                            <option
                              value={item.id}
                              key={index}
                              className={styles.optionField}
                            >
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    // </div>
                  )}
                </div>
              )}
              <div className={styles.formFieldsContainer}>
                <div className={styles.formFields}>
                  <label htmlFor="areacode" className={styles.label}>
                    Area Code
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.areacode}
                    ref={ref.areacode}
                    onChange={handleChange("areacode")}
                    onBlur={(e) => handleBlur(e, "areacode")}
                    placeholder={placeholder.areacode}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.areacode && (
                    <div className={styles.error}>{errors.areacode}</div>
                  )}
                </div>
                <div className={styles.formFields}>
                  <label htmlFor="occupation" className={styles.label}>
                    Occupation
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={data.occupation}
                    ref={ref.occupation}
                    onChange={handleChange("occupation")}
                    onBlur={(e) => handleBlur(e, "occupation")}
                    placeholder={placeholder.occupation}
                    onFocus={(e) => handleFocus(e)}
                  />
                  {errors.occupation && (
                    <div className={styles.error}>{errors.occupation}</div>
                  )}
                </div>
              </div>
              <div className={styles.termsPolicy}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={handleChange("checkbox")}
                  onBlur={(e) => handleBlur(e, "checkbox")}
                  checked={data.checkbox}
                />
                <div className={styles.termsPolicyContent}>
                  I confirm that I have read and consent to the storage and
                  handling of my data by Reyna Crypto in accordance with Reyna
                  Crypto's{" "}
                  <span className={styles.privacyHyperlink}>
                    Privacy policy.
                  </span>
                  {errors.checkbox && (
                    <div className={styles.error}>{errors.checkbox}</div>
                  )}
                </div>
              </div>
              {error && (
                <Error
                  registeredString={registeredString}
                  errorMessage={error}
                  otp={true}
                />
              )}
              <div className={styles.buttonContainer}>
                <FilledButton title="Create Account" type="submit" />
                <FilledButton
                  title="Reset"
                  custonClass={styles.resetButton}
                  custonClassTitle={styles.resetButtonText}
                  type="reset"
                  handleClick={() => {
                    setData({});
                    // setcountryData([]);
                    setStateData([]);
                    setCityData([]);
                    setErrors({});
                    data.country = "";
                    data.state = "";
                  }}
                />
              </div>
            </form>

            <div className={styles.hasAccount}>
              <span className={styles.hasAccountText}>
                Already have an account?
              </span>
              <span
                className={styles.signin}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign in
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignUp;
