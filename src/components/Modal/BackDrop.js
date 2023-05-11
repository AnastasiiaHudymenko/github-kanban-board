import styles from './modal.module.css';

const BackDrop = ({ children }) => {
  return <div className={styles.backdrop}>{children}</div>;
};

export default BackDrop;
