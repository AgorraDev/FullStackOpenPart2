import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showall, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
        noteService
          .getAll()
          .then(initialNotes => {
            setNotes(initialNotes)
        })
      }, [])

  const notesToShow = showall
    ? notes 
    : notes.filter(note => note.important)

  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked', e.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    axios
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })

  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(err => {
        alert(
          `The note ${note.content} was already deleted from the server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showall)}>
          show {showall ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} 
                note={note} 
                toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}     
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange={handleNoteChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App