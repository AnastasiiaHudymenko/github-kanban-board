import { createPortal } from 'react-dom';
import BackDrop from './BackDrop';
import styles from './modal.module.css';

const Modal = ({ changeUserBtn }) => {
  return createPortal(
    <BackDrop>
      <div className={styles.modal}>
        <p className={styles.desc}>
          " Are you sure you want to delete the entry? After deleting it, you
          will lose it forever!"
        </p>
        <div className={styles.wrapBtn}>
          <button
            data-action="delete"
            onClick={changeUserBtn}
            className={`${styles.btn} ${styles.deleteBtn}`}
            type="button"
          >
            delete
          </button>
          <button
            data-action="cancel"
            onClick={changeUserBtn}
            className={`${styles.btn} ${styles.cancelBtn}`}
            type="button"
          >
            cancel
          </button>
        </div>
      </div>
    </BackDrop>,

    document.querySelector('#modal')
  );
};

export default Modal;
