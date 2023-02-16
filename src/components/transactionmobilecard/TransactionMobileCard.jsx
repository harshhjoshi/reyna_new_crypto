import { useState } from "react";
import Spinner from "../spinner/Spinner";
import color from "../../constants/color";
import { Copy, ExpandDown, ExpandUp } from "../../svg-components";
import Button from "../buttons/Button";
import Divider from "../divider/Divider";
import Document from "../Document/Document";
import ImageName from "../imagename/ImageName";
import Spanflex from "../spanflex/Spanflex";
import styles from "./transactionmobilecard.module.scss";
import {hanleCopy} from '../../utils/helpers'
import { buySellTabData } from "../../constants/data";
import Tab from "../tab/Tab";
const TransactionMobileCard = ({ data, setDataStatus,dataStatus }) => {
  const [showData, setShowData] = useState(false);
  const [value, setValue] = useState(-1);
  const handleShowData = (index) => {
    setShowData(true);
    setValue(index);
  };
  const handleHideData = () => {
    setShowData(false);
  };
  console.log('txData...???', data);
  return (
    <div className={styles.tabDataContainer}>
      <Tab tabs={buySellTabData} setDataStatus={setDataStatus} customClassTab={styles.activeTab} customClassName={styles.activeTabName} dataStatus={dataStatus} />
      {

        data ? (
          data.map((item, index) => {
            return (
              <div className={styles.tableCardContainer} key={index}>
                <div className={styles.nameIDContainer}>
                  <ImageName image={item.cryptoImage} label="Name" value={item.cryptoCurrency} />
                  <Spanflex
                    label="Transaction ID"
                    value={item.txId}
                    customClass={styles.spanFlexContainer}
                  />
                  {showData && index === value ? (
                    <Button
                      title={
                        <ExpandUp fillColor={color.blue3} height={30} width={30} />
                      }
                      customClass={styles.button}
                      handleClick={() => handleHideData()}
                    />
                  ) : (
                    <Button
                      title={
                        <ExpandDown fillColor={color.blue3} height={30} width={30} />
                      }
                      customClass={styles.button}
                      handleClick={() => handleShowData(index)}
                    />
                  )}
                </div>
                {showData && index === value && (
                  <div className={styles.mainDataContainer}>
                    <Divider customClass={styles.divider} />
                    <div className={styles.documentListContainer}>
                      <div className={styles.documentList}>
                        <Document
                          item={item}
                          docType="Date & Time"
                          number={1}
                          doc={item.createdDt + " " + item.createdTime + " " + "SAST"}
                          showDoc={false}
                          customClassDoc={styles.doc}
                        />
                        <Document
                          item={item}
                          docType={dataStatus === "BUY" ? "Buy Price" : "Sell Price"}
                          number={2}
                          doc={item.conversionPrice ? "R" + 1 / item.conversionPrice : "-"}
                          showDoc={false}
                          customClassDoc={styles.doc}
                        />
                      </div>
                      <div className={styles.documentList}>
                        {/* <Document
                          item={item}
                          docType="Current Price"
                          number={3}
                          doc={item.currentprice}
                          showDoc={false}
                          customClassDoc={styles.doc}
                        /> */}
                        <Document
                          item={item}
                          docType="Spent Limit"
                          number={3}
                          doc={item.fiatAmount ? "R " + item.fiatAmount : "-"}
                          showDoc={false}
                          customClassDoc={styles.doc}
                        />
                        <Document
                          item={item}
                          docType="Change"
                          number={4}
                          doc={
                            item.change
                              ? item.change < 0
                                ? parseFloat(item.change).toFixed(2) + "%"
                                : `${parseFloat(item.change).toFixed(1) + "%"}`
                              : "-"
                          }
                          showDoc={false}
                          customClassDoc={
                            item.change
                              ? item.change < 0
                                ? styles.priceTextRed
                                : styles.priceTextGreen
                              : styles.doc
                          }
                        />
                      </div>
                      <div className={styles.documentList}>
                        {/* <Document
                          item={item}
                          docType="Change"
                          number={5}
                          doc={
                            item.change
                              ? item.change < 0
                                ? parseFloat(item.change).toFixed(2) + "%"
                                : `${parseFloat(item.change).toFixed(1) + "%"}`
                              : "-"
                          }
                          showDoc={false}
                          customClassDoc={
                            item.change
                              ? item.change < 0
                                ? styles.priceTextRed
                                : styles.priceTextGreen
                              : styles.doc
                          }
                        /> */}
                        <Document
                          item={item}
                          docType="Status"
                          number={5}
                          doc={item.status}
                          showDoc={false}
                          customClassDoc={
                            item.status === "Successful"
                              ? styles.successful
                              : item.status === "Unsuccessful"
                                ? styles.unsuccessful
                                : item.status === "In Progress"
                                  ? styles.inprogress
                                  : styles.doc
                          }
                        />
                        <Document
                          item={item}
                          docType="Wallet Address"
                          number={6}
                          doc={item.walletAddress && item.walletAddress.substring(0,8)+"..."}
                          customClassDoc={styles.copyAddress}
                          showDoc={false}
                          icon={item.walletAddress && <Copy fillColor={color.blue3} />}
                          handleCopy={()=>hanleCopy(item.walletAddress)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <Spinner />
        )
      }
    </div>
  )

};
export default TransactionMobileCard;
