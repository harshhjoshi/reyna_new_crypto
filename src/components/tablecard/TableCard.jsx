import { useState } from 'react';
import color from '../../constants/color';
import { useGlobalContext } from '../../context/context';
import { Close, ExpandDown, ExpandUp, Tick } from '../../svg-components';
import Button from '../buttons/Button';
import styles from './tablecard.module.scss'
import Divider from '../divider/Divider'
import Number from '../number/Number'
import Document from '../Document/Document';
const TableCard = ({ data }) => {
    // console.log('data...??', data);
    const { openModal } = useGlobalContext();
    const [showData, setShowData] = useState(false);
    const [value, setValue] = useState(-1)
    const handleShowData = (index) => {
        setShowData(true);
        setValue(index);
    }
    const handleHideData = () => {
        setShowData(false);
    }
    // console.log('items lkjjrlrn...??', data)
    return (
        <>
            {/* <div className={styles.tableCardDataContainer}> */}
            {
                data.map((item, index) => {
                    return (
                        <div key={index} className={styles.tableCardContainer}>
                            <div className={styles.tableCardDataContainer}>
                                <div className={styles.userNameContainer}>
                                    <span className={styles.userNameLable}>User Name</span>
                                    <span className={styles.userNameText}>{item.user.username}</span>
                                </div>
                                <div className={styles.statusContainer}>
                                    <span className={styles.statusLabel}>Status</span>
                                    <span className={item.requestStatus === "In Review"
                                        ? styles.inReviewStatus
                                        : item.requestStatus === "Rejected"
                                            ? styles.rejectStatus
                                            : item.requestStatus === "Approved"
                                                ? styles.approveStatus
                                                : item.requestStatus === "Pending"
                                                    ? styles.pendingStatus
                                                    : item.requestStatus === "Submitted"
                                                        ? styles.submittedStatus
                                                        : null}>{item.requestStatus}</span>
                                </div>
                                {
                                    item.requestStatus === "Rejected" ||
                                        item.requestStatus === "Approved" ? null : <>
                                        <Button
                                            title={
                                                <Tick
                                                    fillColor={color.blue3}
                                                    height={15}
                                                    width={17}
                                                />
                                            }
                                            customClass={styles.button}
                                            handleClick={() => openModal("approved", item.requestId)}
                                        />
                                        <Button
                                            title={
                                                <Close
                                                    fillColor={color.blue3}
                                                    height={15}
                                                    width={17}
                                                />
                                            }
                                            customClass={styles.button}
                                            handleClick={() => openModal("rejected", item.requestId)}
                                        />
                                    </>

                                }

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
                                            <Document item={item} docType='Identity Documents' number={1} doc={item.identityDoc.split(`\\`)[item.identityDoc.split(`\\`).length - 1]} showDoc={true} />
                                            <Document item={item} docType='Photo' number={2} doc={item.photoDoc.split(`\\`)[item.photoDoc.split(`\\`).length - 1]} showDoc={true} />
                                        </div>
                                        <div className={styles.documentList}>
                                            <Document item={item} docType='Proof of Address' number={3} doc={item.physicalAddressDoc.split(`\\`)[item.photoDoc.split(`\\`).length - 1]} subType={item.physicalAddress} showDoc={true} />
                                            <Document item={item} docType='Identity No' number={4} doc={item.identityNumber} showDoc={false} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
            }
            {/* </div> */}
        </>
    )
}
export default TableCard;