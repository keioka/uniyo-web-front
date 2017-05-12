import { actionTypes } from 'uniyo-redux'
import { actions } from 'uniyo-redux'
import { browserHistory } from 'react-router'

export const redirectHandler = store => next => action => {

  if (action.type === actionTypes.userCreate.success) {
    browserHistory.push('/profile_settings')
  }

  if (action.type === actionTypes.logIn.success) {
    browserHistory.push('/dashboard')
  }

  if (action.type === actionTypes.userPictureUpdate.success) {
    browserHistory.push('/dashboard')
  }

  if (action.type === actionTypes.channelCreate.success) {
    const { id } = action.result.data
    browserHistory.push(`/dashboard/channels/${id}`)
  }

  return next(action)
}
