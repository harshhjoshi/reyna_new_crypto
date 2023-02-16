import Number from '../number/Number';
import styles from './document.module.scss'
import APICall from "../../constants/API";
import * as API from "../../constants/API";
const Document = ({ item, number, docType, doc, subType, showDoc, customClassDoc,icon,handleCopy }) => {
    const access_token = localStorage.getItem("access_token");
    const handleShow = (item, file) => {
        // const files = file.split("\\")[file.split("\\").length - 1];
        const userId = item.user.userId;
        const fileType = file.split(".")[1];
        getCurrentFile(file, userId, fileType);
    };

    const getCurrentFile = async (files, userId, fileType) => {
        await APICall.get(
            `${API.SHOW_DOCUMENT}?fileName=${files}&userId=${userId}`,
            {
                headers: { Authorization: `Bearer ${access_token}` },
                responseType: "blob",
            }
        )
            .then((url) => {
                const file = new Blob([url.data], {
                    type:
                        fileType === "pdf"
                            ? `application/${fileType}`
                            : `image/${fileType}`,
                });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch((err) => {
                console.log("Error", err);
            });
    };
    return (
        <div className={styles.documentsList}>
            <Number number={number} active={true} customClass={styles.numberContainer} customClassNumber={styles.number} />
            <div className={styles.documentNamePath}>
                <span className={styles.docType}>{docType}</span>
                <span className={[styles.doc, customClassDoc].join(' ')} onClick={() => showDoc ? handleShow(item, doc) : {}}>{doc} {icon && <span className={styles.icon} onClick={()=>handleCopy()}>{icon}</span>} </span>
                {subType && <span className={styles.subType}>{subType}</span>}
            </div>
        </div>
    )
}
export default Document;