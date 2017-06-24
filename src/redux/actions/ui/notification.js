import actionTypes from '../../actionTypes'

export const contentReadCheckNotification = (params) => ({
  type: actionTypes.contentReadCheckNotification.request,
  ...params,
})
