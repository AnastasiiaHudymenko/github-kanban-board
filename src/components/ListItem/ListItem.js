import { format } from 'date-fns';
import { RiLock2Line } from 'react-icons/ri';

import styles from './listItem.module.css';

const formateMarkup = (str, date) => {
  const arr = str.split('\n');
  const title = arr.splice(0, 1);
  const newStr = arr.join();

  return (
    <>
      <b className={styles.title}>{title}</b>
      <div>
        <span className={styles.date}>{format(date, 'MM/dd/yy')}</span>
        <span className={styles.desc}>
          {newStr.length <= 7
            ? newStr.replace(',', '')
            : newStr.replace(',', '').slice(0, 15) + '...'}
        </span>
      </div>
    </>
  );
};

const ListItem = ({
  notate,
  handleClickActualNotate,
  userlockedNote,
  changeLockedNote,
  filterdNote,
}) => {
  const idLocedNote = userlockedNote.map(({ id }) => id);

  const elements = notate.map(({ id, note, date }) => {
    if (idLocedNote.includes(id)) {
      return (
        <li
          className={`${styles.item} ${styles.itemLocked}`}
          key={id}
          onClick={() => changeLockedNote(id)}
        >
          <div className={styles.wrapContent}>
            <span className={styles.date}>{format(date, 'MM/dd/yy')}</span>
            <RiLock2Line color="#212121" />
          </div>
        </li>
      );
    }
    return (
      <li
        className={styles.item}
        style={{
          backgroundColor: filterdNote?.id === id ? '#cdc779' : 'inherit',
        }}
        key={id}
        onClick={() => handleClickActualNotate(id)}
      >
        {formateMarkup(note, date)}
      </li>
    );
  });

  return <ul className={styles.list}>{elements}</ul>;
};

export default ListItem;
