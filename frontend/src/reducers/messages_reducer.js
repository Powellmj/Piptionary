import { RECEIVE_MESSAGE, RECEIVE_ALL_USER_MESSAGES, RECEIVE_ALL_MESSAGES, REMOVE_MESSAGE } from '../actions/message_actions';

const initialState = {};

export default function (state = initialState, action) {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_USER_MESSAGES:
      return Object.assign({}, state, action.messages);
    case RECEIVE_ALL_MESSAGES:
      return Object.assign({}, state, action.messages);
    case RECEIVE_MESSAGE:
      return Object.assign({}, state, { [action.message._id]: action.message })
    case REMOVE_MESSAGE:
      let newState = Object.assign({}, state)
      delete newState[action.messageId]
      return newState
    default:
      return state;
  }
}