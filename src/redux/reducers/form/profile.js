import actionTypes from '../../actionTypes'

const initialiState = {
  isUploadedImageTooLarge: false,
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.uploadedImageTooLarge.set: {
      return Object.assign({
        isUploadedImageTooLarge: true,
      })
    }

    case actionTypes.uploadedImageTooLarge.clear: {
      return Object.assign({
        isUploadedImageTooLarge: false,
      })
    }

    default: {
      return state
    }
  }
}
