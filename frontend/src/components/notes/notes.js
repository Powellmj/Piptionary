import React from 'react';
import './notes.css'
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
      tags: [],
      formatting: true
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onContentStateChange = this.onContentStateChange.bind(this)
    this.compileContentState = this.compileContentState.bind(this)
  }

  componentDidMount() {
    this.setState({ editorState: EditorState.createEmpty() })
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
    const formData = new FormData();

    const contentState = this.state.editorState.getCurrentContent();
    let content = JSON.stringify(convertToRaw(contentState))

    formData.append('note[body]', draftToHtml(JSON.parse(content)));
    formData.append('note[content]', this.compileContentState());
    formData.append('note[tags]', this.state.tags.split(' '));
    formData.append('note[author_id]', this.props.currentUser.id);

    this.props.processForm(formData)
    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({ editorState })
  }

  compileContentState() {
    let content = '';
    this.state.contentState.blocks.forEach(block => {
      content += block.text
    })
    return content
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="notes-container">
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
          <input type="text"
            value={this.state.tags}
            onChange={this.update('tags')}
            className="note-tag-input"
            placeholder="Tags" />
        </div>
      );
    } else {
      return null
    }
  }
}

export default Notes;