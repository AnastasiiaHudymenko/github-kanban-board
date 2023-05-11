import { createPortal } from 'react-dom';
import BackDrop from './BackDrop';

import styles from './modal.module.css';

const ModalLocked = ({ lockedNote, handleClickCancel }) => {
  return createPortal(
    <BackDrop>
      <div className={styles.modal}>
        <p className={styles.desc}>Enter the password to close this note</p>
        <form onSubmit={e => lockedNote(e)}>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <div className={styles.wrapBtn}>
            <button
              data-action="loced"
              className={`${styles.btn} ${styles.deleteBtn}`}
              type="submit"
            >
              locked
            </button>
          </div>
        </form>
        <button
          data-action="cancel"
          onClick={handleClickCancel}
          className={`${styles.btn} ${styles.cancelBtn}`}
          type="submit"
        >
          cancel
        </button>
      </div>
    </BackDrop>,
    document.querySelector('#modal')
  );
};

export default ModalLocked;
