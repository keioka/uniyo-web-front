import actionTypes from '../../actionTypes'

export const showPopup = ({ messageType }) => ({
  type: actionTypes.showPopup.request,
  messageType,
})

export const hidePopup = () => ({
  type: actionTypes.hidePopup.request,
})
