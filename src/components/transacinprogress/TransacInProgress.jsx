import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APICall, * as API from "../../constants/API";
import color from "../../constants/color";
import { useGlobalContext } from "../../context/context";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import { InProgress } from "../../svg-components";
import Buttonflex from "../buttonflex/ButtonFlex";
import Divider from "../divider/Divider";
import styles from "./transacinprogress.module.scss";

const TransacInProgress = ({ state, response }) => {
  const isMobile = useCheckMobileScreen();
  const { closeModal } = useGlobalContext();
  // const state = useLocation().state;
  var access_token = localStorage.getItem("access_token");

  // console.log("Progress order ID:", state.status.cardPaymentData.orderId);
  // console.log("Progress TX:", response.txId);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const CALLPUTAPI = async () => {
    //
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    console.log("state.status", state.status);
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

  useEffect(() => {
    CALLPUTAPI();
  }, [CALLPUTAPI]);

  const navigate = useNavigate();
  const handleNavigate = () => {
    closeModal();
    navigate("/myportfolio");
  };

  return (
    <div className={styles.transacInProgressContainer}>
      <div className={styles.transacInProgressContent}>
        <div className={styles.transacInProgressMsgContainer}>
          <InProgress
            fillColor={color.orange}
            height={isMobile ? 198 : 130}
            width={isMobile ? 198 : 130}
          />
          <span className={styles.transacInProgressMessage}>
            Your Transaction has been submitted and is in Progress Check your
            Portfolio page for any status update
          </span>
        </div>
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
export default TransacInProgress;
