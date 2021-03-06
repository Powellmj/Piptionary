import { RECEIVE_NOTE, RECEIVE_ALL_USER_NOTES, REMOVE_NOTE } from '../actions/note_actions';

const initialState = {};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USER_NOTES:
      return Object.assign({}, state, action.notes);
    case RECEIVE_NOTE:
      return Object.assign({}, state, { [action.note._id]: action.note })
    case REMOVE_NOTE:
      let newState = Object.assign({}, state)
      delete newState[action.noteId]
      return newState
    default:
      return state;
  }
}