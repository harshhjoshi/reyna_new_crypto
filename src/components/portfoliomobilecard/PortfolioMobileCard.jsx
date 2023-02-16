import { useState } from 'react';
import color from '../../constants/color';
import { buySellTabData } from '../../constants/data';
import { Copy, ExpandDown, ExpandUp } from '../../svg-components';
import { hanleCopy } from '../../utils/helpers';
import Button from '../buttons/Button';
import Divider from '../divider/Divider';
import Document from '../Document/Document';
import ImageName from '../imagename/ImageName';
import Spanflex from '../spanflex/Spanflex';
import Spinner from '../spinner/Spinner';
import Tab from '../tab/Tab';
import styles from './portfoliomobilecard.module.scss'
const PortfolioMobileCard = ({ data, setDataStatus, dataStatus }) => {
    // console.log('portfolio item', item);
    const [showData, setShowData] = useState(false);
    const [value, setValue] = useState(-1)
    const handleShowData = (index) => {
        setShowData(true);
        setValue(index);
    }
    const handleHideData = () => {
        setShowData(false);
    }
    // console.log('portfoliodata', data);
    return (
        <div className={styles.tabDataContainer}>
            <Tab tabs={buySellTabData} setDataStatus={setDataStatus} customClassTab={styles.activeTab} customClassName={styles.activeTabName} dataStatus={dataStatus}/>
            {
                data ?
                    data.map((item, index) => {
                        return (
                            <div className={styles.tableCardContainer} key={index}>
                                <div className={styles.nameQuantityContainer}>
                                    <ImageName image={item.cryptoImage} label='Name' value={item.cryptoCurrency} />
                                    <Spanflex label='Quantity' value={item.cryptoAmount} customClass={styles.spanFlexContainer} />
                                    {
                                        showData && index === value ? <Button
                                            title={
                                                <ExpandUp
                                                    fillColor={color.blue3}
                                                    height={30}
                                                    width={30}
                                                />
                                            }
                                            customClass={styles.button}
                                            handleClick={() => handleHideData()}
                                        /> : <Button
                                            title={
                                                <ExpandDown
                                                    fillColor={color.blue3}
                                                    height={30}
                                                    width={30}
                                                />
                                            }
                                            customClass={styles.button}
                                            handleClick={() => handleShowData(index)}
                                        />
                                    }
                                </div>
                                {
                                    showData && index === value &&
                                    <div className={styles.mainDataContainer}>
                                        <Divider customClass={styles.divider} />
                                        <div className={styles.documentListContainer}>
                                            <div className={styles.documentList}>
                                                <Document item={item} docType={dataStatus === "BUY" ? 'Buy Price' : "Sell Price"} number={1} doc={item.conversionPrice ? "R" + 1 / item.conversionPrice : "-"} showDoc={false} customClassDoc={styles.doc} />
                                                <Document item={item} docType='Paid Amount' number={2} doc={item.amountPaid ? item.amountPaid : '-'} showDoc={false} customClassDoc={styles.doc} />
                                            </div>
                                            <div className={styles.documentList}>
                                                <Document item={item} docType='Date' number={3} doc={item.createdDt} subType={item.physicalAddress} showDoc={false} customClassDoc={styles.doc} />
                                                <Document item={item} docType='Time' number={4} doc={item.createdTime + " " + "SAST"} showDoc={false} customClassDoc={styles.doc} />
                                            </div>
                                            <div className={styles.documentList}>
                                                <Document
                                                    item={item}
                                                    docType="Wallet Address"
                                                    number={5}
                                                    doc={item.walletAddress && item.walletAddress.substring(0, 8) + "..."}
                                                    customClassDoc={styles.copyAddress}
                                                    showDoc={false}
                                                    icon={<Copy fillColor={color.blue3} />}
                                                    handleCopy={() => hanleCopy(item.walletAddress)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div >
                        )
                    })

                    : <Spinner />
            }
        </div>

    )
}
export default PortfolioMobileCard;