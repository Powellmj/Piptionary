import * as APIUtil from '../util/character_api_util';
export const RECEIVE_CHARACTER = "RECEIVE_CHARACTER";
export const RECEIVE_ALL_USER_CHARACTERS = "RECEIVE_ALL_USER_CHARACTERS";

export const receiveCharacter = character => ({
  type: RECEIVE_CHARACTER,
  character
});

export const receiveAllUserCharacters = characters => ({
  type: RECEIVE_ALL_USER_CHARACTERS,
  characters
});

export const requestAllUserCharacters = userId => dispatch => 
  APIUtil.fetchAllUserCharacters(userId)
  .then(characters => {
    let charactersObj = {}
    characters.data.forEach(character => {
      charactersObj[character._id] = character
    })
    dispatch(receiveAllUserCharacters(charactersObj))
  })

export const requestCharacter = characterId => dispatch => APIUtil.fetchCharacter(characterId)
  .then(character => (
    dispatch(receiveCharacter(character.data))
  ))

export const createCharacter = character => dispatch => (
  APIUtil.createCharacter(character)
    .then((response) => {
      // dispatch(requestMessage(response.data._id))
      return response.data
    }
      // , err => (
      //   dispatch(receiveErrors(err.response.data))
      // )
    )
)

export const updateCharacter = character => dispatch => (
  APIUtil.updateCharacter(character).then((response) => {
    dispatch(receiveCharacter(response.data))
  }
    // , err => (
    //   dispatch(receiveErrors(err.response.data))
    // )
  )
)

// export const deleteMessage = messageId => dispatch => {
//   APIUtil.deleteMessage(messageId);
//   return dispatch(removeMessage(messageId))
// }