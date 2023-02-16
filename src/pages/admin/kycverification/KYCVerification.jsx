import Divider from "../../../components/divider/Divider";
import DropdownV2 from "../../../components/dropdown/dropdownV2/DropdownV2";
import KYCApproval from "../../../components/popup/kycapproval/KYCApproval";
import Popup from "../../../components/popup/Popup";
import Search from "../../../components/search/Search";
import Table from "../../../components/table/Table";
import {
  adminTableBody,
  adminTableHead,
  kycstatusDropdownData,
} from "../../../constants/data";
import { useGlobalContext } from "../../../context/context";
import KYCRejection from "../../../components/popup/kycrejection/KYCRejection";
import styles from "./kycverification.module.scss";
import Pagination from "../../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import * as API from "../../../constants/API";
import useCheckMobileScreen from "../../../hooks/useCheckMobileScreen";
import TableCard from "../../../components/tablecard/TableCard";
// import Spinner from "../../components/spinner/Spinner";
import APICall from "../../../constants/API";
import Spinner from "../../../components/spinner/Spinner";
import NoRecordFound from "../../../components/norecordfound/NoRecordFound";

const KYCVerification = () => {
  const { isModalOpen, kycStatus } = useGlobalContext();
  const [items, setItems] = useState([]);
  const access_token = localStorage.getItem("access_token");
  const isMobile = useCheckMobileScreen();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Filter by");
  //   useEffect(() => {
  //     setItems(adminTableBody);
  //   }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const [KYC_LIST, setKycList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const flag = localStorage.getItem("flag");
  // const clientNames = adminTableBody.map((item) => item.name);
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

  useEffect(() => {
    GET_ALL_KYC("");
  }, [flag]);

  const GET_ALL_KYC = async (value) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    await APICall.get(
      `${API.GET_ALL_KYC}?page=${
        currentPage - 1
      }&size=1000&searchString=${value}`,
      {
        headers,
      }
    )
      .then((response) => {
        if (response.data.code === 200) {
          setLoading(false);
          setItems(response.data.data.kycRequests);
          //   setKey_status(response.data.requestStatus);
          //response.data.requestStatus
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleCallback = (value) => {
    setTitle("Filter By")
    setSearchText(value);

    GET_ALL_KYC(value);
  };

  const handleFilterCallback = (value) => {
    // setLoading(true)
    // setTitle("")
    setSearchText("")

    if (value === "All") {
      GET_ALL_KYC("");
    } else {
      GET_ALL_KYC(value);
    }
  };

  const handleFilter = (item) => {
    // console.log('item..??', item)
    setSearchText("")

    setTitle(item);
    handleFilterCallback && handleFilterCallback(item);
  };

  return (
    <>
      {isModalOpen && (
        <Popup
          Children={
            kycStatus === "approved"
              ? KYCApproval
              : kycStatus === "rejected"
              ? KYCRejection
              : null
          }
        />
      )}

      {/* <Popup
        Children={
          KYCRejection
        }
      /> */}

      <div className={styles.kycVerificationContainer}>
        <div className={styles.kycVerificationTitle}>KYC Verification </div>
        <div className={styles.requiredDocumentText}>
          Documents verification
        </div>
        <Divider customClass={styles.divider} />
        <div className={styles.searchFilterContainer}>
          <Search value={searchText} parentCallback={handleCallback} placeholder="Search Users" />
          <DropdownV2
            handleFilterCallback={handleFilterCallback}
            handleFilter={(item) => handleFilter(item)}
            title={title}
            data={kycstatusDropdownData}
            id={11}
            customClassBody={styles.dropdownbody}
          />
        </div>
        {loading ? (
          <Spinner customClass={styles.spinner} />
        ) : items.length === 0 ? (
          <NoRecordFound />
        ) : isMobile ? (
          <TableCard data={currentItems} />
        ) : (
          <Table
            tableheading={adminTableHead}
            tabledata={currentItems}
            ButtonGroup={["approve", "reject"]}
            customClassTableContainer={styles.tableContainer}
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
            limit={10}
          />
        )}
      </div>
    </>
  );
};
export default KYCVerification;
