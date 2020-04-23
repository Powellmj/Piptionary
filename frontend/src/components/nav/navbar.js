import React from 'react';
import './navbar.scss'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.switchSession = this.switchSession.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  switchSession(e) {
    e.preventDefault();
    e.currentTarget.className === "btn btn-primary navbar-button nav-signup" ? 
    this.props.changeSession('signup') : this.props.changeSession('login')
  }

  toggleTheme(e) {
    e.preventDefault();
    let theme = this.props.theme === 'dark' ? 'light' : 'dark'
    this.props.toggleTheme(this.props.currentUser, `${theme}`)
    document.querySelector('.main-div').className = `theme-${theme} main-div`
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-session-buttons">
          <div className="btn btn-primary navbar-button nav-signup" onClick={this.logoutUser}>Logout</div>
          <div className="btn btn-primary navbar-button nav-signup" onClick={this.toggleTheme}>Theme</div>
        </div>
      );
    } else {
      return (
        <div className="navbar-session-buttons">
          {this.props.formType === 'signup' ?
            <div className="btn btn-primary navbar-button nav-login" onClick={this.switchSession}>Login</div> :
            <div className="btn btn-primary navbar-button nav-signup" onClick={this.switchSession}>Signup</div>
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