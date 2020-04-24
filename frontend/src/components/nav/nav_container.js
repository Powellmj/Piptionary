import { connect } from 'react-redux';
import { logout, changeSession, changeUserTheme, getTheme } from '../../actions/session_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  formType: state.session.formType
});

const mapDispatchToProps = (dispatch) => {
  return {
    getTheme: (user) => dispatch(getTheme(user)),
    toggleTheme: (user, theme) => dispatch(changeUserTheme(user, theme)),
    logout: () => dispatch(logout()),
    changeSession: formType => dispatch(changeSession(formType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);