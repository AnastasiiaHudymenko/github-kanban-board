import { useState, useEffect } from 'react';
import { openDB } from 'idb';

import SearchBox from './SearchBox/SearchBox';
import Sidebar from './Sidebar/Sidebar';
import Workspace from './Workspace/Workspace';

import styles from './globalStyles/globalStyles.module.css';

const App = () => {
  const [notate, setNotate] = useState([]);
  const [actualNotate, setActualNotate] = useState(null);
  const [newNotate, setNewNotate] = useState([]);

  useEffect(() => {
    openDB('notes-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        }
      },
    })
      .then(db => {
        const transaction = db.transaction('notes', 'readwrite');
        const objectStore = transaction.objectStore('notes');
        return objectStore.getAll();
      })
      .then(data => {
        setNotate(data);
      })
      .catch(error => {
        console.error('Error opening database:', error);
      });
  }, []);

  const handleChange = e => {
    const { dataset, textContent } = e.target;

    setNewNotate({
      ...newNotate,
      [dataset.name]: textContent,
      date: new Date().toLocaleString(),
    });
  };

  const handleClickActualNotate = notateId => {
    const findNotate = notate.find(({ id }) => id === notateId);
    setActualNotate(findNotate);
  };

  const handleClickAdd = () => {
    setActualNotate(null);

    openDB('notes-db', 1).then(db => {
      const transaction = db.transaction('notes', 'readwrite');
      const objectStore = transaction.objectStore('notes');
      objectStore
        .add(newNotate)
        .then(() => {
          setNewNotate(null);
          return objectStore.getAll();
        })
        .then(data => {
          setNotate(data);
        })
        .catch(error => {
          console.error('Error adding note:', error);
        });
    });
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <SearchBox handleClickAdd={handleClickAdd} />
        </div>
      </header>

      <Sidebar
        handleClickActualNotate={handleClickActualNotate}
        notate={notate}
      />
      <Workspace actualNotate={actualNotate} handleChange={handleChange} />
    </div>
  );
};

export default App;
