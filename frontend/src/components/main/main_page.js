import React, { Component } from 'react';
import MessageContainer from '../messaging/message_container'
import 'whatwg-fetch';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.sendSocketIO = this.sendSocketIO.bind(this);
  }

  sendSocketIO() {
    socket.emit('example_message', 'demo');
  }
  
  render() {
    return (
      <div>
        <div>
          {/* <button onClick={this.sendSocketIO}>Send Socket.io</button> */}
          <MessageContainer />
        </div>
      </div>
    );
  }
}

export default MainPage;