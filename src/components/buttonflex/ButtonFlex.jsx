import FilledButton from "../buttons/filledbutton/FilledButton";
import styles from "./buttonflex.module.scss";
const Buttonflex = ({ handleCancel, submit, cancel, handleSubmit, type,customSubmitButton,customCancelButton,customClassTitle}) => {
  return (
    <div className={styles.buttonsFlex}>
      <FilledButton
        title={submit}
        type={type}
        handleClick={() => (handleSubmit ? handleSubmit() : {})}
        custonClass={[styles.submitButton,customSubmitButton].join(' ')}
        custonClassTitle={customClassTitle}
      />
      <FilledButton
        title={cancel}
        type="button"
        handleClick={() => (handleCancel ? handleCancel() : {})}
        custonClass={[styles.cancelButton,customCancelButton].join(' ')}
      />
    </div>
  );
};
export default Buttonflex;
