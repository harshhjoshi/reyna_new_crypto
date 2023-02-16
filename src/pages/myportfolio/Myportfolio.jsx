import { useEffect } from "react";
import { useState } from "react";
import Divider from "../../components/divider/Divider";
import Pagination from "../../components/pagination/Pagination";
import PortfolioMobileCard from "../../components/portfoliomobilecard/PortfolioMobileCard";
import Spinner from "../../components/spinner/Spinner";
import TableV2 from "../../components/tablev2/TableV2";
import { buySellTabData, portfolioBody, portfolioBuyHead, portfolioHead, portfolioSellHead } from "../../constants/data";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import styles from "./myportfolio.module.scss";
import APICall from "../../constants/API";
import * as API from "../../constants/API";
import NoRecordFound from "../../components/norecordfound/NoRecordFound";
import Tab from "../../components/tab/Tab";

const Myportfolio = () => {
  var access_token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataStatus, setDataStatus] = useState("BUY");
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  // const clientNames = adminTableBody.map((item) => item.name);
  let varible = Math.ceil(items.length !== 0 && items.length / itemsPerPage);
  const handlePaginate = (item) => {
    setCurrentPage(item);
  };


  const GETALLTRANSACTIONAPI = async (dataType) => {
    // console.log("TxID", txId);

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await APICall.get(
      `${API.GETALLTRANSACTION}COMPLETED&page=${currentPage}&transactionType=${dataType}&size=${itemsPerPage}&sort=id,desc`,
      {
        headers: headers,
      }
    )
      .then((response) => {
        // console.log("My Portfollio: ", response.data);
        if (response.status === 200) {
          setItems(response.data.content);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    GETALLTRANSACTIONAPI(dataStatus);
  }, [GETALLTRANSACTIONAPI, dataStatus]);


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
  useEffect(() => {
    // setItems(portfolioBody);
  }, []);
  const isMobile = useCheckMobileScreen();
  return (
    <div className={styles.myPortfolioContainer}>
      <div className={styles.myPortfolioTitle}>My Portfolio</div>
      <div className={styles.getAllInfoText}>
        Get all Information about your Investment Portfolio
      </div>
      <Divider customClass={styles.divider} />
      {/* {loading ? (
        <Spinner />
      ) : isMobile ? (
        <PortfolioMobileCard data={currentItems} />
      ) : (
        <TableV2
          tableheading={portfolioHead}
          tabledata={currentItems}
          customClassTableContainer={styles.tableContainer}
          customClassTableHead={styles.tableHeadRow}
          customClassTh={styles.tableHead}
          customClassLastTd={styles.lastTd}
          customClassTd={styles.tableTd}
        />
      )} */}
      {loading ? (
        <Spinner customClass={styles.spinner} />
      ) : items.length === 0 ? (
        <div className={styles.norecordFound}>
          <Tab tabs={buySellTabData} setDataStatus={setDataStatus} customClassTab={styles.activeTab} customClassName={styles.activeTabName} dataStatus={dataStatus} />
          <NoRecordFound />
        </div>
      ) : isMobile ? (
        <PortfolioMobileCard data={currentItems} setDataStatus={setDataStatus} dataStatus={dataStatus} />
      ) : (
        <div className={styles.tabTableContainer}>
          <Tab tabs={buySellTabData} setDataStatus={setDataStatus} customClassTab={styles.activeTab} customClassName={styles.activeTabName} dataStatus={dataStatus} />
          <TableV2
            tableheading={dataStatus === "BUY" ? portfolioBuyHead : portfolioSellHead}
            tabledata={currentItems}
            customClassTableContainer={styles.tableContainer}
            customClassTableHead={styles.tableHeadRow}
            customClassTh={styles.tableHead}
            customClassLastTd={styles.lastTd}
            customClassTd={styles.tableTd}
          />
        </div>
      )}
      {/* <TableV2 tableheading={portfolioHead} tabledata={currentItems} customClassTableContainer={styles.tableContainer} customClassTableHead={styles.tableHeadRow} customClassTh={styles.tableHead} customClassLastTd={styles.lastTd} customClassTd={styles.tableTd} /> */}
      {items.length !== 0 && (
        <Pagination
          data={items}
          length={items && items.length}
          itemsPerPage={itemsPerPage}
          handlePaginate={(item) => handlePaginate(item)}
          active={currentPage}
          handlePrevious={(offset, ref) => handlePrevious(offset, ref)}
          handleNext={(offset, ref) => handleNext(offset, ref)}
          limit={10}
        />
      )}
    </div>
  );
};
export default Myportfolio;
