import { connect } from 'react-redux';
import { createMessage, requestMessage, deleteMessage, updateMessage } from '../../actions/message_actions';
import Message from './message';

const mapStateToProps = (state) => {
  return {
    messages: state.entities.messages,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestMessage: messageId => dispatch(requestMessage(messageId)),
    processForm: message => dispatch(createMessage(message)),
    updateMessage: message => dispatch(updateMessage(message)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);