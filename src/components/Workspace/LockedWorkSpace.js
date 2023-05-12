import { IoLockClosed } from 'react-icons/io5';

import styles from './workspace.module.css';

const LockedWorkSpace = ({ enterPasswordLockedNote, errorPas }) => {
  return (
    <div className={styles.workspace}>
      <div className={styles.wrapIcon}>
        <IoLockClosed color="grey" size={60} />
      </div>
      <h2 className={styles.desc}>This note is locked.</h2>
      <p className={styles.desc}>Enter the note's password to gain access</p>
      <form className={styles.form} onSubmit={e => enterPasswordLockedNote(e)}>
        <input
          className={styles.pasField}
          style={{ borderColor: !errorPas ? 'grey' : 'red' }}
          type="password"
          name="password"
        />
      </form>
    </div>
  );
};

export default LockedWorkSpace;
