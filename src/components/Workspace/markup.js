import { format } from 'date-fns';
import styles from './workspace.module.css';

const actualMarkup = (data, callback, formatDate) => {
  return (
    <div className={styles.workspace}>
      <p className={styles.date}>{formatDate}</p>
      <textarea
        value={data || ''}
        className={styles.textField}
        onChange={callback}
        name="note"
      ></textarea>
    </div>
  );
};

const markup = (
  actual,
  handleChange,
  updateNote,
  newNotate,
  filterdNote,
  userlockedNote
) => {
  if (filterdNote) {
    const findLocked = userlockedNote.find(el => el.id === filterdNote.id);

    if (findLocked) {
      return;
    }
    return actualMarkup(filterdNote.note);
  }
  if (!actual) {
    const formatDate = format(Date.now(), 'MMM d, yyyy p');

    return actualMarkup(newNotate?.note, handleChange, formatDate);
  }

  const formatDate2 = format(actual.date, 'MMM d, yyyy p');
  return actualMarkup(actual.note, updateNote, formatDate2);
};

export default markup;
