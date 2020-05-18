import { combineReducers } from 'redux';
import notes from './notes_reducer';
import messages from './messages_reducer';
import characters from './characters_reducer';

const RootReducer = combineReducers({
  notes,
  messages,
  characters,
});

export default RootReducer;