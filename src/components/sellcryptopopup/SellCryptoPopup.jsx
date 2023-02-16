import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import APICall, * as API from "../../constants/API";
import { useGlobalContext } from "../../context/context";
import useForm from "../../hooks/useForm";
import useReference from "../../hooks/useReference";
import TransacFail from "../transacfail/TransacFail";
import TransacInProgress from "../transacinprogress/TransacInProgress";
import TransacSuccess from "../transacsuccess/TransacSuccess";

const SellCryptoPopup = () => {
  var access_token = localStorage.getItem("access_token");
  const state = useSelector((state) => state.user);
  const [walletAddress, setWalletAddress] = useState(null);

  console.log("Status:", state);
  const {
    selectedCoin,
    closeModal,
    placeholder,
    openModal,
    AllOrderData,
    setAllOrderData,
    responseData,
    setResponseData,
  } = useGlobalContext();
  const ref = useReference();
  const { handleSubmit, handleChange, handleFocus, data, errors, handleBlur } =
    useForm({
      ref: ref,
      validations: {
        sellLimit: {
          required: {
            value: true,
            message: "Sell limit is required",
          },
          custom: {
            isValid: (value) => (value && Number(value) >= 2 ? true : false),
            message: "Minimum sell amount should be R2",
          },
        },
      },
      onSubmit: () => {
        console.log("API CALL");
        clickOpenTransackAPICall();
        //   clickOpenTransackAPICall();
      },
    });

  const APIGETWALLETID = async () => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await APICall.get(`${API.GETWALLETS}`, {
      headers: headers,
    })
      .then((response) => {
        if (response.status === 200) {
          setWalletAddress(response.data.data[0].address);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    APIGETWALLETID();
    setTimeout(() => {
      clickOpenTransackAPICall();
    }, 2000);
  }, [APIGETWALLETID]);

  const clickOpenTransackAPICall = async () => {
    closeModal();
    // console.log("clickOpenTransackAPICall", selectedCoin.symbol);
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    // var Amount = data.spendlimit.toFixed(2);
    // console.log('Amount',Amount);

    const body = {
      // "amount": Number(data.sellLimit)  ,
      cryptoCurrency: selectedCoin.symbol,
      transactionType: "SELL",
      fiatCurrency: "EUR",
    };
    await APICall.post(`${API.TransakTransaction}`, body, {
      headers: headers,
    })
      .then((response) => {
        if (response.status === 201) {
          setResponseData(response.data.data);
          console.log("Data:", response.data.data);
          var ObjectAdded = {
            ...response.data.data,
            defaultCryptoCurrency: selectedCoin.symbol,
            // cryptoCurrencyCode: selectedCoin.symbol,
            hostURL: window.location.origin,
            hideMenu: true,
            walletAddress: walletAddress,
            cryptoAmount: 0.5678,
            productsAvailed: "SELL",
          };
          // window.open(url, '_blank', 'noopener,noreferrer');
          // let transak = new transakSDK(ObjectAdded);
          console.log("walletAddress", walletAddress);
          // window.open(
          //   `https://staging-global.transak.com?apiKey=f7af08bf-0242-453f-a0fa-61388a5092d6&defaultCryptoCurrency=${selectedCoin.symbol}&walletAddress${walletAddress}&hostURL=${window.location.origin}`,
          //   "_blank",
          //   "noopener,noreferrer"
          // );

          window.open(
            `https://staging-global.transak.com?apiKey=f7af08bf-0242-453f-a0fa-61388a5092d6&defaultCryptoCurrency=${selectedCoin.symbol}&fiatCurrency=EUR&cryptoCurrencyCode=${selectedCoin.symbol}&productsAvailed=SELL&walletAddress=${walletAddress}&hostURL=${window.location.origin}&redirectURL=https://afrix-uat.archesoftronic.com/#/mytransaction`,
            "_blank",
            "noopener,noreferrer"
          );

          // transak.init();
          // transak.on(transak.ALL_EVENTS, (data) => {
          //   // console.log("Transit Open:", JSON.stringify(data.eventName));
          // });

          // transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
          //   console.log("Transit Complete:", orderData);
          //   setAllOrderData(orderData);
          //   openModal(null, null, "sell", orderData);

          //   transak.close();
          // });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  // AllOrderData && console.log("stats limit is ", AllOrderData.status.status);
  return AllOrderData ? (
    AllOrderData.status.status === "FAILED" ? (
      <TransacFail state={AllOrderData} response={responseData} />
    ) : AllOrderData.status.status === "PROCESSING" ||
      AllOrderData.status.status === "PENDING_DELIVERY_FROM_TRANSAK" ? (
      <TransacInProgress state={AllOrderData} response={responseData} />
    ) : AllOrderData.status.status === "SUCCESS" ? (
      <TransacSuccess
        state={AllOrderData}
        response={responseData}
        type="sold"
      />
    ) : null
  ) : null;
  // <div className={styles.sellCryptoPopupContainer}>
  //     <div className={styles.sellCryptoFormContainer}>
  //         <div className={styles.title}>
  //             Sell {selectedCoin && selectedCoin.name}
  //         </div>
  //         <Divider customClass={styles.divider} />
  //         <form className={styles.sellCryptoForm} onSubmit={handleSubmit} >
  //             <div className={styles.formFieldContainer}>
  //                 {/* <div className={styles.formField}>
  //                   <label htmlFor="coin price" className={styles.label}>
  //                       Coin Price
  //                   </label>
  //                   <input type="text" className={styles.inputField} value={selectedCoin.current_price} disabled />
  //               </div> */}
  //                 <div className={styles.formField}>
  //                     <label htmlFor="sell limit" className={styles.label}>
  //                         Sell Limit
  //                     </label>
  //                     <input
  //                         type="text"
  //                         className={styles.inputField}
  //                         placeholder={placeholder.sellLimit}
  //                         value={data.sellLimit}
  //                         onChange={handleChange("sellLimit")}
  //                         onFocus={(e) => handleFocus(e)}
  //                         onBlur={(e) => handleBlur(e, "sellLimit")}
  //                         ref={ref.sellLimit}
  //                     />
  //                     {errors.sellLimit && (
  //                         <div className={styles.error}>{errors.sellLimit}</div>
  //                     )}
  //                 </div>
  //             </div>
  //             <Buttonflex
  //                 submit="Sell"
  //                 // handleSubmit={() => clickOpenTransack()}
  //                 cancel="Cancel"
  //                 handleCancel={() => closeModal()}
  //                 type="submit"
  //                 customSubmitButton={styles.sellButton}
  //                 customClassTitle={styles.sellText}
  //             />
  //         </form>
  //     </div>
  // </div>
};
export default SellCryptoPopup;
