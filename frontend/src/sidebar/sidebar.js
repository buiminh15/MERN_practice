import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';

class SidebarComponent extends Component {
  constructor() {
    super()
    this.state = {
      addingNote: false,
      title: null
    }
  }

  newNoteBtnClick = () => {
    const { addingNote } = this.state;
    this.setState({ title: null, addingNote: !addingNote})
  }

  updateTitle = (txt) => {
    this.setState({ title: txt })
  }

  newNote = () => {
    this.props.newNote(this.state.title)
    this.setState({ title: null, addingNote: false })
  }

  selectNote = (n, i) => {
    this.props.selectNote(n, i)
  }

  deleteNote = (note) => {
    this.props.deleteNote(note)
  }

  render() {
    const { addingNote } = this.state;
    const { notes, classes, selectedNoteIndex } = this.props

    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {!addingNote ? 'New Note' : 'Cancel'}
        </Button>
        {this.state.addingNote ?
          <div>
            <input
              type='text'
              className={classes.newNoteInput}
              placeholder='Enter new note'
              onKeyUp={e => this.updateTitle(e.target.value)}
            >
            </input>
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div> : null}
        <List>
          {notes ? notes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SidebarItemComponent 
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
                <Divider />
              </div>
            )
          }) : <div>Add a note</div>}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(SidebarComponent);
