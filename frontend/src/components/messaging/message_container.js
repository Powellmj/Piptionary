import { connect } from 'react-redux';
import { createNote, requestNote, deleteNote, updateNote } from '../../../actions/note_actions';
import Message from './message';

const mapStateToProps = (state) => {
  return {
    messages: state.entities.messages,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestNote: noteId => dispatch(requestNote(noteId)),
    processForm: note => dispatch(createNote(note)),
    updateForm: note => dispatch(updateNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);