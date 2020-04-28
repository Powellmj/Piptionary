import React from 'react';
import './notes.scss'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
      contentState: '',
      tags: '',
      formatting: true
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onContentStateChange = this.onContentStateChange.bind(this)
    this.compileContentState = this.compileContentState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderNotes = this.renderNotes.bind(this)
  }

  componentDidMount() {
    this.setState({ editorState: EditorState.createEmpty() })
    this.props.requestAllNotes()
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  };

  onContentStateChange(contentState) {
    this.setState({
      contentState,
    });
  };

  handleSubmit() {
    const contentState = this.state.editorState.getCurrentContent();
    let content = JSON.stringify(convertToRaw(contentState))

    const note = {
      body: draftToHtml(JSON.parse(content)),
      content: this.compileContentState(),
      tags: this.state.tags.split(' '),
      author_id: this.props.currentUser.id
    };

    this.props.processForm(note)
    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({
      editorState,
      tags: ''
    })
  }

  deleteNote(noteId) {
    this.props.deleteNote(noteId)
  }

  compileContentState() {
    let content = '';
    if (this.state.contentState.blocks) {
      this.state.contentState.blocks.forEach(block => {
        content += block.text
      })
    }
    return content
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  renderNotes() {
    return Object.values(this.props.notes).reverse().map(note => (
      <div key={note._id} className="note-card card">
        <div className="card-header">
          <button onClick={() => { this.deleteNote(note._id) }} type="button" className="btn btn-danger">Danger</button>
        </div>
        <div className="note-background">
          <div className="note-body card-body">
            {this.attachNote(note)}
          </div>
        </div>
        <div className="input-group-prepend">
          <div className="notes-tags">
            Tags: {note.tags.join(' ')}
          </div>
        </div>
      </div>
    ))
  }

  attachNote(note) {
    let createMarkup = () => { return { __html: note.body }; };
    return <div dangerouslySetInnerHTML={createMarkup()}></div>
  }

  render() {
    return (
      <div className="notes-container">
        <div className="notes-scrollbox">
          <div className="notes-create-note-card card text-center">
            <div className="card-header">
              Hurry! Write it down before you forget it!
              </div>
            <div className="notes-create-note-body card-body">
              <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onContentStateChange}
                toolbarClassName="notes-toolbar"
                wrapperClassName="notes-editor-wrapper"
                editorClassName="notes-editor"
                toolbar={{
                  options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link'],
                }} />
            </div>
            <div className="notes-create-note-footer card-footer">
              <div className="notes-tag-group input-group mb-3">
                <div className="input-group-prepend">
                  <span className="note-tag-text input-group-text" id="inputGroup-sizing-default">Tags</span>
                </div>
                <input
                  type="text"
                  className="note-tag-input form-control"
                  aria-label="Tag Input"
                  onChange={this.update('tags')}
                  value={this.state.tags} />
                <button type="button" onClick={this.handleSubmit} className="notes-submit btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
          <div className="notes-index">
            {this.renderNotes()}
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;