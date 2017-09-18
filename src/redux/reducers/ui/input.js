import { actionTypes } from 'uniyo-redux'

import uiActionsType from '../../actionTypes'

const initialiState = {
  imagesGif: [],
  error: null,
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case uiActionsType.fetchGifImages.success: {
      return Object.assign({
        imagesGif: action.payload,
      })
    }

    case uiActionsType.fetchGifImages.error: {
      return Object.assign({
        error: action.error,
      })
    }

    default: {
      return state
    }
  }
}
