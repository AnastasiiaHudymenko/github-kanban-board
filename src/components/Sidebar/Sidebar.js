import ListItem from 'components/ListItem/ListItem';

import styles from './sidebar.module.css';

const Sidebar = ({
  notate,
  handleClickActualNotate,
  userlockedNote,
  changeLockedNote,
}) => {
  return (
    <div className={styles.sidebar}>
      <ListItem
        userlockedNote={userlockedNote}
        handleClickActualNotate={handleClickActualNotate}
        notate={notate}
        changeLockedNote={changeLockedNote}
      />
    </div>
  );
};

export default Sidebar;
