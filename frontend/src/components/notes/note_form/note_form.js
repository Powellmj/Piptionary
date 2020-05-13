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
      <div className="notes-form-container">
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
                inline: {
                  inDropdown: false,
                },
                list: {
                  inDropdown: true,
                },
                textAlign: {
                  inDropdown: true,
                },
                colorPicker: {
                  colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                    'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                    'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                    'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                    'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)', 'rgb(255,255,255)',
                    'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)', 'rgba(0, 0, 0, 0)'],
                },
                link: {
                  inDropdown: true,
                }
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