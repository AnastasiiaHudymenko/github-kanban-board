import { GoPlus } from 'react-icons/go';
import { RiDeleteBin5Line, RiEditBoxLine, RiSearchLine } from 'react-icons/ri';

import styles from './searchBox.module.css';
import { useState } from 'react';

const SearchBox = ({ handleClickAdd, deleteNote, actualNotate, findNote }) => {
  const [filterNote, setFilterNote] = useState('');
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
        <RiSearchLine
          style={{ display: filterNote !== '' ? 'none' : 'block' }}
          size={16}
          color="grey"
          className={styles.icon}
        />
        <input
          onChange={e => {
            setFilterNote(e.target.value);
            findNote(e.target.value);
          }}
          value={filterNote}
          className={styles.textField}
          name="search"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBox;
