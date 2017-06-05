const actionTypes = (baseType) => ({
  request: `UI_@_${baseType}_REQUEST`,
  done: `UI_@_${baseType}_DONE`,
  error: `UI_@_${baseType}_ERROR`,
})

export const contentReadCheckNotification = actionTypes('CONTENT_READ_CHECK_NOTIFICATION')
