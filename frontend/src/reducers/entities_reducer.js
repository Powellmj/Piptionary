import { combineReducers } from 'redux';
import notes from './notes_reducer';
import messages from './messages_reducer';

const RootReducer = combineReducers({
  notes,
  messages,
});

export default RootReducer;