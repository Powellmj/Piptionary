import React from 'react';
import './navbar.css'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  handleClick(e) {
    e.preventDefault();
    if (e.currentTarget.className === "navbar-button nav-signup") {
      this.props.changeSession('signup')
    } else {
      this.props.changeSession('login')
    }
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
          <div className="navbar-button nav-signup" onClick={this.handleClick}>Signup</div>
          <div className="navbar-button nav-login" onClick={this.handleClick}>Login</div>
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