import styles from "./kyc.module.scss";
import Divider from "../../components/divider/Divider";
import Number from "../../components/number/Number";
import DragDropFile from "../../components/dragdropfile/DragDropFIle";
import List from "../../components/list/List";
import FileInfo from "../../components/fileinfo/FileInfo";
import { useEffect, useState } from "react";
import {
  addressDocumentList,
  photoDocumentList,
  validIdentityCardType,
  validImageFileType,
} from "../../constants/data";
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import { FileInMB, FileInMBValidate } from "../../utils/helpers";
import axios from "axios";
import * as API from "../../constants/API";
import APICall from "../../constants/API";
import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/Spinner";
import KYCStatus from "../kycstatus/KYCStatus";
import localStorage from "redux-persist/es/storage";

const KYC = () => {
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  var access_token = localStorage.getItem("access_token");
  // const KYC_STATUS = localStorage.getItem("submitted");
  const [KYC_STATUS, setKey_status] = useState("");
  const [loading, setLoading] = useState(false);
  const status = useSelector((state) => state.user);

  const handleChange = (e, name) => {
    setFiles({ ...files, [name]: e.target.value.trimLeft() });
  };
  let maxFileSize = 2;
  const validations = {
    identitycard: {
      required: {
        value: true,
        message: "Please upload document for Identity ",
      },
      custom: {
        isValid: (value) => {
          if (value) {
            const format = value.type;
            const size = FileInMBValidate(value.size);
            const valid =
              validIdentityCardType.includes(format) && size <= maxFileSize
                ? true
                : false;
            return valid;
          }
        },
        message:
          "Only JPEG,PNG,JPG or PDF  files are allowed and Maximum size of 2MB",
      },
    },
    selfphoto: {
      required: {
        value: true,
        message: "Please upload your photo",
      },
      custom: {
        isValid: (value) => {
          if (value) {
            const format = value.type;
            const size = FileInMBValidate(value.size);
            const valid =
              validImageFileType.includes(format) && size <= maxFileSize
                ? true
                : false;
            return valid;
          }
        },
        message:
          "Only JPEG,PNG or JPG images are allowed and Maximum size of 2MB",
      },
    },
    identitynumber: {
      required: {
        value: true,
        message: "Please enter Identity number",
      },
    },
    addressproof: {
      required: {
        value: true,
        message: "Please select address proof",
      },
    },
    addressprooffile: {
      required: {
        value: true,
        message: "Please upload proof of address document",
      },
      custom: {
        isValid: (value) => {
          if (value) {
            const format = value.type;
            const size = FileInMBValidate(value.size);
            const valid =
              validIdentityCardType.includes(format) && size <= maxFileSize
                ? true
                : false;
            return valid;
          }
        },
        message:
          "Only JPEG,PNG,JPG or PDF  files are allowed and Maximum size of 2MB",
      },
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};
    for (const key in validations) {
      const value = files[key];
      const validation = validations[key];
      const pattern = validation?.pattern;
      const custom = validation?.custom;
      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      } else if (pattern?.value && !RegExp(pattern.value).test(value)) {
        valid = false;
        newErrors[key] = pattern.message;
      } else if (custom?.isValid && !custom.isValid(value)) {
        valid = false;
        newErrors[key] = custom.message;
      }
    }
    if (!valid) {
      setErrors(newErrors);
      return;
    } else {
      // navigate(options.navigate, { state: options.state })
      // OTPVerification();
      KYC_UPLOAD();
    }
    setErrors({});
  };

  const API_Get_KYC_Details = () => {
    setLoading(true);

    Promise.resolve(access_token).then(
      function (value) {
        const headers = {
          Authorization: `Bearer ${value}`,
          "Content-Type": "application/json",
        };
        APICall.get(`${API.GET_KEY_DETAILS}${status.user.userId}`, {
          headers: headers,
        })
          .then((response) => {
            if (response.data.code === 200) {
              var bodyFormData = new FormData();
              bodyFormData.append("identityDocFile", files.identitycard);
              bodyFormData.append("photoDocFile", files.selfphoto);
              bodyFormData.append(
                "physicalAddressDocFile",
                files.addressprooffile
              );
              bodyFormData.append(
                "kycRequest",
                JSON.stringify({
                  requestId: response.data.data.requestId,
                  identityNumber: files.identitynumber,
                  physicalAddress: files.addressproof,
                })
              );
              APICall.put(API.KYC_UPLOAD, bodyFormData, {
                headers,
              })
                .then((response) => {
                  setLoading(false);
                  if (response.data.code === 200) {
                    setKey_status("Submitted");
                  }
                })
                .catch((err) => {
                  setLoading(false);
                });
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      },
      function (value) {
        // not called
      }
    );
  };

  const KYC_UPLOAD = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("identityDocFile", files.identitycard);
    bodyFormData.append("photoDocFile", files.selfphoto);
    bodyFormData.append("physicalAddressDocFile", files.addressprooffile);
    bodyFormData.append(
      "kycRequest",
      JSON.stringify({
        identityNumber: files.identitynumber,
        physicalAddress: files.addressproof,
      })
    );

    setLoading(true);

    if (status.user.kycStatus === "Rejected") {
      API_Get_KYC_Details();
    } else {
      Promise.resolve(access_token).then(function (value) {
        const headers = {
          Authorization: `Bearer ${value}`,
          "Content-Type": "multipart/form-data",
        };
        APICall.post(API.KYC_UPLOAD, bodyFormData, {
          headers,
        })
          .then((response) => {
            setLoading(false);

            if (response.data.status === "CREATED") {
              setKey_status(response.data.data.requestStatus);
              // localStorage.setItem("submitted", response.data.data.requestStatus);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log("Error", err);
          });
      });
    }
  };
  // console.log('files...???', files);
  return loading ? (
    <Spinner customClass={styles.spinner} />
  )
    : status.user.kycStatus === "Approved" ||
      status.user.kycStatus === "Submitted" ? (
      <KYCStatus status={status.user.kycStatus} />
    ) : KYC_STATUS === "Submitted" ? (
      <KYCStatus status={KYC_STATUS} />
    )
      :
      (
        <div className={styles.kycContainer}>
          <div className={styles.kycDocumentTitle}>KYC Document </div>
          <div className={styles.requiredDocumentText}>
            Documents required to verify the identity
          </div>
          <Divider customClass={styles.divider} />
          <form
            className={styles.uploadDocumentsForm}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={styles.formFieldContainerActive}>
              <Number number={1} active={true} />
              <div className={styles.documentDetails}>
                <div className={styles.documentType}>
                  <span className={styles.documentTypeText}>
                    A colour photo or scan of one of these documents:
                  </span>
                </div>
                <List data={photoDocumentList} active={true} />
                {!files.identitycard ? (
                  <DragDropFile
                    name="identitycard"
                    files={files}
                    setFiles={setFiles}
                    active={true}
                    filetype='PDF,PNG,JPEG,JPG (max size upto 2MB)'
                  />
                ) : (
                  <FileInfo
                    file={files.identitycard}
                    data={files}
                    setData={setFiles}
                    keys="identitycard"
                  />
                )}
                {errors.identitycard && (
                  <div className={styles.error}>{errors.identitycard}</div>
                )}
              </div>
            </div>
            <div
              className={
                files.identitycard
                  ? styles.formFieldContainerActive
                  : styles.formFieldContainerDeactive
              }
            >
              <Number number={2} active={files.identitycard ? true : false} />
              <div className={styles.documentDetails}>
                <div className={styles.documentType}>
                  <span className={styles.documentTypeText}>
                    A self portrait photo:
                  </span>
                  <span className={styles.documentTypeSubText}>
                    {"("}no older than 24 hours{")"}
                  </span>
                </div>
                {!files.selfphoto ? (
                  <DragDropFile
                    name="selfphoto"
                    files={files}
                    setFiles={setFiles}
                    active={files.identitycard ? true : false}
                    filetype='PNG,JPEG,JPG (max size upto 2MB)'
                  />
                ) : (
                  <FileInfo
                    file={files.selfphoto}
                    data={files}
                    setData={setFiles}
                    keys="selfphoto"
                  />
                )}
                {errors.selfphoto && (
                  <div className={styles.error}>{errors.selfphoto}</div>
                )}
              </div>
            </div>
            <div
              className={
                files.selfphoto
                  ? styles.formFieldContainerActive
                  : styles.formFieldContainerDeactive
              }
            >
              <Number number={3} active={files.selfphoto ? true : false} />
              <div className={styles.documentDetails}>
                <div className={styles.documentType}>
                  <span className={styles.documentTypeText}>Identity Number:</span>
                  <span className={styles.documentTypeSubText}>
                    Please enter your Identity Number
                  </span>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="identitynumber" className={styles.label}>
                    Identity Number
                  </label>
                  <input
                    type="text"
                    className={styles.inputField}
                    value={files.identitynumber}
                    onChange={(e) => handleChange(e, "identitynumber")}
                    disabled={files.selfphoto ? false : true}
                  />
                </div>
                {errors.identitynumber && (
                  <div className={styles.error}>{errors.identitynumber}</div>
                )}
              </div>
            </div>
            <div
              className={
                files.identitynumber
                  ? styles.formFieldContainerActive
                  : styles.formFieldContainerDeactive
              }
            >
              <Number number={4} active={files.identitynumber ? true : false} />
              <div className={styles.documentDetails}>
                <div className={styles.documentType}>
                  <span className={styles.documentTypeText}>
                    Proof of Address of one of these documents:
                  </span>
                </div>
                <List
                  data={addressDocumentList}
                  active={files.identitynumber ? true : false}
                />
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="identitynumber" className={styles.label}>
                    Proof of Address
                  </label>
                  {/* <input
                  type="text"
                  className={styles.inputField}
                  value={files.addressproof}
                  onChange={(e) => handleChange(e, "addressproof")}
                  disabled={files.identitynumber ? false : true}
                /> */}
                  <select
                    className={styles.inputField}
                    onChange={(e) => handleChange(e, "addressproof")}
                    // ref={ref.country}
                    // value="select value"
                    disabled={files.identitynumber ? false : true}
                  >
                    <option value="">Select proof of address</option>
                    {addressDocumentList.map((item, index) => {
                      return (
                        <option value={item.iso2} key={index}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {errors.addressproof && (
                  <div className={styles.error}>{errors.addressproof}</div>
                )}
                {!files.addressprooffile ? (
                  <DragDropFile
                /* handleFileChange={handleChange('identitycard')} */ name="addressprooffile"
                    files={files}
                    setFiles={setFiles}
                    active={files.identitynumber ? true : false}
                    filetype='PDF,PNG,JPEG,JPG (max size upto 2MB)'
                  />
                ) : (
                  <FileInfo
                    file={files.addressprooffile}
                    data={files}
                    setData={setFiles}
                    keys="addressprooffile"
                  />
                )}
                {errors.addressprooffile && (
                  <div className={styles.error}>{errors.addressprooffile}</div>
                )}
              </div>
            </div>
            <Divider customClass={styles.divider} />
            <FilledButton
              type="submit"
              title="Send Document for Verification"
              custonClass={styles.sendDocButton}
            />
          </form>
        </div>
      );
};
export default KYC;
