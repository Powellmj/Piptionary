import { connect } from 'react-redux';
import { createNote } from '../../actions/note_actions';
import Notes from './notes';

const mapStateToProps = (state) => {
  return {
    notes: state.entities.notes,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: note => dispatch(createNote(note)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);