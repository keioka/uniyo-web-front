import { actionTypes } from 'uniyo-redux'

import uiActionsType from '../../actionTypes'

const initialiState = {
  isReceiveDonuts: false,
  isSpentDonuts: false,
  donutColor: 'YELLOW',
  target: {
    x: 0,
    y: 0,
  },
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.userReceivedDonutsFetch.success: {
      return Object.assign({
        isReceiveDonuts: true,
      })
    }

    case actionTypes.userSpentDonutsFetch.success: {
      return Object.assign({
        isSpentDonuts: true,
      })
    }

    case uiActionsType.donutsThrow.request: {
      return Object.assign({
        isSpentDonuts: true,
        donutColor: 'YELLOW',
        target: {
          x: 0,
          y: 0,
        },
      })
    }

    case uiActionsType.donutsShake.done: {
      return Object.assign({
        isReceiveDonuts: false,
      })
    }

    case uiActionsType.donutsThrow.done: {
      return Object.assign({
        isSpentDonuts: false,
      })
    }

    default: {
      return state
    }
  }
}
