import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../constants/color";
import { useGlobalContext } from "../../context/context";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import { Success } from "../../svg-components";
import Buttonflex from "../buttonflex/ButtonFlex";
import Divider from "../divider/Divider";
// import LogoContainer from '../logo/LogoContainer';
import TextLabel from "../textlabel/TextLabel";
import styles from "./transacsuccess.module.scss";
import APICall from "../../constants/API";
import * as API from "../../constants/API";

const TransacSuccess = ({ state, response,type }) => {
  const isMobile = useCheckMobileScreen();
  const { closeModal } = useGlobalContext();
  var access_token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const handleNavigate = () => {
    closeModal();
    navigate("/myportfolio");
  };

  useEffect(() => {
    CALLPUTAPI();
  }, []);

  const CALLPUTAPI = async () => {
    //
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };

    await APICall.put(
      `${API.TransakTransaction}`,
      {
        orderId: state.status.cardPaymentData.orderId,
        transactionId: response.txId,
      },
      {
        headers: headers,
      }
    )
      .then((response) => {
        // console.log("Resoineinei:", response);
      })
      .catch((err) => {
        // setError(err.response.data.messagesMap.Username)
      });
  };

  // const state = useLocation().state;
  // console.log("Success pop:", state);
  return (
    <div className={styles.transacSuccessContainer}>
      <div className={styles.transacSuccessContent}>
        {/* <LogoContainer /> */}
        <div className={styles.transacSuccessMessageContainer}>
          <Success
            fillColor={color.green1}
            height={isMobile ? 198 : 80}
            width={isMobile ? 198 : 80}
          />
          <div className={styles.transactionMessageId}>
            <span className={styles.transacSuccessMessage}>
              Congratulations <span className={styles.coinName}>Cardano</span>{" "}
              has been Successfully {type}.
            </span>
            <span className={styles.transacIdContainer}>
              Transaction ID :{" "}
              <span className={styles.transacId}>
                1A5GqrNbpo7xwpt1VQVvcA5yzoEcgaFvff
              </span>
            </span>
          </div>
        </div>
        {/* <div className={styles.statusContainer}>
                    <TextLabel label='Wallet Address' address='1A5GqrNbpo7xwpt1VQVvcA5yzoEcgaFvff' />
                    <TextLabel label='Transaction Status' address='Successful' customClass={styles.textLabelContainer} customClassBox={styles.textLabelBox} customClassAddress={styles.address} />
                </div> */}
        <Divider customClass={styles.divider} />
        <Buttonflex
          submit="View Portfolio"
          handleSubmit={() => handleNavigate()}
          cancel="Close"
          handleCancel={() => closeModal()}
          type="button"
        />
      </div>
    </div>
  );
};
export default TransacSuccess;
