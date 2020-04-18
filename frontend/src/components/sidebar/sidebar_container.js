import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SideBar from './sidebar';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.isAuthenticated,
    formType: state.session.formType,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);