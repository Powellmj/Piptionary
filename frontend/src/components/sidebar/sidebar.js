import React from 'react';
import './sidebar.scss'
import MessageContainer from '../messaging/message_index/message_index_container'

class SideBar extends React.Component {
  
  componentDidMount() {
    let sidebartoggler = () => {
      if (window.innerWidth <= 580) {
        document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-closed'
      } else if (window.innerWidth > 580) {
        document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-open'
      }
    }
    window.onresize = sidebartoggler;
  }

  handleClick() {
    if (document.querySelector('.side-bar-toggler.toggler-open')) {
      document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-closed'
    } else {
      document.querySelector('.side-bar-toggler').className = 'side-bar-toggler toggler-open'
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="side-bar-toggler toggler-open">
          <div onClick={this.handleClick} className="sidebar-toggle">|||</div>
          <div className="sidebar-container">
            <MessageContainer />
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default SideBar;
