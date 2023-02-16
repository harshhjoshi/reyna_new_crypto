import styles from './kycdocument.module.scss'
const KYCDocument = ({ number, title, subtitle, documentList, inputfiled, file, name, dragdrop, files, setFiles }) => {
    return (
        <div className={styles.formFieldContainer}>
            <Number number={1} />
            <div className={styles.documentDetails}>
                <div className={styles.documentType}>
                    {title}
                </div>
                {
                    subtitle && <div>
                        {subtitle}
                    </div>
                }

                <ul className={styles.documentList}>
                    <li className={styles.documentName}>National Identity Card</li>
                    <li className={styles.documentName}>Valid South African Passport</li>
                </ul>
                {
                    inputfiled && <div>input field</div>
                }

                {
                    dragdrop &&
                        !files.identitycard ? <DragDropFile /* handleFileChange={handleChange('identitycard')} */ name="identitycard" files={files} setFiles={setFiles} /> :
                        <FileInfo file={files.identitycard} data={files} setData={setFiles} keys='identitycard' />
                }
            </div>
        </div>
    )
}
export default KYCDocument;