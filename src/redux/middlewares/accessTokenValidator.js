import { actionTypes } from 'uniyo-redux'
import { actions } from 'uniyo-redux'
import { storage } from '../../utils'
import { browserHistory } from 'react-router'

export const accessTokenValidator = store => next => action => {

  if (!localStorage) {
    console.warn("Local Storage is not available")
  }

  const { type } = action

  if (
    type === actionTypes.logIn.request ||
    type === actionTypes.userCreate.request
  ) {
    const { schoolId } = action
    const schools = store.getState().api.schools.data
    if (schoolId === 1) {
      storage.setSchoolName = 'Demo'
    } else {
      const school = schools.filter(school => schoolId === school.id)[0]
      if (school) {
        storage.setSchoolName = school.name
      }
    }
  }

  if (
    type === actionTypes.commentsSearch.request ||
    type === actionTypes.postsSearch.request ||
    type === actionTypes.postCreate.request ||
    type === actionTypes.commentCreate.request ||
    type === actionTypes.userSearch.request ||
    type === actionTypes.hashtagAdd.request ||
    type === actionTypes.postInfo.request ||
    type === actionTypes.answerSearch.request ||
    type === actionTypes.answerCreate.request ||
    type === actionTypes.messageSearch.request ||
    type === actionTypes.messageCreate.request ||
    type === actionTypes.channelCreate.request ||
    type === actionTypes.notificationReadMark.request ||
    type === actionTypes.hashtagDelete.request ||
    type === actionTypes.postsTrendingSearch.request ||
    type === actionTypes.postsRelevantSearch.request ||
    type === actionTypes.postGiveDonuts.request ||
    type === actionTypes.commentGiveDonuts.request ||
    type === actionTypes.userGiveDonuts.request ||
    type === actionTypes.notificationSearch.request ||
    type === actionTypes.addDevice.request
  ) {
    action.accessToken = storage.accessToken
  }

  if (
    type === actionTypes.userCreate.success ||
    type === actionTypes.logIn.success ||
    type === actionTypes.tokenRefresh.success
  ) {

    const setTokens = new Promise((resolve, reject) => {
      try {
        console.log('%c setToken', 'color: blue')
        storage.setTokensFromResponse(action.result.data)
        resolve("Success")
      } catch(e) {
        reject(e)
      }
    })

    setTokens.then((result) => {
      console.log('%c Token is saved on local server ', 'color: blue')
    }).catch((e) => {
      console.warn(e)
    })
  }

  // //refreshAccessTokenIfNeeded
  // if (storage.hasValidAccessTokens && storage.isAccessTokenExpired) {
  //   console.warn("Token is expired")
  //   store.dispatch(actions.tokenRefresh(storage.refreshToken))
  // }
  return next(action)
}
