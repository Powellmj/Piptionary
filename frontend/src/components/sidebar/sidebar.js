import React from 'react';
import './sidebar.css'
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
            <Link to={`/main`}>Main Page</Link>
            <Link to={`/notes`}>Notes</Link>
          </div>
        </div>
      );
    } else {
      return null
    }
  }
}

export default SideBar;