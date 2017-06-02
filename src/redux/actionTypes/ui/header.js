const actionTypes = (baseType) => ({
  done: `UI_@_${baseType}_DONE`,
  error: `UI_@_${baseType}_ERROR`,
})

export const donutsShake = actionTypes('ANIMATION_DONUTS_SHAKE')
