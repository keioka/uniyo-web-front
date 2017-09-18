import actionTypes from '../../actionTypes'

export const fetchGifImages = (params) => ({
  type: actionTypes.fetchGifImages.request,
  ...params,
})
