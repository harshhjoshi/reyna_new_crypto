import { useGlobalContext } from "../../context/context";
import FilledButton from "../buttons/filledbutton/FilledButton";
import Spanflex from "../spanflex/Spanflex";
import styles from "./tradingcard.module.scss";
const TradingCardMobile = ({ item }) => {
  // console.log('coin...???', item);
  const { isModalOpen, openModal, closeModal } = useGlobalContext();
  return (
    <div className={styles.tradingCardContainer}>
      {item && (
        <div className={styles.itemContainer}>
          <Spanflex label={item.name} value={item.symbol} />
          <Spanflex
            label="Current Price"
            value={"INR " + item.current_price.toLocaleString()}
            customClassLabel={styles.priceLabel}
            customClassValue={styles.priceText}
          />
          <Spanflex
            label="24h chg%"
            customClass={styles.changeSpanFlex}
            value={
              item.price_change_percentage_24h < 0
                ? parseFloat(item.price_change_percentage_24h).toFixed(2) + "%"
                : `${
                    parseFloat(item.price_change_percentage_24h).toFixed(1) +
                    "%"
                  }`
            }
            customClassLabel={styles.priceLabel}
            customClassValue={
              item.price_change_percentage_24h < 0
                ? styles.priceTextRed
                : styles.priceTextGreen
            }
          />
          {item.name === "Ethereum" ||
          item.name === "Decentraland" ||
          item.name === "Lido Staked Ether" ||
          item.name === "The Sandbox" ? (
            <div className={styles.buysellButtons}>
              <FilledButton
                title="BUY"
                custonClass={styles.buyButton}
                handleClick={() => {
                  isModalOpen ? closeModal() : openModal(item, null, "buy");
                }}
              />

              <FilledButton
                title="SELL"
                custonClass={styles.sellButton}
                custonClassTitle={styles.sellText}
                handleClick={() => {
                  isModalOpen ? closeModal() : openModal(item, null, "sell");
                }}
              />
            </div>
          ) : (
            <FilledButton custonClass={styles.buyButtonHidden} />
          )}
        </div>
      )}
    </div>
  );
};
export default TradingCardMobile;
