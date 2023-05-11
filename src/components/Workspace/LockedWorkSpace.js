import styles from './workspace.module.css';

const LockedWorkSpace = ({ enterPasswordLockedNote, errorPas }) => {
  return (
    <div className={styles.workspace}>
      <h2>This note is locked.</h2>
      <p>Enter the note's password to gain access</p>
      <form onSubmit={e => enterPasswordLockedNote(e)}>
        <input
          style={{ borderColor: !errorPas ? 'green' : 'red' }}
          type="password"
          name="password"
        />
      </form>
    </div>
  );
};

export default LockedWorkSpace;
