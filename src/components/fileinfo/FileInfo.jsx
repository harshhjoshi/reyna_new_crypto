import color from "../../constants/color";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";
import { Fail, File } from "../../svg-components";
import { FileInMB } from "../../utils/helpers";
import styles from "./fileinfo.module.scss";
const FileInfo = ({ file, data, setData, keys }) => {
  const handleFile = (item) => {
    setData({ ...data, [item]: null });
  };
  const fileSize = FileInMB(file.size);
  const isMobile = useCheckMobileScreen();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.fileInfoContainer}>
        <File fillColor={color.blue2} />
        <div className={styles.fileNameSize}>
          <span className={styles.fileName}>{file.name}</span>
          <span className={styles.fileSize}>{fileSize}</span>
        </div>
      </div>
      <Fail
        fillColor={color.blue2}
        height={isMobile ? 24 : 34}
        width={isMobile ? 24 : 34}
        handleClick={() => handleFile(keys)}
        customClass={styles.failIcon}
      />
    </div>
  );
};
export default FileInfo;
