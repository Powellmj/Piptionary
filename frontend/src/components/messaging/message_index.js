import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { requestMessage, requestAllMessages } from '../../actions/message_actions';
import './messager.scss'
import openSocket from 'socket.io-client';
import MessageIndexItem from './message_index_item'
import MessageTextArea from './message_text_area'
const socket = process.env.NODE_ENV === 'production' ? openSocket('https://piptionary.herokuapp.com/') : openSocket('http://localhost:5000')

const MessageIndex = () => {
  const messages = useSelector(state => state.entities.messages);
  const currentUser = useSelector(state => state.session.user);
  const dispatch = useDispatch()
  useEffect(() => { dispatch(requestAllMessages()) }, [dispatch])
  
  socket.on('chat message', (msgId) => {
    if (!(msgId in messages)) dispatch(requestMessage(msgId))
  });
  
  const renderMessages = () => {
    if (messages && currentUser) {
      let datedMessages = []
      let currentDate = ''
      let today = `${new Date()}`.slice(0, 15)
      let yesterday = `${new Date(today - 1)}`.slice(0, 15)
   
      Object.values(messages).sort((a, b) => new Date(a.created_at) - new Date(b.created_at)).forEach(message => {
        let messageCreatedDate = `${new Date(message.created_at)}`.slice(0, 15)

        if (messageCreatedDate !== currentDate) {
          currentDate = messageCreatedDate;
          if (today === messageCreatedDate) datedMessages.push({ date: 'Today', recent: true });
          else if (yesterday === messageCreatedDate) datedMessages.push({ date: 'Yesterday', recent: true });
          else datedMessages.push({ date: messageCreatedDate })
        }
        datedMessages.push(message)
      })
      let author = '';
      let time = '';
      
      return datedMessages.map((message, idx) => {
        let currentAuthor = false;
        if (message.author && message.author._id === currentUser.id) currentAuthor = true;
        if (message.date) {
          author = '';
          return <MessageIndexItem message={message} key={idx + "timestamp"} currentUser={currentAuthor}/>
        }
        if (author !== message.author.username || time !== message.created_at.slice(14, 16)) {
          author = message.author.username
          time = message.created_at.slice(14, 16)
          return <MessageIndexItem message={message} author={author} key={message._id} currentUser={currentAuthor}/>
        } else {
          time = message.created_at.slice(14, 16)
          return <MessageIndexItem message={message} key={message._id} currentUser={currentAuthor}/>
        }
      });
    }
  };

  return (
    <div className="messager-container">
      <div className="messager">
        <div className="message-index">
          { renderMessages() }
        </div>
      </div>
          <MessageTextArea />
    </div>
  );
}

export default MessageIndex;