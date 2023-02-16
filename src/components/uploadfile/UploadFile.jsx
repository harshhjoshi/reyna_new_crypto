import styles from "./uploadfile.module.scss";
import { useRef } from "react";
import FilledButton from "../buttons/filledbutton/FilledButton";
const UploadFile = ({ handleFileChange, ref1, handleClick }) => {
  // const hiddenFileInput = useRef(null);
  // const handleClick = () => {
  //   console.log('click ref')
  //   hiddenFileInput.current.click();
  // };
  return (
    <>
      <FilledButton
        title="Upload Picture"
        handleClick={() => handleClick()}
        type="button"
        custonClass={styles.uploadPictureButton}
      />
      <input
        type="file"
        ref={ref1}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".jpeg, .jpg, .png"

      // value={value}
      />
    </>
  );
};
export default UploadFile;
