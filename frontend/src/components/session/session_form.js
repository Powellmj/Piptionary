import React from 'react';
import { withRouter } from 'react-router-dom';
import './session.css'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.instructions = this.instructions.bind(this)
    this.clearedErrors = false;
  }

  instructions() {
    return this.props.formType === 'signup' ? 'Enter your information to create your account!' : 'Enter your email and password to log in!'
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this.props.formType === 'signup') {
      user.username = this.state.username
      this.props.signup(user)
    } else {
      this.props.login(user)
    }
  }

  renderErrors() {
    if (this.props.errors.length) {
      return (
        <div className="errors">
          <ul className="errors-list">
            {this.props.errors.map((error, i) => (
              <li className="error" key={`error-${i}`}>
                <p className='red-edge'></p>
                <i className="fas fa-skull-crossbones session-error-icon"></i>
                {error}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="session-form-container">
        <form onSubmit={this.handleSubmit} className="session-form-box">
          <div className="welcome"> Welcome to Piptionary! </div>
          <div className="session-instructions">{this.instructions()}</div>
          <div className="session-form">
            <div className="session-input-field">
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Liame@piptionary.com"
                className="session-input"
              />
              <label className="session-input-label">Email</label>
            </div>
              {this.props.formType === 'signup' ?
              <div className="session-input-field">
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="A rose by any other name"
                className="session-input"
              />
              <label className="session-input-label">Username</label>
            </div>
             : null}
            <div className="session-input-field">
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Make it super secure!"
                className="session-input"
              />
              <label className="session-input-label">Password</label>
            </div>
              <input 
                type="submit" 
                value="Submit"
                className="session-submit" 
              />
          </div>
          {this.renderErrors()}
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);