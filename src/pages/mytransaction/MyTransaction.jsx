import { useCallback, useEffect, useState } from "react";
import Divider from "../../components/divider/Divider";
import DropdownV2 from "../../components/dropdown/dropdownV2/DropdownV2";
import NoRecordFound from "../../components/norecordfound/NoRecordFound";
import Pagination from "../../components/pagination/Pagination";
import Search from "../../components/search/Search";
import Spinner from "../../components/spinner/Spinner";
import Tab from "../../components/tab/Tab";
import TableV2 from "../../components/tablev2/TableV2";
import TransactionMobileCard from "../../components/transactionmobilecard/TransactionMobileCard";
import APICall, * as API from "../../constants/API";
import {
  buySellTabData,
  transactionBuyHead,
  transactionSellHead,
  trasactionDropdownData,
} from "../../constants/data";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import styles from "./mytransaction.module.scss";

const MyTransaction = () => {
  var access_token = localStorage.getItem("access_token");
  const [searchText, setSearchText] = useState("");
  const [dataStatus, setDataStatus] = useState("BUY");
  const [title, setTitle] = useState("Filter by Status");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  let varible = Math.ceil(items.length !== 0 && items.length / itemsPerPage);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GETALLTRANSACTIONAPI = useCallback(async (dataType) => {
    console.log("Status:::", dataType);
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    await APICall.get(
      `${API.GETALLTRANSACTION}&page=${currentPage}&size=${itemsPerPage}&transactionType=${dataType}&sort=id,desc`,
      {
        headers: headers,
      }
    )
      .then((response) => {
        console.log("Response Of API:", response.data);
        if (response.status === 200) {
          setItems(response.data.content);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GETALLTRANSACTIONAPISearch = useCallback(async (txId, value) => {
    console.log("Filter Status", value);
    var filterstatus = "";

    if (value === "All") {
    } else if (value === "Completed") {
      filterstatus = "COMPLETED";
    } else if (value === "Initiated") {
      filterstatus = "INITIATED";
    } else if (value === "Processing") {
      filterstatus = "PROCESSING";
    } else {
    }

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    await APICall.get(
      `${API.GETALLTRANSACTION}${filterstatus}&transactionId=${txId}&page=1&size=${itemsPerPage}&sort=id,desc`,
      {
        headers: headers,
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setItems(response.data.content);
          setCurrentPage(1);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const handleFilter = (item) => {
    console.log("item..Change", item);
    setTitle(item);
    setSearchText("");

    handleFilterCallback && handleFilterCallback(item);

    // handleFilterCallback && handleFilterCallback(item);
  };

  useEffect(() => {
    GETALLTRANSACTIONAPI(dataStatus);
  }, [GETALLTRANSACTIONAPI, dataStatus]);

  const handleCallback = (value) => {
    setTitle("Filter by Status");
    setSearchText(value);
    GETALLTRANSACTIONAPISearch(value);
  };

  const handleFilterCallback = (value) => {
    console.log("Value::.>", value);
    setSearchText("");

    // setLoading(true)
    GETALLTRANSACTIONAPISearch("", value);
  };

  const isMobile = useCheckMobileScreen();
  // console.log('current items...???', currentItems);
  return (
    <div className={styles.myTransactionContainer}>
      <div className={styles.myTransactionTitle}>My Transactions</div>
      <div className={styles.getAllInfoText}>
        Get all Information about your Investment transactions
      </div>
      <Divider customClass={styles.divider} />
      <div className={styles.searchFilterContainer}>
        <Search
          value={searchText}
          parentCallback={handleCallback}
          /* parentCallback={handleCallback} */ placeholder="Search Transactions ID"
        />
        <DropdownV2
          handleFilterCallback={handleFilterCallback}
          handleFilter={(item) => handleFilter(item)}
          title={title}
          data={trasactionDropdownData}
          id={11}
          customClass={styles.dropdownContainer}
          customClassBody={styles.dropdownBody}
        />
      </div>
      {/* {loading ? (
        <Spinner />
      ) : isMobile ? (
        <TransactionMobileCard data={currentItems} />
      ) : (
        <TableV2
          tableheading={transactionHead}
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
          <Tab
            tabs={buySellTabData}
            setDataStatus={setDataStatus}
            customClassTab={styles.activeTab}
            customClassName={styles.activeTabName}
            dataStatus={dataStatus}
          />
          <NoRecordFound />
        </div>
      ) : isMobile ? (
        <TransactionMobileCard
          data={currentItems}
          setDataStatus={setDataStatus}
          dataStatus={dataStatus}
        />
      ) : (
        <div className={styles.tabTableContainer}>
          <Tab
            tabs={buySellTabData}
            setDataStatus={setDataStatus}
            customClassTab={styles.activeTab}
            customClassName={styles.activeTabName}
            dataStatus={dataStatus}
          />
          <TableV2
            tableheading={
              dataStatus === "BUY" ? transactionBuyHead : transactionSellHead
            }
            tabledata={currentItems}
            customClassTableContainer={styles.tableContainer}
            customClassTableHead={styles.tableHeadRow}
            customClassTh={styles.tableHead}
            customClassLastTd={styles.lastTd}
            customClassTd={styles.tableTd}
            // dataStatus={dataStatus}
          />
        </div>
      )}
      {/* <TableV2 tableheading={transactionHead} tabledata={transactionData} customClassTableContainer={styles.tableContainer} customClassTableHead={styles.tableHeadRow} customClassTh={styles.tableHead} customClassLastTd={styles.lastTd} customClassTd={styles.tableTd} /> */}
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
export default MyTransaction;
