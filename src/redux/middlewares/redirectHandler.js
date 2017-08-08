import { actionTypes } from 'uniyo-redux'
import uiActionTypes from '../actionTypes'
import { actions } from 'uniyo-redux'
import { browserHistory } from 'react-router'

export const redirectHandler = store => next => action => {

  if (action.type === actionTypes.tokenRefresh.error) {
    console.error('token refresh error')
  }

  if (action.type === actionTypes.userCreate.success) {
    const { query } = browserHistory.getCurrentLocation()
    if(query.class) {
      browserHistory.push(`/profile_settings?class=${query.class}`)
    } else {
      browserHistory.push('/profile_settings')
    }

  }

  if (action.type === actionTypes.logIn.success) {
    browserHistory.push('/dashboard')
  }

  if (action.type === actionTypes.userPictureUpdate.success) {
    browserHistory.push('/dashboard')
  }

  if (action.type === actionTypes.postCreate.success) {
    const { id } = action.result.data
    browserHistory.push(`/dashboard/posts/${id}`)
  }

  if (action.type === actionTypes.channelCreate.success) {
    const { id } = action.payload[0]
    browserHistory.push(`/dashboard/channels/${id}`)
  }


  if (action.type === actionTypes.newPasswordUpdate.success) {
    browserHistory.push('/signin')
  }

  return next(action)
}
