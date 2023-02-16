// import DropdownV2 from '../dropdown/dropdownV2/DropdownV2';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import color from '../../constants/color'
import FilledButton from "../../components/buttons/filledbutton/FilledButton";
import color from "../../constants/color";
import { useGlobalContext } from "../../context/context";
import { gotoSignInSignUp, login } from "../../redux/userSlice";
import { Copy } from "../../svg-components";
import { hanleCopy } from "../../utils/helpers";
import StatusButton from "../buttons/statusbutton/StatusButton";
import Spinner from "../spinner/Spinner";
import styles from "./tablev2.module.scss";
const TableV2 = ({
  customClassTableContainer,
  customClassTable,
  tableheading,
  customClassTh,
  tabledata,
  customClassTd,
  customClassTableRow,
  customClassTableHead,
  ButtonGroup,
  refreshElement,
  spinnerRef,
  customClassLastTd,
  dataStatus,
}) => {
  // const { isModalOpen, openModal, closeModal } = useGlobalContext();
  // const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  // const [totalEntries, setTotalEntries] = useState(0);
  // const [pageNum, setPageNum] = useState(1);
  // const observer = useRef();
  // const MIN_LIMIT = 10;
  // const refreshElement = totalEntries
  //   ? pageNum <= totalEntries / MIN_LIMIT
  //   : true;
  // useEffect(() => {
  //   setData(tabledata);
  //   setTotalEntries(tabledata.length);
  //   setFilteredData(tabledata.slice(0, MIN_LIMIT));
  // }, []);
  // const spinnerRef = useCallback((node) => {
  //   if (observer.current) {
  //     observer.current.disconnect();
  //   }
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       setPageNum((no) => no + 1);
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  // }, []);
  // const updateList = useCallback(() => {
  //   setTimeout(() => {
  //     let tempData = data.slice(0, MIN_LIMIT * pageNum);
  //     setFilteredData(tempData);
  //   }, 2000);
  //   // console.log('called list')
  //   // let tempData = data.slice(0, MIN_LIMIT * pageNum);
  //   // setFilteredData(tempData);
  //   // if (search) {
  //   //   tempData = data.filter((item: any) => {
  //   //     return searchableText(item?.fields?.title || '').includes(search);
  //   //   });
  //   // }
  // }, [data, pageNum]);

  // useEffect(() => {
  //   if (pageNum <= totalEntries) {
  //     updateList();
  //   }
  // }, [pageNum, updateList, totalEntries]);

  return (
    <div
      className={[styles.tableContainer, customClassTableContainer].join(" ")}
    >
      <table
        className={[styles.table, customClassTable].join(" ")}
        cellSpacing={0}
      >
        <thead>
          <tr className={[styles.tableHeadRow, customClassTableHead].join(" ")}>
            {tableheading &&
              tableheading.map((item, index) => (
                <TableHead
                  item={item}
                  key={index}
                  customClassTh={customClassTh}
                  ButtonGroup={ButtonGroup}
                  dataStatus={dataStatus}
                />
              ))}
          </tr>
        </thead>
        <tbody>
          {tabledata &&
            tabledata.map((item, index) => (
              <TableRow
                item={item}
                tableheading={tableheading}
                key={index}
                customClassTableRow={customClassTableRow}
                customClassTd={customClassTd}
                id={item.requestId}
                ButtonGroup={ButtonGroup}
                customClassLastTd={customClassLastTd}
                dataStatus={dataStatus}
              />
            ))}
        </tbody>
      </table>
      {refreshElement ? (
        <div ref={spinnerRef} className={styles.spinner}>
          <Spinner />
        </div>
      ) : null}
    </div>
  );
};
export default TableV2;
export const TableHead = ({ item, customClassTh, dataStatus }) => {
  return (
    <>
      <th className={[styles.tableHead, customClassTh].join(" ")}>
        {/* {
                    item.dropdown ? (
                        <DropdownV2 title={item.label} customClass={styles.dropdownContainer} customClassTitle={styles.dropdownTitle} fillColor={color.grey5} />
                    ) : (
                        item.label
                    )
                } */}
        {item.label}
      </th>
    </>
  );
};

