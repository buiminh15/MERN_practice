import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      title: '',
      id: ''
    }
  }

  componentDidMount() {
    const { selectedNote } = this.props
    this.setState({
      text: selectedNote.body,
      title: selectedNote.title,
      id: selectedNote.id
    })
  }

  componentDidUpdate() {
    const { selectedNote } = this.props
    const { id } = this.state
    if (selectedNote.id !== id) {
      this.setState({
        text: selectedNote.body,
        title: selectedNote.title,
        id: selectedNote.id
      })
    }
  }

  updateBody = (val) => {
    this.setState({ text: val }, () => this.update())
  }

  updateTitle = (txt) => {
    this.setState({ title: txt }, () => this.update())
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500)

  render() {
    const { classes } = this.props
    const { title } = this.state
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input 
          type="text" className={classes.titleInput}
          placeholder='Note title ...'
          value={title ? title : null}
          onChange={(e) => this.updateTitle(e.target.value)}
        />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    )
  }
}

export default withStyles(styles)(EditorComponent)
