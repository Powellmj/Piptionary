import React from 'react';
import './messager.scss'
import Moment from 'react-moment';

const MessageIndexItem = props => {
  const attachMessage = message => {
    let createMarkup = () => ({ __html: message.body });
    return <div className="message-body" dangerouslySetInnerHTML={ createMarkup() }></div>
  }
  let { message, author, currentUser } = props

  if (message.date) {
    // Do this if the 'message' is actually a timestamp
    return (
      <div className="date-item-pos">
        <div className="date-item">
          {message.recent ? <div className="date-bubble">{message.date}</div> :
            <Moment format="dddd, MMMM D" className="date-bubble">{message.date}</Moment>}
        </div>
      </div>)
  } else {
    // Do this if the 'message' is actually a message
    return (
      <div className={currentUser ? "current-user-message-index-item" : "message-index-item"}>
        {author ? <div className="message-username">{message.author.username} 
        <Moment className="message-timestamp" format="h:mm a" >{message.created_at}</Moment></div> : null}
        { attachMessage(message) }
      </div>
    )
  }
}

export default MessageIndexItem;