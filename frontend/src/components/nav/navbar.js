import React from 'react';
import './navbar.scss'

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
    if (e.currentTarget.className === "btn btn-primary navbar-button nav-signup") {
      this.props.changeSession('signup')
    } else {
      this.props.changeSession('login')
    }
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-session-buttons">
          <div className="btn btn-primary navbar-button nav-signup" onClick={this.logoutUser}>Logout</div>
        </div>
      );
    } else {
      return (
        <div className="navbar-session-buttons">
          {this.props.formType === 'signup' ?
            <div className="btn btn-primary navbar-button nav-login" onClick={this.handleClick}>Login</div> :
            <div className="btn btn-primary navbar-button nav-signup" onClick={this.handleClick}>Signup</div>
          }
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