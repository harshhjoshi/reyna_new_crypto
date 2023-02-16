import styles from "./table.module.scss";
import Button from "../buttons/Button";
import { Close, Tick } from "../../svg-components";
import color from "../../constants/color";
import StatusButton from "../buttons/statusbutton/StatusButton";
import { useGlobalContext } from "../../context/context";
import Tooltip from "../tooltip/Tooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import APICall from "../../constants/API";
import * as API from "../../constants/API";

const Table = ({
  tableheading,
  tabledata,
  customClassTable,
  customClassTableContainer,
  customClassTableHead,
  customClassTh,
  customClassTableRow,
  customClassTableRow1,
  customClassTd,
  customClassTd1,
  ButtonGroup,
}) => {
  return (
    <>
      <div
        className={[styles.tableContainer, customClassTableContainer].join(" ")}
      >
        <table
          className={[styles.table, customClassTable].join(" ")}
          cellSpacing={0}
        >
          <thead>
            <tr
              className={[styles.tableHeadRow, customClassTableHead].join(" ")}
            >
              {tableheading.map((item, index) => (
                <TableHeader
                  item={item}
                  key={index}
                  customClassTh={customClassTh}
                  ButtonGroup={ButtonGroup}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {tabledata.map((item, index) => (
              <TableRow
                item={item}
                tableheading={tableheading}
                key={index}
                customClassTableRow={customClassTableRow}
                customClassTableRow1={customClassTableRow1}
                customClassTd={customClassTd}
                id={item.requestId}
                customClassTd1={customClassTd1}
                ButtonGroup={ButtonGroup}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const TableHeader = ({ item }) => {
  return <th className={[styles.tableHead].join(" ")}>{item.label}</th>;
};
const TableRow = ({
  item,
  ButtonGroup,
  tableheading,
  customClassTableRow,
  customClassTd,
  id,
}) => {
  const { openModal } = useGlobalContext();
  const [showTooltip, setShowTooltip] = useState(false);
  const [value, setValue] = useState(0);
  const access_token = localStorage.getItem("access_token");

  const handleTooltipHover = (id) => {
    setValue(id);
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    setValue(-1);
    setShowTooltip(false);
  };
  const handleShow = (items, file) => {
    const files = file.split("\\")[file.split("\\").length - 1];
    const userId = item.user.userId;
    const fileType = file
      .split("\\")
    [file.split("\\").length - 1].split(".")[1];
    getCurrentFile(files, userId, fileType);
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
    <tr className={[customClassTableRow, styles.tableRow].join(" ")}>
      {tableheading.map((tableheadingitem, index) => {
        return (
          <td
            className={[tableheadingitem.doc ? styles.tableRowDataDoc : styles.tableRowData, customClassTd].join(" ")}
            key={index}
            onClick={() =>
              handleShow(
                tableheadingitem.doc,
                item[`${tableheadingitem.value}`]
              )
            }
          >
            {`${tableheadingitem.value}` === "user" && (
              <div>{item.user.username}</div>
            )}
            {`${tableheadingitem.value}` === "actions" ? (
              <>
                {item.requestStatus === "Rejected" ||
                  item.requestStatus === "Approved" ? null : (
                  <>
                    {ButtonGroup.includes("approve") && (
                      <Button
                        title={
                          <Tick
                            fillColor={color.blue3}
                            height={15}
                            width={17}
                          />
                        }
                        customClass={styles.button}
                        handleClick={() => openModal("approved", id)}
                      />
                    )}
                    {ButtonGroup.includes("reject") && (
                      <Button
                        title={
                          <Close
                            fillColor={color.blue3}
                            height={15}
                            width={17}
                          />
                        }
                        customClass={styles.button}
                        handleClick={() => openModal("rejected", id)}
                      />
                    )}
                  </>
                )}
              </>
            ) : tableheadingitem.value === "status" ? (
              <StatusButton
                status={item.requestStatus}
                id={id}
                customClass={
                  item.requestStatus === "In Review"
                    ? styles.inReviewButton
                    : item.requestStatus === "Rejected"
                      ? styles.rejectButton
                      : item.requestStatus === "Approved"
                        ? styles.approveButton
                        : item.requestStatus === "Pending"
                          ? styles.pendingButton
                          : item.requestStatus === "Submitted"
                            ? styles.submittedButton
                            : null
                }
              />
            ) : tableheadingitem.doc ? (
              `${tableheadingitem.value}` === "physicalAddressDoc" ? (
                <>
                  {
                    item[`${tableheadingitem.value}`].split(`\\`)[
                    item[`${tableheadingitem.value}`].split(`\\`).length - 1
                    ]
                  }
                  <div
                    className={styles.addressText}
                    onMouseOver={() => handleTooltipHover(id)}
                    onMouseLeave={() => handleTooltipLeave(id)}
                  >
                    {item.physicalAddress &&
                      item.physicalAddress.substring(0, 34) + "..."}
                    {showTooltip &&
                      id === value &&
                      `${tableheadingitem.value}` === "physicalAddressDoc" && (
                        <Tooltip title={item.physicalAddress} />
                      )}
                  </div>
                </>
              ) : (
                <>
                  {
                    item[`${tableheadingitem.value}`].split(`\\`)[
                    item[`${tableheadingitem.value}`].split(`\\`).length - 1
                    ]
                  }
                </>
              )
            ) : (
              <>
                {`${tableheadingitem.value}` === "identityNo" && (
                  <div>{item.identityNumber}</div>
                )}
              </>
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
