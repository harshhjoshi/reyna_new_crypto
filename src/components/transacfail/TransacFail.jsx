import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../constants/color";
import { useGlobalContext } from "../../context/context";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import { Fail } from "../../svg-components";
import Buttonflex from "../buttonflex/ButtonFlex";
import Divider from "../divider/Divider";
import styles from "./transacfail.module.scss";
import APICall from "../../constants/API";
import * as API from "../../constants/API";

const TransacFail = ({ state, response }) => {
  const isMobile = useCheckMobileScreen();
  const { closeModal } = useGlobalContext();
  var access_token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  const handleNavigate = () => {
    closeModal()
    navigate("/mytransaction");
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

  return (
    <div className={styles.transacFailContainer}>
      <div className={styles.transacFailContent}>
        <div className={styles.transacFailMessageContainer}>
          <Fail
            fillColor={color.red1}
            height={isMobile ? 198 : 80}
            width={isMobile ? 198 : 80}
          />
          <div className={styles.transactionMessageId}>
            <span className={styles.transacFailMessage}>
              Unsuccessful transaction
            </span>
            <span className={styles.transacFailMessage}>
              Couldn't broadcast the transaction to the blockchain
            </span>
          </div>
        </div>
        <Divider customClass={styles.divider} />
        <Buttonflex
          submit="View Transaction"
          handleSubmit={() => handleNavigate()}
          cancel="Close"
          handleCancel={() => closeModal()}
          type="button"
        />
      </div>
    </div>
  );
};
export default TransacFail;
