import ListItem from 'components/ListItem/ListItem';

import styles from './sidebar.module.css';

const Sidebar = ({ notate, handleClickActualNotate }) => {
  return (
    <div className={styles.sidebar}>
      <ListItem
        handleClickActualNotate={handleClickActualNotate}
        notate={notate}
      />
    </div>
  );
};

export default Sidebar;
