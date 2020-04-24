import React from 'react';
import './sidebar.scss'
import { Link } from 'react-router-dom';
import sidebar_container from './sidebar_container';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    if (document.querySelector('.sidebar-container').style.width === '100%') {
      document.querySelector('.side-bar-toggler').style.width = '0px'
      document.querySelector('.sidebar-container').style.width = '0px'
    } else {
      document.querySelector('.side-bar-toggler').style.width = '300px'
      document.querySelector('.sidebar-container').style.width = '100%'
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="side-bar-toggler">
          <div className="sidebar-container">
            <div className="sidebar-options-list">
              <Link className="sidebar-link" to={`/main`}>Main Page</Link>
              <Link className="sidebar-link" to={`/notes`}>Notes</Link>
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