export const TableRow = ({
  item,
  ButtonGroup,
  tableheading,
  customClassTableRow,
  customClassTd,
  id,
  customClassLastTd,
  dataStatus,
}) => {
  const { isModalOpen, openModal, closeModal } = useGlobalContext();
  const authUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = () => {
    dispatch(login(null));
    dispatch(gotoSignInSignUp(true));
    navigate("/signin");
  };
  var OTPVerified = localStorage.getItem("otpverified");

  return (
    <>
      <tr className={[customClassTableRow, styles.tableRow].join(" ")}>
        {tableheading.map((thItem, index) => {
          return (
            <td
              className={[
                index === tableheading.length - 1
                  ? [styles.lastTableRowData, customClassLastTd].join(" ")
                  : thItem.percentage && item[thItem.value]
                  ? item[thItem.value] < 0
                    ? styles.tableRowDataNegative
                    : styles.tableRowDataPositive
                  : styles.tableRowData,
                customClassTd,
              ].join(" ")}
              key={index}
            >
              {thItem.button ? (
                item.name === "Ethereum" ||
                item.name === "Decentraland" ||
                item.name === "Lido Staked Ether" ||
                item.name === "The Sandbox" ? (
                  <div className={styles.buysellButtons}>
                    <FilledButton
                      title="SELL"
                      custonClass={styles.sellButton}
                      custonClassTitle={styles.sellText}
                      handleClick={() => {
                        authUser.user && OTPVerified === "true"
                          ? isModalOpen
                            ? closeModal()
                            : openModal(item, null, "sell")
                          : handleNavigate();
                      }}
                    />
                    <FilledButton
                      title="BUY"
                      custonClass={styles.buyButton}
                      handleClick={() => {
                        authUser.user && OTPVerified === "true"
                          ? isModalOpen
                            ? closeModal()
                            : openModal(item, null, "buy")
                          : handleNavigate();
                      }}
                    />
                  </div>
                ) : null
              ) : thItem.status ? (
                <StatusButton
                  status={item[thItem.value]}
                  id={id}
                  customClass={
                    item[thItem.value] === "In Review"
                      ? styles.inReviewButton
                      : item[thItem.value] === "Unsuccessful"
                      ? styles.rejectButton
                      : item[thItem.value] === "Successful"
                      ? styles.approveButton
                      : item[thItem.value] === "In Progress"
                      ? styles.pendingButton
                      : item[thItem.value] === "Submitted"
                      ? styles.submittedButton
                      : null
                  }
                />
              ) : thItem.percentage ? (
                item[thItem.value] ? (
                  `${parseFloat(item[thItem.value]).toFixed(1)}%`
                ) : (
                  "-"
                )
              ) : thItem.image && thItem.symbol ? (
                <div className={styles.imageData}>
                  {item.cryptoImage && (
                    <img src={item.cryptoImage} className={styles.coinImage} />
                  )}
                  <span>{item[thItem.value]}</span>
                  <span className={styles.symbol}>{item.symbol}</span>
                </div>
              ) : thItem.price ? (
                item[thItem.value] ? (
                  thItem.convert ? (
                    <>
                      {item.conversionPrice
                        ? "₹" + (1 / item.conversionPrice).toFixed(2)
                        : "-"}
                    </>
                  ) : (
                    <>{"₹" + item[thItem.value].toLocaleString()}</>
                  )
                ) : (
                  "-"
                )
              ) : thItem.copy ? (
                <div className={styles.addressCopyContainer}>
                  {item[thItem.value] &&
                    item[thItem.value].substring(0, 8) + "..."}
                  {item[thItem.value] && (
                    <span
                      className={styles.copyContent}
                      onClick={() => hanleCopy(item[thItem.value])}
                    >
                      <Copy
                        fillColor={color.blue3}
                        customClass={styles.copyIcon}
                      />
                    </span>
                  )}
                </div>
              ) : thItem.time ? (
                item[thItem.value] + " SAST"
              ) : (
                item[thItem.value]
              )}
            </td>
          );
        })}
      </tr>
    </>
  );
};
