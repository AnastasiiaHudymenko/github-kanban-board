import { GoPlus } from 'react-icons/go';
import { RiDeleteBin5Line, RiEditBoxLine, RiSearchLine } from 'react-icons/ri';

import styles from './searchBox.module.css';

const SearchBox = ({ handleClickAdd, deleteNote, actualNotate }) => {
  return (
    <div className={styles.wrapContent}>
      <div className={styles.wrapBtn}>
        <button type="button" className={styles.btn} onClick={handleClickAdd}>
          <GoPlus size={20} color="grey" />
        </button>
        <button
          type="button"
          className={styles.btn}
          onClick={() => deleteNote(actualNotate)}
        >
          <RiDeleteBin5Line size={20} color="grey" />
        </button>
        <button type="button" className={styles.btn}>
          <RiEditBoxLine size={20} color="grey" />
        </button>
      </div>
      <div className={styles.wrap}>
        <RiSearchLine size={16} color="grey" className={styles.icon} />
        <input
          className={styles.textField}
          name="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBox;
