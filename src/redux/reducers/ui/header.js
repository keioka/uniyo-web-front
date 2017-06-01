import { actionTypes } from 'uniyo-redux'

const initialiState = {
  receiveDonuts: false,
}

export default (state = initialiState, action) => {

  switch (action.type) {
    case actionTypes.userReceivedDonutsFetch.success: {
      return Object.assign({
        isFetchDonut: true,
      })
    }

    default: {
      return state
    }
  }
}
