const actionTypes = (baseType) => ({
  set: `FORM@${baseType}_SET`,
  clear: `FORM@${baseType}_CLEAR`,
})

export const uploadedImageTooLarge = actionTypes('UPLOADED_IMAGE_TOO_LARGE')
