import { RECEIVE_NOTE, RECEIVE_ALL_NOTES } from '../actions/note_actions';

const initialState = {};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_NOTES:
      return Object.assign({}, state, action.notes);
    case RECEIVE_NOTE:
      return Object.assign({}, state, { [action.note._id]: action.note })
    default:
      return state;
  }
}