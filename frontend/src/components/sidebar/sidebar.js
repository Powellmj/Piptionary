import React from 'react';
import './sidebar.scss'
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="sidebar-container">
          <div className="sidebar-options-list">
            <Link className="sidebar-link" to={`/main`}>Main Page</Link>
            <Link className="sidebar-link" to={`/notes`}>Notes</Link>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default SideBar;