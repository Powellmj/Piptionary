import React from 'react';
import './message_text_area.scss'
import { EditorState, convertToRaw, Modifier, SelectionState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import openSocket from 'socket.io-client';
const socket = process.env.NODE_ENV === 'production' ? openSocket('https://piptionary.herokuapp.com/') : openSocket('http://localhost:5000')

class MessageTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '',
      contentState: '',
      shift: false
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onContentStateChange = this.onContentStateChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  componentDidMount() {
    this.setState({ editorState: EditorState.createEmpty() })

    document.querySelector('.messages-editor').addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        this.state.shift = true
      } else if (e.key === 'Enter' && !this.state.shift) {
        this.handleSubmit()
      }
    })
    document.querySelector('.messages-editor').addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        this.state.shift = false;
      }
    })
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

    if (this.state.contentState.blocks.some(block => {
      return block.text !== ""
    })) {
      this.props.processForm(message).then(message => {
        socket.emit('chat message', `${message._id}`);
      })
      this.handleClear()
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleReturn() {
    if (this.state.shift === true) {
      return 'not-handled';
    }
    return 'handled';
  }

  handleClear = () => {
    let { editorState } = this.state;
    let contentState = editorState.getCurrentContent();
    const firstBlock = contentState.getFirstBlock();
    const lastBlock = contentState.getLastBlock();
    const allSelected = new SelectionState({
      anchorKey: firstBlock.getKey(),
      anchorOffset: 0,
      focusKey: lastBlock.getKey(),
      focusOffset: lastBlock.getLength(),
      hasFocus: true
    });
    contentState = Modifier.removeRange(contentState, allSelected, 'backward');
    editorState = EditorState.push(editorState, contentState, 'remove-range');
    this.setState({ editorState });
  }

  render() {
    return (
      <form>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          editorClassName="messages-editor"
          toolbarClassName="messages-toolbar"
          wrapperClassName="messages-editor-wrapper"
          handleReturn={this.handleReturn}
          toolbar={{
            options: ['inline', 'colorPicker', 'link'],
          }} />
      </form>
    );
  }
}

export default MessageTextArea;