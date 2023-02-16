import { useState } from 'react';
import { useEffect, useRef } from 'react';
import color from '../../constants/color';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';
import { Upload } from '../../svg-components';
import styles from './dragdropfile.module.scss'
const DragDropFile = ({ name, files, setFiles, active, customClass, filetype }) => {
    const hiddenFileInput = useRef(null);
    const drop = useRef(null);
    const [click, setClick] = useState(false)
    const handleFileChange = (e, item) => {
        setFiles({ ...files, [item]: e.target.files[0] })
    }
    const onUpload = (selectedFile, item) => {
        setFiles({ ...files, [item]: selectedFile })
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClick(true)
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setClick(false)

        const { files } = e.dataTransfer;
        if (files && files.length) {
            onUpload(files[0], name);
        }
    };
    useEffect(() => {
        drop.current.addEventListener("dragover", handleDragOver);
        drop.current.addEventListener("drop", handleDrop);
        drop.current.addEventListener("dragenter", handleDragEnter);
        drop.current.addEventListener("dragleave", handleDragLeave);

        // return () => {
        //     drop.current.removeEventListener("dragover", handleDragOver);
        //     drop.current.removeEventListener("drop", handleDrop);
        //     drop.current.removeEventListener("dragenter", handleDragEnter);
        //     drop.current.removeEventListener("dragleave", handleDragLeave);
        // };
    }, [handleDrop]);




    const handleClick = () => {
        hiddenFileInput.current.click()
        setClick(!click)
    };
    const isMobile = useCheckMobileScreen();
    return (
        <div className={active ? click ? styles.dragDropFileContainerActiveClick : styles.dragDropFileContainerActive : styles.dragDropFileContainerDeactive} ref={drop}>
            <Upload fillColor={active ? color.grey3 : color.grey4} handleClick={() => active ? handleClick() : {}} />
            <div className={styles.uploadOrDragDrop}>
                <span className={styles.clickToUpload} onClick={() => active ? handleClick() : {}}>Click here to Upload</span>
                {
                    !isMobile && <span className={styles.dragDrop}>or drag and drop</span>
                }
                <div className={styles.validFileTypes}>{filetype}</div>
                <input type="file"
                    ref={hiddenFileInput}
                    // onChange={handleFileChange}  
                    onChange={(e) => handleFileChange(e, name)}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    )
}
export default DragDropFile;