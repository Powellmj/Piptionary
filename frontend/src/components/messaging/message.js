import React from 'react';
import './message.scss'
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
      contentState: '',
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onContentStateChange = this.onContentStateChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const contentState = this.state.editorState.getCurrentContent();
    let content = JSON.stringify(convertToRaw(contentState))

    const message = {
      body: draftToHtml(JSON.parse(content)),
      author_id: this.props.currentUser.id
    };

    this.props.processForm(message)

    const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
    this.setState({
      editorState,
    })
  }

  deleteNote(noteId) {
    this.props.deleteNote(noteId)
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return (
    <Editor
      editorState={this.state.editorState}
      onEditorStateChange={this.onEditorStateChange}
      onContentStateChange={this.onContentStateChange}
      toolbarClassName="messages-toolbar"
      wrapperClassName="messages-editor-wrapper"
      editorClassName="messages-editor"
      toolbar={{
        options: ['inline', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link'],
      }} />
    );
  }
}

export default Notes;