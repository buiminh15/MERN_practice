import React from 'react';
import firebase from 'firebase';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import SidebarItemComponent from './sidebaritem/sidebarItem';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    }
  }

  componentDidMount() {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id
        return data;
      })
      this.setState({ notes })
    })
  }

  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note })

  }

  noteUpdate = (id, note) => {
    firebase.firestore().collection('notes').doc(id).update({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  newNote = async (title) => {
    const { notes } = this.state;
    const note = {
      title: title,
      body: ''
    }
    const newFromDB = await firebase.firestore().collection('notes').add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const newId = newFromDB.id
    this.setState({ notes: [...this.state.notes, note] })
    const newNoteIndex = this.state.notes.indexOf(notes.filter(_note => _note.id === newId)[0])
    this.setState({ selectedNote: notes[newNoteIndex], selectedNoteIndex: newNoteIndex })
  }

  deleteNote = (note) => {
    const { selectedNoteIndex, notes } = this.state
    this.setState({ notes: notes.filter(_note => _note !== note )})
    const noteIndex = notes.indexOf(note)
    if (selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null })
    }
    notes.length > 1 ? 
      this.selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1) : 
      this.setState({ selectedNote: null, selectedNoteIndex: null })

    firebase.firestore().collection('notes').doc(note.id).delete()
  }

  render() {
    const { notes, selectedNoteIndex, selectedNote } = this.state;
    return <div className='app-container'>
      <SidebarComponent
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        deleteNote={this.deleteNote}
        selectNote={this.selectNote}
        newNote={this.newNote}
      />
      {selectedNote ? <EditorComponent
        selectedNote={selectedNote}
        selectedNoteIndex={selectedNoteIndex}
        noteUpdate={this.noteUpdate}
        notes={notes}
      /> : null
      }

    </div>
  }
}

export default App;
