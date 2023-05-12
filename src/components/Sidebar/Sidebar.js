import ListItem from 'components/ListItem/ListItem';

import styles from './sidebar.module.css';

const Sidebar = ({
  notate,
  handleClickActualNotate,
  userlockedNote,
  changeLockedNote,
  filterdNote,
}) => {
  return (
    <div className={styles.sidebar}>
      <ListItem
        userlockedNote={userlockedNote}
        handleClickActualNotate={handleClickActualNotate}
        notate={notate}
        changeLockedNote={changeLockedNote}
        filterdNote={filterdNote}
      />
    </div>
  );
};

export default Sidebar;
