import { useState } from "react";
import FilledButton from "../../../components/buttons/filledbutton/FilledButton";
import Divider from "../../../components/divider/Divider";
import color from "../../../constants/color";
import { rejectedDocsList } from "../../../constants/data";
import { useGlobalContext } from "../../../context/context";
import useForm from "../../../hooks/useForm";
import { Fail } from "../../../svg-components";
import styles from "./kycrejection.module.scss";
import axios from "axios";
import * as API from "../../../constants/API";
import APICall from "../../../constants/API";

const KYCRejection = () => {
  const { closeModal, userId } = useGlobalContext();
  const access_token = localStorage.getItem("access_token");

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: {
      rejectionmessage: {
        required: {
          value: true,
          message: "Please enter reason",
        },
      },
    },
    onSubmit: () => {
      CallApiReject(data);
    },
  });

  const CallApiReject = async (data) => {
    //APPROVED_KYC
    const bodyFormData = {
      requestId: userId,
      rejectComments: data.rejectionmessage,
    };

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    await APICall.post(API.REJECT_KYC, bodyFormData, {
      headers,
    })
      .then((response) => {
        if (response.data.code === 200) {
          closeModal();
          localStorage.setItem("flag", Math.random(0, 100));
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const [rejected, setRejecetd] = useState({
    documents: false,
    photo: false,
    identityNo: false,
    proofOfAddressFile: false,
  });
  const handleSelect = (item) => {
    setRejecetd({ ...rejected, [item]: true });
  };
  const handleRemove = (item) => {
    setRejecetd({ ...rejected, [item]: false });
  };

  return (
    <div className={styles.kycRejectionContainer}>
      <div className={styles.kycRejectionFomContainer}>
        <div className={styles.kycRejection}>KYC Document Rejection</div>
        <Divider customClass={styles.divider} />
        <div className={styles.kycRejectionMessageContainer}>
          <div>
            <Fail fillColor={color.red1} width={44} height={44} />
          </div>
          <span className={styles.rejectionMessage}>
            Account has been not verified because of below reasons
          </span>
        </div>
        <div className={styles.rejectedDocuments}>
          {rejectedDocsList.map((item, index) => {
            return (
              <FilledButton
                type="button"
                title={item.name}
                key={index}
                custonClass={
                  rejected[item.value]
                    ? styles.rejectedDocButton
                    : styles.approvedDocButton
                }
                custonClassTitle={
                  !rejected[item.value] && styles.approvedDocTitle
                }
                handleClick={() => {
                  rejected[item.value]
                    ? handleRemove(item.value)
                    : handleSelect(item.value);
                }}
              />
            );
          })}
        </div>
        <form className={styles.kycRejectionForm} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="approval note" className={styles.label}>
              Reason for rejection
            </label>
            <textarea
              type="textarea"
              placeholder="Please re-upload KYC Documents."
              className={styles.textAreaField}
              rows="4"
              cols="50"
              value={data.rejectionmessage}
              onChange={handleChange("rejectionmessage")}
            />
            {errors.rejectionmessage && <div className={styles.error}>{errors.rejectionmessage}</div>}
          </div>
          <div className={styles.buttonsFlex}>
            <FilledButton
              title="Submit"
              type="submit"
              custonClass={styles.submitButton}
            />
            <FilledButton
              title="Cancel"
              type="button"
              handleClick={() => closeModal()}
              custonClass={styles.cancelButton}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default KYCRejection;
