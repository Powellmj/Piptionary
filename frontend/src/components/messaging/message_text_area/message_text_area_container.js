import { connect } from 'react-redux';
import { createMessage } from '../../../actions/message_actions';
import MessageTextArea from './message_text_area';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: message => dispatch(createMessage(message))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageTextArea);