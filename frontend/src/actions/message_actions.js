import * as APIUtil from '../util/message_api_util';
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_ALL_USER_MESSAGES = "RECEIVE_ALL_USER_MESSAGES";
export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

export const receiveMessage = message => ({
  type: RECEIVE_MESSAGE,
  message
});

export const receiveAllUserMessages = message => ({
  type: RECEIVE_ALL_USER_MESSAGES,
  message
});

export const receiveAllMessages = messages => ({
  type: RECEIVE_ALL_MESSAGES,
  messages
});

export const removeMessage = messageId => ({
  type: REMOVE_MESSAGE,
  messageId
});

export const requestAllUserMessages = userId => dispatch => APIUtil.fetchAllUserMessages(userId)
  .then(messages => {
    let messagesObj = {}
    messages.data.forEach(message => {
      messagesObj[message._id] = message
    })
    dispatch(receiveAllUserMessages(messagesObj))
  })

export const requestMessage = messageId => dispatch => APIUtil.fetchMessage(messageId)
  .then(message => {
    dispatch(receiveMessage(message.data))
  })

export const requestAllMessages = () => dispatch => APIUtil.fetchAllMessages()
  .then(messages => {
    let messagesObj = {}
    messages.data.forEach(message => {
      messagesObj[message._id] = message
    })
    dispatch(receiveAllMessages(messagesObj))
  })

export const createMessage = message => dispatch => (
  APIUtil.createMessage(message).then((response) => {
    dispatch(receiveMessage(response.data))
    return response.data
  }
    // , err => (
    //   dispatch(receiveErrors(err.response.data))
    // )
  )
)

export const updateMessage = message => dispatch => (
  APIUtil.updateMessage(message).then((response) => {
    dispatch(receiveMessage(response.data))
  }
    // , err => (
    //   dispatch(receiveErrors(err.response.data))
    // )
  )
)

export const deleteMessage = messageId => dispatch => (
  APIUtil.deleteMessage(messageId),
  dispatch(removeMessage(messageId))
)