const actionTypes = (baseType) => ({
  request: `UI_@_${baseType}_REQUEST`,
  success: `UI_@_${baseType}_SUCCESS`,
  error: `UI_@_${baseType}_ERROR`,
})

export const fetchGifImages = actionTypes('FETCH_GIF_IMAGES')
