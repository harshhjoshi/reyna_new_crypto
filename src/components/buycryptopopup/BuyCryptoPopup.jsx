import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import APICall, * as API from "../../constants/API";
import { useGlobalContext } from "../../context/context";
import useForm from "../../hooks/useForm";
import useReference from "../../hooks/useReference";
import Buttonflex from "../buttonflex/ButtonFlex";
import Divider from "../divider/Divider";
import TransacFail from "../transacfail/TransacFail";
import TransacInProgress from "../transacinprogress/TransacInProgress";
import TransacSuccess from "../transacsuccess/TransacSuccess";
import styles from "./buycryptopopup.module.scss";

const BuyCryptPopup = ({ item }) => {
  var access_token = localStorage.getItem("access_token");
  const [walletAddress, setWalletAddress] = useState(null);

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
  const [spendLimit, setSpendLimit] = useState();
  const [orderData, setOrderData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const ResetPasswordTimer = useCallback(() => {
    setCounter(10);
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

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
      amount: Number(data.spendlimit),
      cryptoCurrency: selectedCoin.symbol,
      transactionType: "BUY",
      fiatCurrency: "INR",
      hostURL: window.location.origin,
    };

    await APICall.post(`${API.TransakTransaction}`, body, {
      headers: headers,
    })
      .then((response) => {
        console.log("Transak Env:", response.data.data);
        if (response.status === 201) {
          setResponseData(response.data.data);
          // console.log("Data:", response.data.data);
          var ObjectAdded = {
            ...response.data.data,
            defaultCryptoCurrency: selectedCoin.symbol,
            cryptoCurrencyCode: selectedCoin.symbol,
            hostURL: window.location.origin,
            hideMenu: true,
            walletAddress: walletAddress,
            productsAvailed: "BUY",
            // defaultFiatAmount: Number(data.spendlimit),
            // fiatAmount: Number(data.spendlimit),
          };

          // let transak = new transakSDK(ObjectAdded);
          window.open(
            `https://staging-global.transak.com?apiKey=f7af08bf-0242-453f-a0fa-61388a5092d6&defaultCryptoCurrency=${selectedCoin.symbol}&fiatCurrency=ZAR&cryptoCurrencyCode=${selectedCoin.symbol}&productsAvailed=BUY&walletAddress=${walletAddress}&hostURL=${window.location.origin}&fiatAmount=${data.spendlimit}&redirectURL=https://afrix-uat.archesoftronic.com/#/mytransaction`,
            "_blank",
            "noopener,noreferrer"
          );

          // transak.init();
          // transak.on(transak.ALL_EVENTS, (data) => {
          //   console.log("Transit Open:", JSON.stringify(data));
          // });

          // transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
          //   // console.log("Transit Complete:", orderData);
          //   setOrderData(orderData.status.status);
          //   setAllOrderData(orderData);
          //   openModal(null, null, "buy", orderData);

          //   transak.close();
          //   // }, 10000);
          // });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    counter <= 0 && ResetPasswordTimer();
  }, [ResetPasswordTimer, counter]);

  const ref = useReference();
  const { handleSubmit, handleChange, handleFocus, data, errors, handleBlur } =
    useForm({
      ref: ref,
      validations: {
        spendlimit: {
          required: {
            value: true,
            message: "Spend limit is required",
          },
          custom: {
            isValid: (value) => (value && Number(value) >= 513 ? true : false),
            message: "Minimum buy amount should be R530",
          },
        },
      },
      onSubmit: () => {
        // console.log("Get aData");
        clickOpenTransackAPICall();
      },
    });

  // useEffect(() => {
  //     setQuintity(spendLimit / price);
  //     setTotalPrice(quintity * price)
  // }, [spendLimit, price])

  // console.log('selected coin...???', selectedCoin);
  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // console.log('form submit');
  // }

  return AllOrderData ? (
    AllOrderData.status.status === "FAILED" ? (
      <TransacFail state={AllOrderData} response={responseData} />
    ) : AllOrderData.status.status === "PROCESSING" ? (
      <TransacInProgress state={AllOrderData} response={responseData} />
    ) : AllOrderData.status.status === "SUCCESS" ? (
      <TransacSuccess
        state={AllOrderData}
        response={responseData}
        type="purchased"
      />
    ) : null
  ) : (
    <div className={styles.buyCryptoPopupContainer}>
      <div className={styles.buyCryptoFormContainer}>
        <div className={styles.title}>
          Buy {selectedCoin && selectedCoin.name}
        </div>
        <Divider customClass={styles.divider} />
        <form className={styles.buyCryptForm} onSubmit={handleSubmit}>
          <div className={styles.formFieldContainer}>
            {/* <div className={styles.formField}>
                          <label htmlFor="coin price" className={styles.label}>
                              Coin Price
                          </label>
                          <input type="text" className={styles.inputField} value={selectedCoin.current_price} disabled />
                      </div> */}
            <div className={styles.formField}>
              <label htmlFor="spend limit" className={styles.label}>
                Spend Limit
              </label>
              <input
                type="text"
                className={styles.inputField}
                placeholder={placeholder.spendlimit}
                value={data.spendlimit}
                onChange={handleChange("spendlimit")}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e, "spendlimit")}
                ref={ref.spendlimit}
              />
              {errors.spendlimit && (
                <div className={styles.error}>{errors.spendlimit}</div>
              )}
            </div>
            {/* <div className={styles.formField}>
                          <label htmlFor="quintity" className={styles.label}>
                              Quantity
                          </label>
                          <input type="text" className={styles.inputField} value={quintity} placeholder='10' disabled />
                      </div>
                      <div className={styles.formField}>
                          <label htmlFor="Total Price" className={styles.label}>
                              Total Price
                          </label>
                          <input type="text" className={styles.inputField} value={totalPrice} placeholder='$10.00' disabled />
                      </div> */}
          </div>
          {/* <div className={styles.counterMessageContainer}>
                      <span className={styles.counterMessage}>
                          Price will refresh in <span className={styles.counter}>{counter}</span> seconds remaining
                      </span>
                  </div> */}
          <Buttonflex
            submit="Buy"
            // handleSubmit={() => clickOpenTransack()}
            cancel="Cancel"
            handleCancel={() => closeModal()}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
export default BuyCryptPopup;
