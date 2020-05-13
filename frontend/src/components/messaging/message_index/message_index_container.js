import { connect } from 'react-redux';
import { createMessage, requestMessage, deleteMessage, updateMessage, requestAllMessages } from '../../../actions/message_actions';
import MessageIndex from './message_index';

const mapStateToProps = (state) => {
  return {
    messages: state.entities.messages,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestMessage: messageId => dispatch(requestMessage(messageId)),
    requestAllMessages: () => dispatch(requestAllMessages()),
    processForm: message => dispatch(createMessage(message)),
    updateMessage: message => dispatch(updateMessage(message)),
    deleteMessage: messageId => dispatch(deleteMessage(messageId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageIndex);