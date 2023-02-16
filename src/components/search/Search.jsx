import styles from "./search.module.scss";
import { SearchIcon } from "../../svg-components";
import color from "../../constants/color";

const Search = ({ customClass, parentCallback, placeholder,value }) => {
  const handleChange = (e) => {
    parentCallback(e.target.value);
  };

  return (
    // <div className={[styles.searchContainer, customClass].join(' ')}>
    <form
      className={[styles.searchFormContainer, customClass].join(" ")}
    //   onSubmit={(e) => handleSubmit(e)}
    >
      <SearchIcon
        fillColor={color.grey1}
        height={24}
        width={24}
        customClass={styles.searchIcon}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        className={styles.searchInputField}
      />
    </form>
    // </div>
  );
};
export default Search;
