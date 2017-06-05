import actionTypes from '../../actionTypes'

export const contentReadCheckNotification = ({ id, contentType }) => ({
  type: actionTypes.contentReadCheckNotification.request,
  id,
  contentType,
})
