import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <div className="navbar-button nav-signup" onClick={this.logoutUser}>Logout</div>
        </div>
      );
    } else {
      return (
        <div className="navbar-session-buttons">
          <Link className="navbar-button nav-signup" to={'/signup'}>Signup</Link>
          <Link className="navbar-button nav-login" to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar-piptionary-logo">
          <div className="navbar-piptionary-logo-image"></div>
          <div className="navbar-piptionary-logo-text">Piptionary</div>
        </div>
        {this.getLinks()}
      </div>
    );
  }
}

export default NavBar;