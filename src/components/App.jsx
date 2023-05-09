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
    setNewNotate({
      note: e.target.value,
      date: Date.now(),
    });
  };

  const handleClickActualNotate = notateId => {
    const findNotate = notate.find(({ id }) => id === notateId);
    setActualNotate(findNotate);
  };

  const updateNote = e => {
    if (actualNotate) {
      const updatedNotate = {
        ...actualNotate,
        note: e.target.value,
        date: Date.now(),
      };

      openDB('notes-db', 1)
        .then(db => {
          const transaction = db.transaction('notes', 'readwrite');
          const objectStore = transaction.objectStore('notes');
          return objectStore.put(updatedNotate);
        })
        .then(() => {
          setActualNotate(updatedNotate);
          return openDB('notes-db', 1).then(db => {
            const transaction = db.transaction('notes', 'readwrite');
            const objectStore = transaction.objectStore('notes');
            return objectStore.getAll();
          });
        })
        .then(data => {
          setNotate(data);
        })
        .catch(error => {
          console.error('Error updating note:', error);
        });
    }
  };

  const handleClickAdd = () => {
    setActualNotate(null);
    console.log(newNotate);
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
      <Workspace
        updateNote={updateNote}
        actualNotate={actualNotate}
        handleChange={handleChange}
      />
    </div>
  );
};

export default App;
