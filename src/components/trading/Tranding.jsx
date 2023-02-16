// import color from '../../constants/color';
// import { BNB } from '../../svg-components';
import styles from "./tranding.module.scss";
const Tranding = ({ item, icon, bgColor, name, percentage, value }) => {
  // console.log('item...??', item)
  return (
    // **** Old Code *** //
    // <div className={styles.trandingContainer}>
    //     <IconRound Icon={icon} bgColor={bgColor} />
    //     <div className={styles.tradingDetails}>
    //         <div className={styles.tradingNamePercentage}>
    //             <span className={styles.tradingName}>{name}</span>
    //             <span className={styles.percentage} >{percentage}</span>
    //         </div>
    //         <span className={styles.price}>{value}</span>
    //     </div>
    // </div>

    // new code
    // <div className={styles.trandingContainer}>
    //     <IconRound Icon={icon} bgColor={bgColor} />
    //     <div className={styles.tradingDetails}>
    //         <span className={styles.tradingName}>{name}</span>
    //         <div className={styles.tradingPricePercentage}>
    //             <span className={styles.price}>{value}</span>
    //             <span className={styles.percentage} >{percentage}</span>
    //         </div>
    //     </div>
    // </div>
    <div className={styles.trandingContainer}>
      {/* <IconRound Icon={icon} bgColor={bgColor} /> */}
      <img src={item.image} alt={item.symbol} className={styles.coinIcon} />
      <div className={styles.tradingDetails}>
        <span className={styles.tradingName}>{item.name}</span>
        <div className={styles.tradingPricePercentage}>
          <span className={styles.price}>
            {"₹ "}
            {item.current_price}
          </span>
          <span
            className={
              item.price_change_percentage_24h < 0
                ? styles.percentageRed
                : styles.percentage
            }
          >
            0{parseFloat(item.price_change_percentage_24h).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
export default Tranding;
