import { actionTypes } from 'uniyo-redux'
import uiActionsType from '../../actionTypes'

const initialiState = {
  isDisplayPopup: false,
  type: '',
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case uiActionsType.showPopup.request: {
      const { messageType } = action
      return Object.assign({
        isDisplayPopup: true,
        messageType,
      })
    }

    case uiActionsType.hidePopup.request: {
      return Object.assign({
        isDisplayPopup: false,
        type: '',
      })
    }

    default: {
      return state
    }
  }
}
