import styles from './workspace.module.css';

const markup = (actual, callback) => {
  if (!actual) {
    return (
      <div className={styles.workspace}>
        <p onInput={callback}>{new Date().toLocaleString()}</p>
        <p data-name="title" onInput={callback} contentEditable={true}></p>
        <div
          data-name="desc"
          style={{
            height: '100vh',
          }}
          contentEditable={true}
          onInput={callback}
        ></div>
      </div>
    );
  }
  return (
    <div className={styles.workspace}>
      <p>{actual.date}</p>
      <h3>{actual.title}</h3>
      <p>{actual.desc}</p>
    </div>
  );
};

export default markup;
