import styles from "./popup.module.scss";

const Popup = ({ Children }) => {
  return (
    <div className={styles.popup}>
      <Children data="tes" />
    </div>
  );
};

export default Popup;
