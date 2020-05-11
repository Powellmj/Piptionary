import React from 'react';
import './note_form.scss'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      editorState: '',
      contentState: '',
      tags: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onContentStateChange = this.onContentStateChange.bind(this)
    this.compileContentState = this.compileContentState.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.location.pathname === '/notes/create') {
      this.setState({ editorState: EditorState.createEmpty() })
    } else {
      this.props.requestNote(this.props.location.pathname.split('/')[2]).then(() => {
        const blocksFromHtml = htmlToDraft(this.props.notes[this.props.location.pathname.split('/')[2]].body);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);

        this.setState({
          title: this.props.notes[this.props.location.pathname.split('/')[2]].title,
          contentState: contentState,
          editorState: editorState,
          tags: this.props.notes[this.props.location.pathname.split('/')[2]].tags.join(' '),
        })
      }
      )
    }
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
    let title = this.state.title

    if (!title) {
      title = 'Untitled Note'
    }

    const note = {
      title,
      body: draftToHtml(JSON.parse(content)),
      content: this.compileContentState(),
      tags: this.state.tags.split(' '),
      author_id: this.props.currentUser.id
    };

    if (this.props.location.pathname === '/notes/create') {
      this.props.processForm(note)
    } else {
      note._id = this.props.location.pathname.split('/')[2]
      this.props.updateForm(note)
    }

    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({
      editorState,
      tags: '',
      title: ''
    })
    this.props.history.push('/notes/index')
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

  render() {
    return (
      <div className="notes-container">
        <div className="notes-create-note-card card text-center">
          <div className="card-header">
            <input
              type="text"
              className="note-title-input form-control"
              aria-label="Tag Input"
              onChange={this.update('title')}
              placeholder="Give me a name!"
              value={this.state.title} />
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
      </div>
    );
  }
}

export default Notes;