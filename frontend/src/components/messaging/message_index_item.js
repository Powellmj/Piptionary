import React from 'react';
import './message.scss'
import { EditorState, ContentState, convertToRaw, Modifier, SelectionState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
import Moment from 'react-moment';
const socket = openSocket('http://localhost:8000');

class Message extends React.Component {
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
    this.props.requestAllMessages()
    this.setState({ editorState: EditorState.createEmpty() })
    socket.on('chat message', (msgId) => {
      if (!(msgId in this.props.messages))
        this.props.requestMessage(msgId)
    });

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

    this.props.processForm(message).then(message => {
      socket.emit('chat message', `${message._id}`);
    })
    this.handleClear()
  }

  deleteNote(noteId) {
    this.props.deleteNote(noteId)
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

  attachMessage(message) {
    function createMarkup() { return { __html: message.body }; };
    return <div dangerouslySetInnerHTML={createMarkup()}></div>
  }

  orderedMessages(messages) {
    if (messages) {
      let author = '';
      let time = '';

      let sortedMessages = messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      let datedMessages = []
      let currentDate = ''
      let today = `${new Date()}`.slice(0, 15)
      let yesterday = new Date(today)

      yesterday.setDate(yesterday.getDate() - 1)

      sortedMessages.forEach(message => {
        let date = message.created_at
        date = `${new Date(date)}`.slice(0, 15)
        yesterday = `${yesterday}`.slice(0, 15)

        if (date !== currentDate) {
          currentDate = date;
          if (today === date) {
            datedMessages.push({ date: 'Today', recent: true })
          } else if (yesterday === date) {
            datedMessages.push({ date: 'Yesterday', recent: true })
          } else {
            datedMessages.push({ date: date })
          }
        }
        datedMessages.push(message)
      })

      return datedMessages.map((message, idx) => {
        let messageNode = document.createElement("span")
        messageNode.innerHTML = message.text

        if (message.recent) {
          author = '';
          return (
            <li className="date-item-pos" key={idx + "timestamp"}>
              <div className="date-item">
                <div className="date-bubble">{message.date}</div>
              </div>
            </li>)
        } else if (message.date) {
          author = '';
          return (
            <li className="date-item-pos" key={idx + "timestamp"}>
              <div className="date-item">
                <Moment format="dddd, MMMM D" className="date-bubble">{message.date}</Moment>
              </div>
            </li>
          )
        }
        if (author != message.username || time != message.created_at.slice(14, 16)) {
          author = message.username
          time = message.created_at.slice(14, 16)
          return (
            <li key={message.id} className={`message-box-item`}>
              <div>
                <p className="message-username">{message.username}</p>
                <Moment className="message-sender-timestamp" format="h:mm A" >{message.created_at}</Moment>
              </div>
              <div className="message-content">
                {this.attachMessage(message)}
              </div>
            </li>
          )
        } else {
          time = message.created_at.slice(14, 16)
          return (
            <li key={message.id} className='message-box-item'>
              <div className="message-content-no-sender" >
                <Moment className="message-no-sender-timestamp" format="h:mm" >{message.created_at}</Moment>
                {this.attachMessage(message)}
              </div>
            </li>
          )
        }
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          {Object.values(this.props.messages).map(message => {
            return (

              <div>{this.attachMessage(message)}</div>
            )
          })}
        </div>
        <form>
          <Editor
            editorState={this.state.editorState}
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
            toolbarClassName="messages-toolbar"
            wrapperClassName="messages-editor-wrapper"
            editorClassName="messages-editor"
            handleReturn={this.handleReturn}
            toolbar={{
              options: ['inline', 'colorPicker', 'link'],
            }} />
          <div className="new-conversation-submit" onClick={this.handleSubmit}>Create</div>
        </form>
      </div>
    );
  }
}

export default Message;