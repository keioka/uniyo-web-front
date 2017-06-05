const actionTypes = (baseType) => ({
  request: `UI_@_${baseType}_REQUEST`,
  done: `UI_@_${baseType}_DONE`,
  error: `UI_@_${baseType}_ERROR`,
})

export const donutsShake = actionTypes('ANIMATION_DONUTS_SHAKE')
export const donutsThrow = actionTypes('ANIMATION_DONUTS_THROW')
