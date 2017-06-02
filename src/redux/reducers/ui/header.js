import { actionTypes } from 'uniyo-redux'

import uiActionsType from '../../actionTypes'

const initialiState = {
  isReceiveDonuts: false,
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.userReceivedDonutsFetch.success: {
      return Object.assign({
        isReceiveDonuts: true,
      })
    }

    case uiActionsType.donutsShake.done: {
      return Object.assign({
        isReceiveDonuts: false,
      })
    }

    default: {
      return state
    }
  }
}
