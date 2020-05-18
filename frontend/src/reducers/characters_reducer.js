import { RECEIVE_CHARACTER, RECEIVE_ALL_USER_CHARACTERS } from '../actions/character_actions';

const initialState = {};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USER_CHARACTERS:
      return Object.assign({}, state, action.characters);
    case RECEIVE_CHARACTER:
      return Object.assign({}, state, { [action.character._id]: action.character })
    default:
      return state;
  }
}