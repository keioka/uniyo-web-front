const actionTypes = (baseType) => ({
  request: `UI_@_${baseType}_REQUEST`,
})

export const showPopup = actionTypes('SHOW_POPUP')
export const hidePopup = actionTypes('HIDE_POPUP')
