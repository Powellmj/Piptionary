import { combineReducers } from 'redux';
import modal from './modal_reducer.js';
import theme from './theme_reducer.js';

export default combineReducers({
  theme,
  modal,
});