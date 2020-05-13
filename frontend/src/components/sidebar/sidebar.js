import React from 'react';
import './sidebar.scss'
import MessageContainer from '../messaging/message_index/message_index_container'

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    if (document.querySelector('.sidebar-container').style.width === '100%') {
      document.querySelector('.side-bar-toggler').style.width = '0px'
      document.querySelector('.side-bar-toggler').style.minWidth = '0px'
      document.querySelector('.sidebar-container').style.width = '0px'
      document.querySelector('.sidebar-order').style.width = '0px'
    } else if (document.querySelector('.sidebar-container').style.width === '0px') {
      document.querySelector('.side-bar-toggler').style.width = '350px'
      document.querySelector('.sidebar-container').style.width = '100%'
      document.querySelector('.side-bar-toggler').style.minWidth = '350px'
      document.querySelector('.sidebar-order').style.width = '350px'
    } else if (window.innerWidth <= 480) {
      document.querySelector('.side-bar-toggler').style.width = '350px'
      document.querySelector('.sidebar-container').style.width = '100%'
      document.querySelector('.side-bar-toggler').style.minWidth = '350px'
      document.querySelector('.sidebar-order').style.width = '350px'
    } else if (window.innerWidth >= 480) {
      document.querySelector('.side-bar-toggler').style.width = '0px'
      document.querySelector('.sidebar-container').style.width = '0px'
      document.querySelector('.side-bar-toggler').style.minWidth = '0px'
      document.querySelector('.sidebar-order').style.width = '0px'
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="sidebar-order">
          <div onClick={this.handleClick} className="sidebar-toggle">|||</div>
          <div className="side-bar-toggler">
            <div className="sidebar-container">
              <div className="sidebar-options-list">
                <MessageContainer />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default SideBar;
