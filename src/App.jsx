import React from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Split from 'react-split';
import { nanoid } from 'nanoid';
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, notesCollection } from './firebase';

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState('');

  const currentNote = notes.find((note) => note.id === currentNoteId) || notes[0];

  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (!currentNote) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  function updateNote(text) {
    const docRef = doc(db, 'notes', currentNoteId);
    setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, 'notes', noteId);
    await deleteDoc(docRef);
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction='horizontal' className='split'>
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor currentNote={currentNote} updateNote={updateNote} />
        </Split>
      ) : (
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
