const actionTypes = (baseType) => ({
  set: `FORM@${baseType}_SET`,
  clear: `FORM@${baseType}_CLEAR`,
})

export const readNotificationIds = actionTypes('READ_NOTIFICATION_IDS')
