import { useState, useEffect } from 'react';

import { openDB } from 'idb';

import SearchBox from './SearchBox/SearchBox';
import Sidebar from './Sidebar/Sidebar';
import Workspace from './Workspace/Workspace';
import Modal from './Modal/Modal';

import styles from './globalStyles/globalStyles.module.css';

const App = () => {
  const [notate, setNotate] = useState([]);
  const [actualNotate, setActualNotate] = useState(null);
  const [newNotate, setNewNotate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idDeleteNote, setIdDeleteNote] = useState(null);

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

    if (newNotate) {
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
    }
  };

  const changeUserBtn = e => {
    const action = e.target.dataset.action;

    if (action === 'delete') {
      openDB('notes-db', 1)
        .then(db => {
          const transaction = db.transaction('notes', 'readwrite');
          const objectStore = transaction.objectStore('notes');
          return objectStore.delete(idDeleteNote);
        })
        .then(() => {
          return openDB('notes-db', 1).then(db => {
            const transaction = db.transaction('notes', 'readwrite');
            const objectStore = transaction.objectStore('notes');
            return objectStore.getAll();
          });
        })
        .then(data => {
          setNotate(data);
          setActualNotate(null);
          setShowModal(false);
          setIdDeleteNote(null);
        })
        .catch(error => {
          console.error('Error deleting note:', error);
        });
    } else {
      setShowModal(false);
    }
  };

  const deleteNote = (note, e) => {
    setShowModal(true);
    setIdDeleteNote(note.id);
  };

  const findNote = note => {
    console.log(note);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <SearchBox
            actualNotate={actualNotate}
            deleteNote={deleteNote}
            handleClickAdd={handleClickAdd}
            findNote={findNote}
          />
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
        newNotate={newNotate}
      />
      {showModal && <Modal changeUserBtn={changeUserBtn} />}
    </div>
  );
};

export default App;
