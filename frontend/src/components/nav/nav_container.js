import { connect } from 'react-redux';
import { logout, changeSession } from '../../actions/session_actions';
import { toggleTheme } from '../../actions/theme_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  theme: state.ui.theme,
  formType: state.session.formType
});

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTheme: theme => dispatch(toggleTheme(theme)),
    logout: () => dispatch(logout()),
    changeSession: formType => dispatch(changeSession(formType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);