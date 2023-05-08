import styles from './searchBox.module.css';

const SearchBox = ({ handleClickAdd }) => {
  return (
    <div className={styles.wrapContent}>
      <div className={styles.wrapBtn}>
        <button onClick={handleClickAdd}>Add</button>
        <button>Delete</button>
        <button>Update</button>
      </div>
      <div>
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
