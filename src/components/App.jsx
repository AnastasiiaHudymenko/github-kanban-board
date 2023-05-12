import { useState, useEffect } from 'react';

import { openDB } from 'idb';

import SearchBox from './SearchBox/SearchBox';
import Sidebar from './Sidebar/Sidebar';
import Workspace from './Workspace/Workspace';
import Modal from './Modal/Modal';
import ModalLocked from './Modal/ModalLoced';
import LockedWorkSpace from './Workspace/LockedWorkSpace';

import styles from './globalStyles/globalStyles.module.css';

const App = () => {
  const [notate, setNotate] = useState([]);
  const [actualNotate, setActualNotate] = useState(null);
  const [newNotate, setNewNotate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idDeleteNote, setIdDeleteNote] = useState(null);
  const [userlockedNote, setUserLockedNote] = useState([]);
  const [showModalLocedNote, setShowLockedNote] = useState(false);
  const [showLockedNote, setShoeLockedNote] = useState(null);
  const [errorPas, setErrorPas] = useState(null);
  const [filterdNote, setFilterNote] = useState(null);

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

  useEffect(() => {
    openDB('notes-locked-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('notes-locked')) {
          db.createObjectStore('notes-locked', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      },
    })
      .then(db => {
        const transaction = db.transaction('notes-locked', 'readwrite');
        const objectStore = transaction.objectStore('notes-locked');
        return objectStore.getAll();
      })
      .then(data => {
        setUserLockedNote(data);
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
    setShoeLockedNote(null);
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
    if (note === '') {
      return setFilterNote(note);
    }
    const find = notate.find(el =>
      el.note.toLowerCase().includes(note.toLowerCase())
    );

    setFilterNote(find);
  };

  const lockedNote = e => {
    setShowLockedNote(true);

    if (e) {
      e.preventDefault();
      const password = e.target.elements.password.value;
      const newLocedNote = {
        ...actualNotate,
        password,
      };

      openDB('notes-locked-db', 1).then(db => {
        const transaction = db.transaction('notes-locked', 'readwrite');
        const objectStore = transaction.objectStore('notes-locked');
        objectStore
          .add(newLocedNote)
          .then(() => {
            return objectStore.getAll();
          })
          .then(data => {
            setUserLockedNote(data);
            setActualNotate(null);
          })
          .catch(error => {
            console.error('Error adding note:', error);
          })
          .finally(() => setShowLockedNote(false));
      });
    }
  };

  const changeLockedNote = lockedId => {
    const findLockedNote = userlockedNote.find(({ id }) => id === lockedId);
    setShoeLockedNote(findLockedNote);
  };

  const enterPasswordLockedNote = e => {
    e.preventDefault();
    const locedNotePas = e.target.elements.password.value;

    const [findLocedNote] = userlockedNote.filter(
      ({ password, id }) =>
        password === locedNotePas && id === showLockedNote.id
    );
    if (!findLocedNote) {
      return setErrorPas('Invalid password');
    }
    openDB('notes-locked-db', 1)
      .then(db => {
        const transaction = db.transaction('notes-locked', 'readwrite');
        const objectStore = transaction.objectStore('notes-locked');
        return objectStore.delete(findLocedNote.id);
      })
      .then(() => {
        return openDB('notes-locked-db', 1).then(db => {
          const transaction = db.transaction('notes-locked', 'readwrite');
          const objectStore = transaction.objectStore('notes-locked');
          return objectStore.getAll();
        });
      })
      .then(data => {
        setUserLockedNote(data);
        setShoeLockedNote(null);
        setActualNotate(findLocedNote);
        setErrorPas('');
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  const handleClickCancel = () => {
    setShowLockedNote(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <SearchBox
            lockedNote={lockedNote}
            actualNotate={actualNotate}
            deleteNote={deleteNote}
            handleClickAdd={handleClickAdd}
            findNote={findNote}
          />
        </div>
      </header>
      <Sidebar
        userlockedNote={userlockedNote}
        handleClickActualNotate={handleClickActualNotate}
        notate={notate}
        changeLockedNote={changeLockedNote}
        filterdNote={filterdNote}
      />
      {showLockedNote && !filterdNote ? (
        <LockedWorkSpace
          errorPas={errorPas}
          enterPasswordLockedNote={enterPasswordLockedNote}
        />
      ) : (
        <Workspace
          updateNote={updateNote}
          actualNotate={actualNotate}
          handleChange={handleChange}
          newNotate={newNotate}
          filterdNote={filterdNote}
          userlockedNote={userlockedNote}
        />
      )}

      {showModal && <Modal changeUserBtn={changeUserBtn} />}
      {showModalLocedNote && (
        <ModalLocked
          handleClickCancel={handleClickCancel}
          lockedNote={lockedNote}
        />
      )}
    </div>
  );
};

export default App;
