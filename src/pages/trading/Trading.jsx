import styles from "./trading.module.scss";
// import Landing from '../../assets/images/Landing.png'
// import ArrowFrame from '../../components/arrowframe/ArrowFrame'
import Divider from "../../components/divider/Divider";
import Tranding from "../../components/trading/Tranding";
import { tabData, TrandingData } from "../../constants/data";
import Tab from "../../components/tab/Tab";
import Marquee from "react-fast-marquee";
import Gainers from "../../components/gainers/Gainers";
import APICall from "../../constants/API";
import * as API from "../../constants/API";
import { useEffect } from "react";
import { useState } from "react";
import { useGlobalContext } from "../../context/context";

const Trading = ({ children }) => {
  const [trendingData, setTrendingData] = useState([]);
  const { isModalOpen } = useGlobalContext();
  
  useEffect(() => {
  
    const intervalCall = setInterval(() => {
      GET_ALL_CRYPTO_CORENCIES();
    }, 5000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  const GET_ALL_CRYPTO_CORENCIES = async () => {
    await APICall.get(`${API.MARKET_LIST}order=gecko_desc`)
      .then((response) => {
        var dataTable = response.data;
        // console.log("Getting Data In Trading", dataTable.slice(0, 10));

        if (response.status === 200) {
          setTrendingData(dataTable.slice(0, 15));
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <>
      <div className={styles.homeContainer}>
        {/* <img src={Landing} alt='home page' className={styles.homeImage} /> */}
        {/* {
                    isMobile && <div>
                        <img src={Frame} alt="arrow-frame" className={styles.arrowFrame} />
                    </div>
                } */}
        {/* <ArrowFrame customClass={styles.arrowFrame} /> */}
        <div className={styles.tradingTitle}>Explore Crypto Market</div>
        <Divider customClass={styles.divider} />

        {/* <Marquee
          className={styles.trandingContainer}
          gradient={false}
          pauseOnHover={true}
          speed={50}
        >
          {TrandingData.map((item, index) => {
            return (
              <Tranding
                icon={item.icon}
                bgColor={item.bgColor}
                name={item.name}
                percentage={item.percentage}
                value={item.value}
                key={index}
              />
            );
          })}
        </Marquee> */}
        {trendingData.length > 0 && (
          <Marquee
            className={styles.trandingContainer}
            gradient={false}
            pauseOnHover={true}
            speed={40}
            // play={false}
          >
            {trendingData.map((item, index) => {
              return <Tranding item={item} key={index} />;
            })}
          </Marquee>
        )}

        {/* <Marquee className={styles.trandingContainer} gradient={false} pauseOnHover={true} speed={50} >
                    {
                        TrandingData.map((item, index) => {
                            // if(index === TrandingData.length-1){
                            //     set
                            // }
                            return (
                                <div className={styles.trandingCard} key={index}>
                                    <Tranding icon={item.icon} bgColor={item.bgColor} name={item.name} percentage={item.percentage} value={item.value} />
                                    {
                                        index !== TrandingData.length - 1 && <Divider customClass={styles.veticalDivider} />
                                    }
                                </div>
                            )
                        })
                    }
                </Marquee> */}
        <div className={styles.tabTableContainer}>
          <Tab tabs={tabData} />
        {children}
          {/* <Gainers /> */}
        </div>
      </div>
    </>
  );
};
export default Trading;
