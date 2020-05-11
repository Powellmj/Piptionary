import React from 'react';
import './sidebar.scss'
import { Link } from 'react-router-dom';

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
      document.querySelector('.side-bar-toggler').style.width = '250px'
      document.querySelector('.sidebar-container').style.width = '100%'
      document.querySelector('.side-bar-toggler').style.minWidth = '250px'
      document.querySelector('.sidebar-order').style.width = '250px'
    } else if (window.innerWidth <= 480) {
      document.querySelector('.side-bar-toggler').style.width = '250px'
      document.querySelector('.sidebar-container').style.width = '100%'
      document.querySelector('.side-bar-toggler').style.minWidth = '250px'
      document.querySelector('.sidebar-order').style.width = '250px'
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
        <div className="side-bar-toggler">
          <div className="sidebar-container">
            <div className="sidebar-options-list">
              <Link className="sidebar-link" to={`/main`}>Main Page</Link>
              <Link className="sidebar-link" to={`/notes/index`}>Notes</Link>
            </div>
          </div>
        </div>
            <div onClick={this.handleClick} className="sidebar-toggle">|||</div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default SideBar;