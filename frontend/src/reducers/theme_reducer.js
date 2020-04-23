import { TOGGLE_THEME } from '../actions/session_actions';

const initialState = {};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case TOGGLE_THEME:
      return action.theme
    default:
      return state;
  }
}