import { format } from 'date-fns';
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

const ListItem = ({ notate, handleClickActualNotate }) => {
  const elements = notate.map(({ id, note, date }) => (
    <li
      className={styles.item}
      key={id}
      onClick={() => handleClickActualNotate(id)}
    >
      {formateMarkup(note, date)}
    </li>
  ));

  return <ul className={styles.list}>{elements}</ul>;
};

export default ListItem;
