import { connect } from 'react-redux';
import { logout, changeSession } from '../../actions/session_actions';
import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  formType: state.session.formType
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    changeSession: formType => dispatch(changeSession(formType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);