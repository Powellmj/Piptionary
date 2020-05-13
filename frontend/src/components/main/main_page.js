import React, { Component } from 'react';
import MessageContainer from '../messaging/message_index/message_index_container'

class MainPage extends Component {
  constructor(props) {
    super(props);

  }

  
  render() {
    return (
      // <div>
      // nothing here yet. smiley face
        <MessageContainer />
      // </div>
    );
  }
}

export default MainPage;