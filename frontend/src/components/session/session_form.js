import React, { useState } from 'react';
import { signup, login } from '../../actions/session_actions';
import { useDispatch, useSelector } from 'react-redux';
import './session.scss'

const SessionForm = () => {
  const dispatch = useDispatch()
  const formType = useSelector(state => state.session.formType)
  const errors = useSelector(state => state.errors.session)
  const [state, setState] = useState(() => ({ email: '', username: '', password: '' }))

  const instructions = () => (
    formType === 'signup' ? 'Enter your information to create your account!' : 'Enter your email and password to log in!'
  )

  const update = (value, field) => {
    setState(prevState => ({ ...prevState, [field]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    let user = { email: state.email.toLowerCase(), password: state.password };
    if (formType === 'signup') {
      user.username = state.username
      dispatch(signup(user))
    } else {
      dispatch(login(user))
    }
  }

  const renderErrors = () => {
    if (errors.length) {
      return (
        <div className="errors">
          <ul className="errors-list">
            {errors.map((error, i) => (
              <li className="alert alert-danger error" key={`error-${i}`}>
                <i className="fas fa-skull-crossbones session-error-icon"></i>
                {error}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return (
    <div className="session-form-container">
      <form onSubmit={handleSubmit} className="session-form-box">
        <div className="welcome">Welcome to Piptionary!</div>
        <div className="session-instructions">{instructions()}</div>
        <div className="session-form">
          <div className="form-group session-input-field">
            <input type="text"
              value={state.email}
              onChange={e => update(e.currentTarget.value, 'email')}
              placeholder="LiaMe@piptionary.com"
              className="form-control form-control-lg session-input"
            />
            <label className="session-input-label">Email:</label>
          </div>
            {formType === 'signup' ?
            <div className="form-group session-input-field">
            <input type="text"
              value={state.username}
              onChange={e => update(e.currentTarget.value, 'username')}
              placeholder="A rose by any other name"
              className="form-control form-control-lg session-input"
            />
            <label className="session-input-label">Username:</label>
          </div>
            : null}
          <div className="form-group session-input-field">
            <input type="password"
              value={state.password}
              onChange={e => update(e.currentTarget.value, 'password')}
              placeholder="Make it super secure!"
              className="form-control form-control-lg session-input"
            />
            <label className="session-input-label">Password:</label>
          </div>
            <input 
              type="submit" 
              value="Submit"
              className="btn btn-primary btn-lg session-submit" 
            />
        </div>
        {renderErrors()}
      </form>
    </div>
  );
}

export default SessionForm;