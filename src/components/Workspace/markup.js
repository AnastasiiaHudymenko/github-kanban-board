import styles from './workspace.module.css';

const markup = (actual, callback, updateNote, newNotate) => {
  if (!actual) {
    return (
      <div className={styles.workspace}>
        <textarea
          value={newNotate}
          style={{
            height: '100vh',
            width: '100vw',
            border: 'none',
            outline: 'none',
          }}
          onChange={callback}
          name="note"
        ></textarea>
      </div>
    );
  }
  return (
    <div className={styles.workspace}>
      <p>{actual.date}</p>
      <textarea
        style={{
          height: '100vh',
          width: '100vw',
          border: 'none',
          outline: 'none',
        }}
        value={actual.note}
        onChange={updateNote}
        name="note"
      ></textarea>
    </div>
  );
};

export default markup;
