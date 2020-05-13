import React from 'react';
import './message_index.scss'
import openSocket from 'socket.io-client';
import MessageIndexItem from './message_index_item'
import MessageTextAreaContainer from '../message_text_area/message_text_area_container'
const socket = process.env.NODE_ENV === 'production' ? openSocket('https://piptionary.herokuapp.com/') : openSocket('http://localhost:5000')
// if (process.env.NODE_ENV === 'production') {
//   socket = openSocket('https://piptionary.herokuapp.com/');
// } else {
//   socket = openSocket('https://localhost:5000');
// }


class Message extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    };
  }

  componentDidMount() {
    this.props.requestAllMessages()
    socket.on('chat message', (msgId) => {
      if (!(msgId in this.props.messages)) {
        this.props.requestMessage(msgId)
      }
    });
  }

  deleteMessage(messageId) {
    this.props.deleteMessage(messageId)
  }

  renderMessages(messages) {
    if (messages) {
      let sortedMessages = Object.values(messages).sort(
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
      let author = '';
      let time = '';

      return datedMessages.map((message, idx) => {
        if (message.date) {
          author = '';
          return <MessageIndexItem message={message} key={idx + "timestamp"} />
        }
        if (author != message.author.username || time != message.created_at.slice(14, 16)) {
          author = message.author.username
          time = message.created_at.slice(14, 16)
          return <MessageIndexItem message={message} author={author} key={message._id} />
        } else {
          time = message.created_at.slice(14, 16)
          return <MessageIndexItem message={message} key={message._id} />
        }
      });
    }
  };

  render() {
    return (
      <div>
        {this.renderMessages(this.props.messages)}
        <MessageTextAreaContainer />
      </div>
    );
  }
}

export default Message;