// import { useCallback, useRef, useState } from "react";
import { useEffect, useState } from "react";
import { dataTableHead } from "../../constants/data";
import { useGlobalContext } from "../../context/context";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
// import { dataTable } from "../../output";
import BuyCryptPopup from "../buycryptopopup/BuyCryptoPopup";
import Popup from "../popup/Popup";
// import Spinner from "../spinner/Spinner";
// import DataRow from "../datarow/DataRow";
// import DataRowHead from "../datarow/DataRowHead";
import TableV2 from "../tablev2/TableV2";
import TradingCardMobile from "../tradingcarmobile/TradingCardMobile";
import styles from "./gainers.module.scss";
import APICall from "../../constants/API";
import * as API from "../../constants/API";
import Pagination from "../../components/pagination/Pagination";
import { useLocation } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { useSelector } from "react-redux";
import SellCryptoPopup from "../sellcryptopopup/SellCryptoPopup";

const Gainers = () => {
  const isMobile = useCheckMobileScreen();
  const { isModalOpen,popup } = useGlobalContext();
  const order_status = useLocation().pathname.split("/")[2];
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  // const clientNames = adminTableBody.map((item) => item.name);
  let varible = Math.ceil(items.length !== 0 && items.length / itemsPerPage);
  const [loading, setLoading] = useState(false);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };
  const handlePrevious = (offset, ref) => {
    currentPage !== 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
    ref.current.scrollLeft += offset;
  };
  const handleNext = (offset, ref) => {
    // setCurrentPage(currentPage + 1);
    ref.current.scrollLeft += offset;
    currentPage !== varible
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(currentPage);
  };
  const paymentObject = useSelector((state) => state.payment);
  if (paymentObject != undefined) {
    // console.log("paymentObject:", paymentObject);
  }
  var status = order_status;

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
    setLoading(true);
   await APICall.get(
      `${API.MARKET_LIST}order=market_cap_desc&per_page=1000&page=1&sparkline=false`
    )
      .then((response) => {
        // console.log("Getting Data", response.status);
        var dataTable = response.data;

        if (response.status === 200) {
          setLoading(false);

          setItems(dataTable);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className={styles.gainersContainer}>
      {isModalOpen && popup && <Popup Children={popup === 'buy' ? BuyCryptPopup: SellCryptoPopup} />}

      {items.length === 0 ? (
        <Spinner />
      ) : isMobile ? (
        <div className={styles.dataContainer}>
          {currentItems.map((item, index) => {
            return <TradingCardMobile item={item} key={index} />;
          })}
        </div>
      ) : (
        <TableV2
          tableheading={dataTableHead}
          tabledata={currentItems}
          customClassTd={styles.tableTd}
          customClassTh={styles.tableHead}
        />
      )}
      {items.length !== 0 && (
        <Pagination
          data={items}
          length={items && items.length}
          itemsPerPage={itemsPerPage}
          handlePaginate={(item) => handlePaginate(item)}
          active={currentPage}
          handlePrevious={(offset, ref) => handlePrevious(offset, ref)}
          handleNext={(offset, ref) => handleNext(offset, ref)}
          limit={20}
        />
      )}
    </div>
  );
};
export default Gainers;
