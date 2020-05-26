import * as APIUtil from '../util/attribute_api_util';
export const RECEIVE_ALL_CHARACTER_ATTRIBUTES = "RECEIVE_ALL_CHARACTER_ATTRIBUTES";

export const createAttribute = attribute => dispatch => (
  APIUtil.createAttribute(attribute)
    .then((response) => {
      // dispatch(requestMessage(response.data._id))
      return response.data
    }
      // , err => (
      //   dispatch(receiveErrors(err.response.data))
      // )
    )
)

export const dumpAttributes = attributes => dispatch => (
  APIUtil.dumpAttributes(attributes)
    .then((response) => {
      // dispatch(requestMessage(response.data._id))
      return response.data
    }
      // , err => (
      //   dispatch(receiveErrors(err.response.data))
      // )
    )
)

// export const updateAttribute = attribute => dispatch => (
//   APIUtil.updateAttribute(attribute).then((response) => {
//     dispatch(receiveAttribute(response.data))
//   }
//     // , err => (
//     //   dispatch(receiveErrors(err.response.data))
//     // )
//   )
// )

// export const deleteMessage = messageId => dispatch => {
//   APIUtil.deleteMessage(messageId);
//   return dispatch(removeMessage(messageId))
// }

// export const receiveAllCharacterAttributes = attributes => ({
//   type: RECEIVE_ALL_CHARACTER_ATTRIBUTES,
//   attributes
// });

// export const requestAllCharacterAttributes = charId => dispatch =>
//   APIUtil.fetchAllCharacterAttributes(charId)
//     .then(attributes => {
//       let attributesObj = {}
//       attributes.data.forEach(attribute => {
//         attributesObj[attribute._id] = attribute
//       })
//       dispatch(receiveAllCharacterAttributes(attributesObj))
//     })