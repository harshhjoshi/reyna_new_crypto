import color from "../../../constants/color";
import { Success } from "../../../svg-components";
import Divider from "../../divider/Divider";
import styles from "./kycapproval.module.scss";
import FilledButton from "../../buttons/filledbutton/FilledButton";
import { useGlobalContext } from "../../../context/context";
import useForm from "../../../hooks/useForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import * as API from "../../../constants/API";
import APICall from "../../../constants/API";

const KYCApproval = () => {
  const { closeModal, userId } = useGlobalContext();
  const path = useLocation().state;
  const access_token = localStorage.getItem("access_token");

  const { handleSubmit, handleChange, data } = useForm({
    onSubmit: () => {
      CallApiApproval();
    },
  });

  const CallApiApproval = async () => {
    //APPROVED_KYC
    const bodyFormData = {
      requestId: userId,
      approveComments: data.approvalmessage,
    };

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    await APICall.post(API.APPROVED_KYC, bodyFormData, {
      headers,
    })
      .then((response) => {
        if (response.data.code === 200) {
          closeModal();
          localStorage.setItem("flag", Math.random(0, 100));
        }
      })
      .catch((err) => { });
  };

  return (
    <div className={styles.kycApprovalContainer}>
      <div className={styles.kycApprovalFomContainer}>
        <div className={styles.kycApproval}>KYC Document Approval</div>
        <Divider customClass={styles.divider} />
        <div className={styles.kycApprovalMessageContainer}>
          <div>
            <Success fillColor={color.green1} width={44} height={44} />
          </div>
          <span className={styles.approvalMessage}>
            Congratulations! KYC has been verified successfully.
          </span>
        </div>
        <form className={styles.kycApprovalForm} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="approval note" className={styles.label}>
              Approval Notes
            </label>
            <textarea
              type="textarea"
              placeholder="Enter Approval Notes"
              className={styles.textAreaField}
              rows="4"
              cols="50"
              value={data.approvalmessage}
              onChange={handleChange("approvalmessage")}
            />
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
export default KYCApproval;
