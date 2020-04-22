import { combineReducers } from 'redux';
import Notes from './notes_reducer';

const RootReducer = combineReducers({
  Notes,
});

export default RootReducer;