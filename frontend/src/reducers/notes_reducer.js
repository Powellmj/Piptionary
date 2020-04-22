import { RECEIVE_NOTE } from '../actions/note_actions';

export default function (state = null, action) {
  switch (action.type) {
    case RECEIVE_NOTE:
      return action.note;
    default:
      return state;
  }
}