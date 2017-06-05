import actionTypes from '../../actionTypes'

export const donutsShake = () => ({
  type: actionTypes.donutsShake.done,
})

export const donutsThrow = (params) => ({
  type: actionTypes.donutsThrow.request,
  ...params,
})
