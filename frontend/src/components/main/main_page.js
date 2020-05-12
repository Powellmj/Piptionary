import React, { Component } from 'react';
import MessageContainer from '../messaging/message_container'

class MainPage extends Component {
  constructor(props) {
    super(props);

  }

  
  render() {
    return (
      <div>
        <div>
          nothing here yet. smiley face
          <MessageContainer />
        </div>
      </div>
    );
  }
}

export default MainPage;