import { TOGGLE_THEME } from '../actions/theme_actions';

export default function (state = null, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return action.theme;
    default:
      return state;
  }
}