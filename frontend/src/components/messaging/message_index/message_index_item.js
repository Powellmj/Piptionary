import React from 'react';
import './message_index.scss'
import Moment from 'react-moment';

class MessageIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  attachMessage(message) {
    let createMarkup = () => { return { __html: message.body }; };
    return <div className="message-body" dangerouslySetInnerHTML={createMarkup()}></div>
  }

  render() {
    let message = this.props.message
    let author = this.props.author
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
      // Do this if the message is actually a message
      return (
        <div className={this.props.currentUser ? "current-user-message-index-item" : "message-index-item"}>
          {author ? <div className="message-username">{message.author.username} 
          <Moment className="message-timestamp" format="h:mm a" >{message.created_at}</Moment></div> : null}
          {this.attachMessage(message)}
        </div>
      )
    }
  }
}

export default MessageIndexItem;