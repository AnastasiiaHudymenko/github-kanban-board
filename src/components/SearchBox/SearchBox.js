import { GoPlus } from 'react-icons/go';
import { RiDeleteBin5Line, RiSearchLine, RiLock2Line } from 'react-icons/ri';

import styles from './searchBox.module.css';
import { useState } from 'react';

const SearchBox = ({
  handleClickAdd,
  deleteNote,
  actualNotate,
  findNote,
  lockedNote,
}) => {
  const [filterNote, setFilterNote] = useState('');

  const isDisabled = !actualNotate ? true : false;

  return (
    <div className={styles.wrapContent}>
      <div className={styles.wrapBtn}>
        <button type="button" className={styles.btn} onClick={handleClickAdd}>
          <GoPlus size={20} />
        </button>
        <button
          disabled={isDisabled}
          type="button"
          className={styles.btn}
          onClick={() => deleteNote(actualNotate)}
        >
          <RiDeleteBin5Line size={20} />
        </button>
        <button disabled={isDisabled} type="button" className={styles.btn}>
          <RiLock2Line onClick={() => lockedNote()} size={20} />
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
